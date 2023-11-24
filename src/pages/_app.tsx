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

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [walletOptions, setWalletOptions] = useState<"byo" | "create">("byo");

  return (
    <main className={`${inter.className}`}>
      <QueryClientProvider client={queryClient}>
        <LensProvider
          config={{
            environment: production,
            bindings: {
              getProvider: async () => new JsonRpcProvider(CHAIN.rpc[0]),
              // @ts-expect-error: We're only doing read-only stuff, should ideally never hit this. If it does, it will error.
              getSigner: async () => null,
            },
          }}
        >
          <WalletOptionsProvider
            setWalletOptions={setWalletOptions}
            walletOptions={walletOptions}
          >
            <ThirdwebProvider
              activeChain={CHAIN}
              clientId={process.env.NEXT_PUBLIC_THIRDWEB_KEY}
              queryClient={queryClient}
              supportedWallets={
                walletOptions === "byo" ? byoWalletOptions : createWalletOptions
              }
            >
              <NextNProgress />
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
  const isMismatched = useNetworkMismatch();

  const [showDialog, setShowDialog] = useState<boolean>(true);

  useEffect(() => {
    if (isMismatched) {
      setShowDialog(true);
    }
  }, [isMismatched]);

  return (
    <>
      {showDialog && <NetworkSwitchDialog isOpen={isMismatched} />}
      <Component {...pageProps} />
    </>
  );
}
