'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  // Find the MiniApp connector
  const miniappConnector = connectors.find(c => c.id === 'miniapp')
  const frameConnector = connectors.find(c => c.id === 'frame')
  
  const handleConnect = () => {
    // Try MiniApp connector first, fall back to frame
    const connector = miniappConnector || frameConnector
    if (connector) {
      connect({ connector })
    }
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <Button 
          onClick={() => disconnect()} 
          variant="outline"
          size="sm"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button 
      onClick={handleConnect}
      className="bg-blue-500 hover:bg-blue-600"
      size="sm"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  )
}