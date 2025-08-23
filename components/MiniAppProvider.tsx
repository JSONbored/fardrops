"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/miniapp-sdk";
import { MiniKitProvider } from "./MiniKitProvider";

interface MiniAppProviderProps {
  children: React.ReactNode;
}

export function MiniAppProvider({ children }: MiniAppProviderProps) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<any | undefined>();

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        // Initialize context
        const contextPromise = sdk.context;

        // Wait for context to be available
        contextPromise
          .then((ctx) => {
            console.log("Farcaster context:", ctx);
            setContext(ctx);
          })
          .catch((error) => {
            console.error("Failed to get Farcaster context:", error);
          });

        // Mark SDK as ready
        sdk.actions.ready();
        setIsSDKLoaded(true);
        console.log("Farcaster Mini App SDK initialized");

        // Set up primary button if needed
        sdk.actions.setPrimaryButton({
          text: "Track Airdrops",
        });

        // Optional: Add frame to user's collection
        const handleAddFrame = async () => {
          try {
            const result = await sdk.actions.addFrame();
            console.log("Frame added:", result);
          } catch (error) {
            console.error("Failed to add frame:", error);
          }
        };

        // Optional: Open external URL handler
        sdk.on("primaryButtonClicked", () => {
          window.location.href = "/dashboard";
        });
      } catch (error) {
        console.error("Failed to initialize Farcaster SDK:", error);
      }
    };

    // Only initialize in Farcaster context
    if (typeof window !== "undefined") {
      // Check if we're in a Farcaster frame context
      const isInFrame = window.parent !== window;
      if (isInFrame) {
        initializeSDK();
      } else {
        console.log("Not in Farcaster frame context");
        setIsSDKLoaded(true); // Allow app to work outside frame
      }
    }

    return () => {
      // Cleanup event listeners
      sdk.removeAllListeners();
    };
  }, []);

  return (
    <MiniKitProvider>
      <div data-sdk-loaded={isSDKLoaded}>{children}</div>
    </MiniKitProvider>
  );
}
