import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const conversation = await Conversation.create({
      userId: userId,
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `create conversation error ${error}` });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const conversations = await Conversation.find({
      userId: userId,
    }).sort({ updatedAt: -1 });
    return res.status(200).json(conversations);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get conversations error ${error}` });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const { id, title } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(id, {
      title,
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `update conversation error ${error}` });
  }
};

export const saveMessage = async (req, res) => {
  try {
    const { conversationId, role, content, images, artifacts, pdfUrl, pptUrl } =
      req.body;

    const message = await Message.create({
      conversationId,
      role,
      content,
      images,
      artifacts,
      pdfUrl,
      pptUrl,
    });

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({
      message: `save message error ${error}`,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: `get all messages error ${error}` });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const { id } = req.params;

    const conversation = await Conversation.findOne({
      _id: id,
      userId,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    await Message.deleteMany({
      conversationId: id,
    });

    await Conversation.deleteOne({
      _id: id,
      userId,
    });

    return res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Delete conversation error: ${error.message}`,
    });
  }
};
