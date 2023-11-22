import { Mumbai } from "@thirdweb-dev/chains";
import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  phantomWallet,
  rainbowWallet,
  trustWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";

export const CHAIN = Mumbai;

export const byoWalletOptions = [
  metamaskWallet(),
  coinbaseWallet(),
  walletConnect(),
  phantomWallet(),
  rainbowWallet(),
  trustWallet(),
];

export const createWalletOptions = [
  embeddedWallet({
    auth: {
      options: ["email", "facebook", "apple", "google"],
    },
    recommended: true,
  }),
];
