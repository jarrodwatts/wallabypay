import React, { createContext, useContext, useState, FC } from "react";

// Define the types for the context
interface WalletOptionsContextProps {
  walletOptions: "byo" | "create";
  setWalletOptions: React.Dispatch<React.SetStateAction<"byo" | "create">>;
}

// Create the context
const WalletOptionsContext = createContext<
  WalletOptionsContextProps | undefined
>(undefined);

/**
 * WalletOptionsProvider is a context provider component that manages the wallet options state.
 * It's a bit hacky, but we use this to control the wallet options in the ConnectWallet component
 * from @thirdweb-dev/react. The list of wallets is defined in the ThirdwebProvider in _app.tsx,
 *
 * @component
 * @example
 * // Usage in a parent component:
 * <WalletOptionsProvider walletOptions="byo" setWalletOptions={}>
 * ...
 * </WalletOptionsProvider>
 *
 * @param {object} props - React props for the WalletOptionsProvider component.
 * @param {("byo" | "create")} props.walletOptions - The current wallet options ("byo" or "create").
 * @param {React.Dispatch<React.SetStateAction<"byo" | "create">>} props.setWalletOptions - The state setter function for wallet options.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} - Returns the JSX element representing the WalletOptionsProvider.
 */
export const WalletOptionsProvider: FC<{
  walletOptions: "byo" | "create";
  setWalletOptions: React.Dispatch<React.SetStateAction<"byo" | "create">>;
  children: React.ReactNode;
}> = ({ walletOptions, setWalletOptions, children }) => {
  return (
    <WalletOptionsContext.Provider value={{ walletOptions, setWalletOptions }}>
      {children}
    </WalletOptionsContext.Provider>
  );
};

/**
 * useWalletOptions is a custom hook that provides access to the wallet options context.
 * This is so we can update what wallet connection options are shown from within a component.
 *
 * @function
 * @example
 * // Usage in a functional component:
 * const { walletOptions, setWalletOptions } = useWalletOptions();
 *
 * @returns {WalletOptionsContextProps} - Returns an object with wallet options and the state setter function.
 */
export const useWalletOptions = (): WalletOptionsContextProps => {
  const context = useContext(WalletOptionsContext);
  if (!context) {
    throw new Error(
      "useWalletOptions must be used within a WalletOptionsProvider"
    );
  }
  return context;
};
