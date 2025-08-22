"use client";

import { ReactNode, useEffect } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import "@rainbow-me/rainbowkit/styles.css";
import "@coinbase/onchainkit/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

const config = createConfig({
  chains: [base],
  connectors: [farcasterMiniApp()],
  transports: {
    [base.id]: http(
      process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://mainnet.base.org",
    ),
  },
  ssr: true,
});

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Clean up any extension-injected globals that might cause issues
    if (typeof window !== "undefined") {
      // Prevent MetaMask from auto-connecting
      if ((window as any).ethereum) {
        (window as any).ethereum.autoRefreshOnNetworkChange = false;
      }
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
        >
          <RainbowKitProvider modalSize="compact">
            {children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
