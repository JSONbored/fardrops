"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto p-8"
      >
        <div className="text-center">
          <motion.div
            className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
          >
            <AlertCircle className="h-8 w-8 text-red-500" />
          </motion.div>

          <h2 className="mt-6 text-2xl font-bold text-white">
            Something went wrong!
          </h2>

          <p className="mt-2 text-gray-400">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-farcaster-purple text-white rounded-lg hover:bg-purple-700 transition"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
