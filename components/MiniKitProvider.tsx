'use client'

import { ReactNode } from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { coinbaseWallet } from 'wagmi/connectors'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

// Create wagmi config with MiniKit support
const config = getDefaultConfig({
  appName: 'FarDrops',
  projectId: 'YOUR_PROJECT_ID', // Get from WalletConnect Cloud
  chains: [base, baseSepolia],
  ssr: true,
})

const queryClient = new QueryClient()

interface MiniKitProviderProps {
  children: ReactNode
}

export function MiniKitProvider({ children }: MiniKitProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}