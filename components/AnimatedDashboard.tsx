"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  TrendingUp,
  Gift,
  Sparkles,
  DollarSign,
  Clock,
  Check,
  AlertCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useState, useEffect } from "react";

const airdrops = [
  {
    id: 1,
    project: "DEGEN",
    logo: "🎩",
    amount: "1,000",
    value: "$450",
    change: "+12%",
    status: "live",
    timeLeft: "2d 14h",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    project: "Higher",
    logo: "⬆️",
    amount: "500",
    value: "$280",
    change: "+8%",
    status: "live",
    timeLeft: "5d 3h",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    project: "Base NFT",
    logo: "🎨",
    amount: "Free Mint",
    value: "TBD",
    change: "New",
    status: "upcoming",
    timeLeft: "Soon",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 4,
    project: "Frames",
    logo: "🖼️",
    amount: "250",
    value: "$125",
    change: "+5%",
    status: "ended",
    timeLeft: "Ended",
    gradient: "from-gray-500 to-gray-600",
  },
];

export default function AnimatedDashboard() {
  const [activeTab, setActiveTab] = useState("live");
  const [totalValue, setTotalValue] = useState(12450);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [chartData, setChartData] = useState(
    Array.from({ length: 7 }, () => Math.random() * 100),
  );

  useEffect(() => {
    // Animate total value
    const interval = setInterval(() => {
      setTotalValue((prev) => prev + Math.floor(Math.random() * 100 - 30));
    }, 3000);

    // Animate chart data
    const chartInterval = setInterval(() => {
      setChartData((prev) => [...prev.slice(1), Math.random() * 100]);
    }, 2000);

    // Add notifications
    const notifInterval = setInterval(() => {
      const newNotif = {
        id: Date.now(),
        text: `New airdrop detected: ${["MEME", "SOCIAL", "BUILD", "MINT"][Math.floor(Math.random() * 4)]}`,
        time: "just now",
      };
      setNotifications((prev) => [newNotif, ...prev.slice(0, 2)]);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(chartInterval);
      clearInterval(notifInterval);
    };
  }, []);

  const filteredAirdrops = airdrops.filter((a) => {
    if (activeTab === "all") return true;
    return a.status === activeTab;
  });

  return (
    <div className="w-full h-full bg-[#0A0B0D] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
            >
              <Gift className="w-4 h-4 text-white" />
            </motion.div>
            <span className="font-semibold text-white">FarDrops</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </motion.div>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">+24%</span>
            </div>
            <p className="text-2xl font-bold text-white">
              ${totalValue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Portfolio Value</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-400">Active</span>
            </div>
            <p className="text-2xl font-bold text-white">24</p>
            <p className="text-xs text-gray-400">Live Airdrops</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <Check className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-400">98%</span>
            </div>
            <p className="text-2xl font-bold text-white">142</p>
            <p className="text-xs text-gray-400">Claimed</p>
          </motion.div>
        </div>

        {/* Chart */}
        <div className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Airdrop Activity</h3>
            <span className="text-xs text-gray-400">Last 7 days</span>
          </div>
          <div className="flex items-end gap-1 h-20">
            {chartData.map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
              />
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-4">
          {["all", "live", "upcoming", "ended"].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-white/5 text-gray-400 border border-white/10"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Airdrop List */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredAirdrops.map((airdrop, index) => (
              <motion.div
                key={airdrop.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur rounded-lg p-3 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className={`w-10 h-10 bg-gradient-to-r ${airdrop.gradient} rounded-lg flex items-center justify-center text-xl`}
                    >
                      {airdrop.logo}
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {airdrop.project}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">
                          {airdrop.amount}
                        </span>
                        <span className="text-xs text-green-400">
                          {airdrop.value}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p
                        className={`text-xs font-medium ${
                          airdrop.change.startsWith("+")
                            ? "text-green-400"
                            : airdrop.change === "New"
                              ? "text-blue-400"
                              : "text-gray-400"
                        }`}
                      >
                        {airdrop.change}
                      </p>
                      <p className="text-xs text-gray-400">
                        {airdrop.timeLeft}
                      </p>
                    </div>
                    {airdrop.status === "live" && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-xs font-medium text-white"
                      >
                        Claim
                      </motion.button>
                    )}
                    {airdrop.status === "upcoming" && (
                      <button className="px-3 py-1 bg-yellow-500/20 rounded-lg text-xs font-medium text-yellow-400 border border-yellow-500/30">
                        Soon
                      </button>
                    )}
                    {airdrop.status === "ended" && (
                      <button className="px-3 py-1 bg-gray-500/20 rounded-lg text-xs font-medium text-gray-400 border border-gray-500/30">
                        Ended
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Notifications Popup */}
        <AnimatePresence>
          {notifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-4 right-4 bg-black/90 backdrop-blur rounded-lg p-3 border border-white/20 max-w-xs"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-xs text-white">{notifications[0]?.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notifications[0]?.time}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
