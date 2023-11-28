import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  phantomWallet,
  rainbowWallet,
  trustWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";

// What chain do you want the app to run on?
// This const is used throughout the app for the chain's name, native currency, explorer URL, RPC, etc.
export const CHAIN = PolygonZkevmTestnet;

export const explorerUrl = "https://testnet-zkevm.polygonscan.com/";

// What wallet options do you want to show when the user clicks "Connect Wallet"
export const byoWalletOptions = [
  metamaskWallet(),
  coinbaseWallet(),
  walletConnect(),
  phantomWallet(),
  rainbowWallet(),
  trustWallet(),
];

// What wallet options do you want to show when the user clicks "Sign up with Email?"
export const createWalletOptions = [
  embeddedWallet({
    auth: {
      options: ["email", "facebook", "apple", "google"],
    },
    recommended: true,
  }),
];
