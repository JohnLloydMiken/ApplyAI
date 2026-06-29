"use client";

import { motion } from "framer-motion";

/**
 * Client island: a tiny blinking cursor used inside the AI cover letter preview.
 * Only this <motion.span> needs framer-motion — the rest of Features is static.
 */
export default function BlinkingCursor() {
  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    >
      |
    </motion.span>
  );
}
