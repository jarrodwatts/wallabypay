import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import {
  ThirdwebProvider,
  coinbaseWallet,
  en,
  metamaskWallet,
  phantomWallet,
  rainbowWallet,
  trustWallet,
  walletConnect,
  zerionWallet,
} from "@thirdweb-dev/react";
import NextNProgress from "nextjs-progressbar";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className}`}>
      <ThirdwebProvider
        activeChain={PolygonZkevmTestnet}
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_KEY}
        locale={en()}
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet(),
          walletConnect(),
          trustWallet(),
          zerionWallet(),
          rainbowWallet(),
          phantomWallet(),
        ]}
      >
        <NextNProgress />
        <Component {...pageProps} />
      </ThirdwebProvider>
    </main>
  );
}
