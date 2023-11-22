import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { production, LensProvider } from "@lens-protocol/react-web";
import { JsonRpcProvider } from "@ethersproject/providers";
import { CHAIN, byoWalletOptions, createWalletOptions } from "@/const/config";
import { useState } from "react";
import { WalletOptionsProvider } from "@/context/WalletOptionsContext";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [walletOptions, setWalletOptions] = useState<"byo" | "create">("byo");

  console.log(walletOptions);

  return (
    <main className={`${inter.className}`}>
      <QueryClientProvider client={queryClient}>
        <LensProvider
          config={{
            environment: production,
            bindings: {
              getProvider: async () =>
                new JsonRpcProvider("polygon-zkevm.rpc.thirdweb.com"),
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
              <Component {...pageProps} />
            </ThirdwebProvider>
          </WalletOptionsProvider>
        </LensProvider>
      </QueryClientProvider>
    </main>
  );
}
