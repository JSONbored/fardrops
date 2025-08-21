'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1 
          className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-farcaster-purple to-base-blue"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.h1>
        
        <h2 className="mt-4 text-2xl font-semibold text-white">
          Airdrop Not Found
        </h2>
        
        <p className="mt-2 text-gray-400 max-w-md mx-auto">
          Looks like this airdrop has already been claimed or doesn&apos;t exist. 
          Let&apos;s get you back to tracking real opportunities!
        </p>
        
        <div className="mt-8 flex gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-farcaster-purple text-white rounded-lg hover:bg-purple-700 transition"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              <Search className="h-4 w-4" />
              Browse Airdrops
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}