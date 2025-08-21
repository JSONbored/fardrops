'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface MonitorResult {
  success: boolean
  data?: any
  error?: string
  timestamp: string
}

export default function AdminPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, MonitorResult>>({})

  const monitors = [
    { name: 'Clanker', endpoint: '/api/monitor/clanker', icon: '🤖' },
    { name: 'DEGEN', endpoint: '/api/monitor/degen', icon: '🎩' },
    { name: 'Power Badge', endpoint: '/api/monitor/power-badge', icon: '⚡' },
    { name: 'All Monitors', endpoint: '/api/monitor/all', icon: '🚀' },
  ]

  const runMonitor = async (monitor: typeof monitors[0]) => {
    setLoading(monitor.name)
    
    try {
      const response = await fetch(monitor.endpoint, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'development'}`,
        }
      })
      
      const data = await response.json()
      setResults((prev: Record<string, MonitorResult>) => ({
        ...prev,
        [monitor.name]: {
          success: response.ok,
          data,
          timestamp: new Date().toISOString()
        }
      }))
    } catch (error) {
      setResults((prev: Record<string, MonitorResult>) => ({
        ...prev,
        [monitor.name]: {
          success: false,
          error: error instanceof Error ? error.message : 'Failed',
          timestamp: new Date().toISOString()
        }
      }))
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manual monitoring controls for testing</p>
        </motion.div>

        <div className="grid gap-4">
          {monitors.map((monitor, index) => (
            <motion.div
              key={monitor.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{monitor.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{monitor.name}</h3>
                    <p className="text-sm text-gray-400">{monitor.endpoint}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => runMonitor(monitor)}
                  disabled={loading === monitor.name}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 rounded-lg flex items-center gap-2 transition"
                >
                  {loading === monitor.name ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Run Monitor
                </button>
              </div>

              {results[monitor.name] && (
                <div className="mt-4 p-4 bg-black/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {results[monitor.name].success ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-sm text-gray-400">
                      {new Date(results[monitor.name].timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <pre className="text-xs text-gray-300 overflow-x-auto">
                    {JSON.stringify(results[monitor.name].data || results[monitor.name].error, null, 2)}
                  </pre>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-2">📝 Setup Instructions</h3>
          <ol className="space-y-2 text-sm text-gray-300">
            <li>1. Add GitHub Secrets: APP_URL and CRON_SECRET</li>
            <li>2. GitHub Actions will run monitors every 15 minutes</li>
            <li>3. Or use free services like UptimeRobot to ping /api/monitor/trigger</li>
            <li>4. Manual testing: Use this admin panel</li>
          </ol>
        </motion.div>
      </div>
    </div>
  )
}