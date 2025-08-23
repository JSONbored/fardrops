"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="inline-block"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-16 h-16 border-4 border-farcaster-purple border-t-transparent rounded-full" />
        </motion.div>
        <p className="mt-4 text-gray-400">Loading FarDrops...</p>
      </div>
    </div>
  );
}
