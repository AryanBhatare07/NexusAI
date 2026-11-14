import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Crown, X } from "lucide-react";
import { createOrder } from "../features/createOrder";
import { verifyPayment } from "../features/verifyPayment";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import getCurrentUser from "../features/getCurrentUser";

const BillingDrawer = ({ open, onClose }) => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpgrade = async (plan) => {
    try {
      const data = await createOrder(plan);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "NexusAI",
        description: `${data.plan.name} Plan`,
        order_id: data.order.id,

        handler: async (response) => {
          try {
            const result = await verifyPayment(response);
            console.log("SUCCESS:", result);

            const updatedUser = await getCurrentUser();
            dispatch(setUserData(updatedUser));

            onClose();
          } catch (error) {
            console.log("ERROR:", error.response?.data);
          }
        },
      };

      const razorPay = new window.Razorpay(options);
      razorPay.open();
    } catch (error) {
      console.log(error);
    }
  };

  const creditPercentage = Math.min(
    100,
    ((userData?.credits || 0) / (userData?.totalCredits || 1)) * 100,
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Billing Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-50 h-dvh w-full sm:w-[420px] max-w-full bg-[#0f1117] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 shrink-0">
              <div>
                <div className="text-white text-lg font-semibold">Billing</div>
                <div className="text-slate-400 text-sm">Plan & Credits</div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-slate-300" />
              </button>
            </div>

            {/* Current Plan */}
            <div className="p-4 sm:p-5 shrink-0">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-300 text-sm">Current Plan</p>
                    <h3 className="text-white text-xl font-bold capitalize">
                      {userData?.plan || "free"}
                    </h3>
                  </div>

                  <Crown className="text-yellow-400" />
                </div>

                <div className="mt-5">
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Credits</span>
                    <span>
                      {userData?.credits || 0}/{userData?.totalCredits || 100}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${creditPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Plans */}
            <div className="px-4 sm:px-5 pb-5 flex-1 min-h-0 overflow-y-auto space-y-4">
              <div className="rounded-xl border border-white/10 p-4">
                <h3 className="text-white font-semibold">Starter Plan</h3>

                <p className="text-indigo-400 text-2xl font-bold mt-2">₹199</p>

                <p className="text-slate-400 text-sm mt-1">500 Credits</p>

                <button
                  onClick={() => handleUpgrade("starter")}
                  className="mt-4 w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] py-2.5 text-white transition-all"
                >
                  Upgrade
                </button>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <h3 className="text-white font-semibold">Pro Plan</h3>

                <p className="text-indigo-400 text-2xl font-bold mt-2">₹499</p>

                <p className="text-slate-400 text-sm mt-1">1000 Credits</p>

                <button
                  onClick={() => handleUpgrade("pro")}
                  className="mt-4 w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] py-2.5 text-white transition-all"
                >
                  Upgrade
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BillingDrawer;
