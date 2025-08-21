'use client'

import { useEffect, useState } from 'react'

export default function TestPage() {
  const [errors, setErrors] = useState<string[]>([])
  const [hydrationStatus, setHydrationStatus] = useState('Checking...')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check for hydration
    setHydrationStatus('Hydrated successfully')
    
    // Capture any console errors
    const originalError = console.error
    const capturedErrors: string[] = []
    
    console.error = (...args) => {
      capturedErrors.push(args.join(' '))
      setErrors(prev => [...prev, args.join(' ')])
      originalError.apply(console, args)
    }
    
    // Test window object
    if (typeof window !== 'undefined') {
      console.log('Window object available')
    }
    
    // Check for browser extensions
    const checkExtensions = () => {
      const extensions = []
      if ((window as any).ethereum) extensions.push('MetaMask or Web3 Wallet')
      if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) extensions.push('React DevTools')
      if ((window as any).chrome?.runtime) extensions.push('Chrome Extension')
      return extensions
    }
    
    const detectedExtensions = checkExtensions()
    console.log('Detected extensions:', detectedExtensions)
    
    return () => {
      console.error = originalError
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">System Test Page</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Hydration Status</h2>
          <p className={hydrationStatus === 'Hydrated successfully' ? 'text-green-400' : 'text-yellow-400'}>
            {hydrationStatus}
          </p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Client Mount Status</h2>
          <p className={mounted ? 'text-green-400' : 'text-yellow-400'}>
            {mounted ? 'Mounted on client' : 'Not mounted yet'}
          </p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Console Errors</h2>
          {errors.length === 0 ? (
            <p className="text-green-400">No errors detected</p>
          ) : (
            <ul className="text-red-400 space-y-1">
              {errors.map((error, i) => (
                <li key={i} className="font-mono text-sm">{error}</li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Environment</h2>
          <ul className="space-y-1 text-sm">
            <li>Node Env: {process.env.NODE_ENV}</li>
            <li>Browser: {mounted && typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'Loading...'}</li>
            <li>React Version: {mounted ? require('react').version : 'Loading...'}</li>
            <li>Next.js Version: 15.5.0</li>
          </ul>
        </div>
        
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Quick Tests</h2>
          <div className="space-y-2">
            <button 
              onClick={() => console.log('Button clicked')}
              className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
            >
              Test Console Log
            </button>
            <button 
              onClick={() => {
                throw new Error('Test error boundary')
              }}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 ml-2"
            >
              Test Error Boundary
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}