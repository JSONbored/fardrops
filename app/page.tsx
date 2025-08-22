'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp, Users, DollarSign, Globe, Check, ChevronRight, Star, ArrowUpRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import AnimatedDashboard from '@/components/AnimatedDashboard'
import { ConnectWallet } from '@/components/ConnectWallet'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      mouseX.set(clientX)
      mouseY.set(clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0A0B0D] text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Gradient Mesh Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-[120px]" />
      </div>

      {/* Dot Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-black/30 border-b border-white/10 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="font-bold text-xl"
              >
                FarDrops
              </motion.div>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="#features" className="text-gray-400 hover:text-white transition">Features</Link>
                <Link href="#how-it-works" className="text-gray-400 hover:text-white transition">How it Works</Link>
                <Link href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Now Live on Farcaster</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Track Every
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Farcaster Airdrop
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Never miss DEGEN, frame tokens, or NFT drops. Get instant notifications and claim directly from Farcaster.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur rounded-full font-medium border border-white/20"
              >
                View Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="aspect-[16/9] rounded-2xl bg-gradient-to-b from-white/5 to-white/10 backdrop-blur border border-white/10 p-2">
              <AnimatedDashboard />
            </div>
            
            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-10 -right-10 px-4 py-3 bg-black/80 backdrop-blur rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">DEGEN Airdrop</p>
                  <p className="text-xs text-gray-400">Claim in 2 days</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-10 -left-10 px-4 py-3 bg-black/80 backdrop-blur rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Frame NFT Drop</p>
                  <p className="text-xs text-gray-400">Live now</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Users', value: '5,000+', icon: Users },
              { label: 'Airdrops Tracked', value: '150+', icon: TrendingUp },
              { label: 'Total Value', value: '$2.5M', icon: DollarSign },
              { label: 'Success Rate', value: '98%', icon: Shield },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4">
                  <stat.icon className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-400">
              Powerful features to maximize your airdrop gains
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Projects',
                description: 'We verify every airdrop for legitimacy and safety before tracking.',
                color: 'blue',
              },
              {
                icon: Zap,
                title: 'Instant Alerts',
                description: 'Get notified immediately when new airdrops are detected.',
                color: 'purple',
              },
              {
                icon: TrendingUp,
                title: 'Portfolio Tracking',
                description: 'Monitor your airdrop portfolio and total earnings in real-time.',
                color: 'pink',
              },
              {
                icon: Users,
                title: 'Power Badge Perks',
                description: 'Exclusive airdrops and early access for Power Badge holders.',
                color: 'green',
              },
              {
                icon: Globe,
                title: 'Multi-Chain Support',
                description: 'Track airdrops across Base, Ethereum, and other chains.',
                color: 'orange',
              },
              {
                icon: DollarSign,
                title: 'Value Estimation',
                description: 'Real-time value estimates for all tracked airdrops.',
                color: 'cyan',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-8 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${feature.color}-500/20 mb-6`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
              Start tracking airdrops in 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect Wallet',
                description: 'Link your Farcaster account and Ethereum wallet to get started.',
              },
              {
                step: '02',
                title: 'Set Preferences',
                description: 'Choose which types of airdrops you want to track and get notified about.',
              },
              {
                step: '03',
                title: 'Claim Rewards',
                description: 'Get instant alerts and claim your airdrops directly from Farcaster.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl font-bold text-white/5 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-white/10" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400">
              Pay with crypto, stay sovereign
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Free',
                price: '$0',
                period: 'forever',
                features: [
                  '5 airdrops per month',
                  'Basic notifications',
                  'Community support',
                ],
                cta: 'Get Started',
                popular: false,
              },
              {
                name: 'Pro',
                price: '0.001 ETH',
                period: '/month',
                features: [
                  'Unlimited airdrops',
                  'Instant notifications',
                  'Priority support',
                  'Power Badge perks',
                  'API access',
                ],
                cta: 'Go Pro',
                popular: true,
              },
              {
                name: 'Team',
                price: '0.005 ETH',
                period: '/month',
                features: [
                  'Everything in Pro',
                  'Multiple accounts',
                  'Custom webhooks',
                  'Dedicated support',
                  'White-label options',
                ],
                cta: 'Contact Sales',
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-2xl ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50' 
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-full font-medium ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                      : 'bg-white/10 border border-white/20'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur border border-white/10 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Start?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands tracking airdrops on Farcaster
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black rounded-full font-medium inline-flex items-center gap-2"
              >
                Launch App
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">FarDrops</span>
              <span className="text-gray-400">© 2025</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
              <Link href="https://warpcast.com" className="text-gray-400 hover:text-white transition">Warpcast</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}