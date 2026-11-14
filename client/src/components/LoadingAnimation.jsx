import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LoadingAnimation = () => {
  const thinkingLabels = ["Thinking", "Analyzing", "Processing", "Generating"];

  const [labelIndex, setLabelIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLabelIndex((prev) => (prev + 1) % thinkingLabels.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const label = thinkingLabels[labelIndex];

  return (
    <div className="flex items-center gap-3 py-2">
      {/* Animated Loader */}
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        {[0, 0.6, 1.2].map((delay, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-cyan-400/30"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.span
          className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-300 to-violet-400"
          style={{
            boxShadow: "0 0 12px rgba(125,211,252,0.5)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Thinking Text */}
      <div className="flex items-center overflow-hidden min-h-6">
        <AnimatePresence mode="wait">
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="text-[13px] font-medium tracking-wide text-slate-400"
          >
            {label}
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-cyan-400"
            >
              ...
            </motion.span>
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoadingAnimation;
