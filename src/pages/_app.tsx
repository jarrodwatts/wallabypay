import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ThirdwebProvider, useNetworkMismatch } from "@thirdweb-dev/react";
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { production, LensProvider } from "@lens-protocol/react-web";
import { JsonRpcProvider } from "@ethersproject/providers";
import { CHAIN, byoWalletOptions, createWalletOptions } from "@/const/config";
import { useEffect, useState } from "react";
import { WalletOptionsProvider } from "@/context/WalletOptionsContext";
import NetworkSwitchDialog from "@/components/NetworkSwitchDialog";

const inter = Inter({ subsets: ["latin"] });

// Since thirdweb uses React Query, and we also want to use it for other stuff, we can share the same query client.
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  // This is a bit hacky, but it's used to change what options appear in the Connect Wallet button.
  // We do this because we want each button to share the same Provider context, but want different buttons
  // to show different connection options.
  const [walletOptions, setWalletOptions] = useState<"byo" | "create">("byo");

  return (
    <main className={`${inter.className}`}>
      {/* Here's our own React Query client. */}
      <QueryClientProvider client={queryClient}>
        {/* We're using some basic Lens features for reading and searching user's profiles */}
        <LensProvider
          config={{
            // this sets the environment to production, which uses the mainnet contracts
            environment: production,
            bindings: {
              // Use the default RPC coming from the CHAIN object in const/config.ts
              getProvider: async () => new JsonRpcProvider(CHAIN.rpc[0]),
              // @ts-expect-error: We're only doing read-only stuff, should ideally never hit this. If it does, it will error.
              getSigner: async () => null,
            },
          }}
        >
          {/* So here we're wrapping the app in this context from context/WalletOptionsContext.
              It's used to change what options appear in the Connect Wallet button (see further info above) */}
          <WalletOptionsProvider
            setWalletOptions={setWalletOptions}
            walletOptions={walletOptions}
          >
            <ThirdwebProvider
              // We set the app's main chain on the ThirdwebProvider defined in const/config.ts
              activeChain={CHAIN}
              // Grab a thirdweb client ID from thirdweb.com
              clientId={process.env.NEXT_PUBLIC_THIRDWEB_KEY}
              // Provide the same query client we initialized above so they share the same cache.
              queryClient={queryClient}
              supportedWallets={
                // As you can see, we're basically saying - if the user clicked the "Connect" button, show all the wallets.
                // If the user clicked the "Create" button, show only the Paper wallet, i.e. the Email signup flow.
                walletOptions === "byo" ? byoWalletOptions : createWalletOptions
              }
            >
              {/* Show a loading bar and spinner at the top of the page on router changes. */}
              <NextNProgress />
              {/* This is used to overlay the Network dialog when the user is on the wrong chain.
                We need information from a thirdweb react hook to do that, so we create a separate component. */}
              <AppWrapper Component={Component} pageProps={pageProps} />
            </ThirdwebProvider>
          </WalletOptionsProvider>
        </LensProvider>
      </QueryClientProvider>
    </main>
  );
}

function AppWrapper({
  Component,
  pageProps,
}: {
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
}) {
  // This says: is the current network different from the one defined in the thirdweb provider's activeChain prop?
  const isMismatched = useNetworkMismatch();

  // Do we want to show the dialog? We only want to show it if the user is on the wrong network.
  const [showDialog, setShowDialog] = useState<boolean>(true);

  useEffect(() => {
    // If the user is on the wrong network, show the dialog.
    if (isMismatched) {
      setShowDialog(true);
    }
    // Run this effect whenever the isMismatched variable changes. i.e. whenever the user switches networks.
  }, [isMismatched]);

  return (
    <>
      {/* Simply overlay the dialog over the rest of the app */}
      {showDialog && <NetworkSwitchDialog isOpen={isMismatched} />}
      <Component {...pageProps} />
    </>
  );
}
