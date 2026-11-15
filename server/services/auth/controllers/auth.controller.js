import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await getAuth(app).verifyIdToken(token);
    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
    }

    const sessionId = crypto.randomUUID();
    await redis.set(
      `user-session-${user._id}`,
      JSON.stringify({ sessionId }),
      "EX",
      7 * 24 * 60 * 60,
    );

    const checkSession = await redis.get(`user-session-${user._id}`);

    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userID: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Login error ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    await redis.del(`session-${sessionId}`);
    res.clearCookie("session");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error ${error}` });
  }
};

export const updateUserPayment = async (req, res) => {
  try {
    const { plan, credits, userId, orderId } = req.body;

    if (!plan || !credits || !userId || !orderId) {
      return res.status(400).json({
        message: "Missing payment details",
      });
    }

    const user = await User.findOneAndUpdate(
      {
        _id: userId,
        processedPayments: { $ne: orderId },
      },
      {
        $set: {
          plan,
          planExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
        $inc: {
          credits,
          totalCredits: credits,
        },
        $addToSet: {
          processedPayments: orderId,
        },
      },
      { new: true },
    );

    if (!user) {
      const existingUser = await User.findById(userId);

      if (!existingUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (existingUser.processedPayments.includes(orderId)) {
        return res.status(200).json({
          success: true,
          message: "Payment already processed",
        });
      }

      return res.status(400).json({
        message: "Payment could not be processed",
      });
    }

    const sessionData = await redis.get(`user-session-${user._id}`);

    const sessionId = sessionData ? JSON.parse(sessionData)?.sessionId : null;

    if (sessionId) {
      await redis.set(
        `session-${sessionId}`,
        JSON.stringify({
          userID: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          plan: user.plan,
          credits: user.credits,
          totalCredits: user.totalCredits,
          planExpiresAt: user.planExpiresAt,
        }),
        "EX",
        7 * 24 * 60 * 60,
      );
    }

    return res.status(200).json({
      success: true,
      message: "Credits updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: `update user payment error ${error.message}`,
    });
  }
};

export const deductCredits = async (req, res) => {
  try {
    const { userId, agent } = req.body;

    const COST = {
      chat: 1,
      search: 5,
      coding: 10,
      pdf: 10,
      ppt: 10,
      vision: 10,
    };

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const requiredCredits = COST[agent] || 1;

    if (user.credits < requiredCredits) {
      return res.status(400).json({ message: "Not enough credits" });
    }

    user.credits -= requiredCredits;
    await user.save();

    const sessionData = await redis.get(`user-session-${user._id}`);

    if (sessionData) {
      const sessionId = JSON.parse(sessionData)?.sessionId;

      if (sessionId) {
        await redis.set(
          `session-${sessionId}`,
          JSON.stringify({
            userID: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            plan: user.plan,
            credits: user.credits,
            totalCredits: user.totalCredits,
            planExpiresAt: user.planExpiresAt,
          }),
          "EX",
          7 * 24 * 60 * 60,
        );
      }
    }

    return res.status(200).json({
      success: true,
      credits: user.credits,
    });
  } catch (error) {
    return res.status(500).json({
      message: `deduct credits error ${error}`,
    });
  }
};
