import React, { createContext, useContext, useState, FC } from "react";

interface WalletOptionsContextProps {
  walletOptions: "byo" | "create";
  setWalletOptions: React.Dispatch<React.SetStateAction<"byo" | "create">>;
}

const WalletOptionsContext = createContext<
  WalletOptionsContextProps | undefined
>(undefined);

export const WalletOptionsProvider = ({
  walletOptions,
  setWalletOptions,
  children,
}: {
  walletOptions: "byo" | "create";
  setWalletOptions: React.Dispatch<React.SetStateAction<"byo" | "create">>;
  children: React.ReactNode;
}) => {
  console.log(walletOptions);

  return (
    <WalletOptionsContext.Provider value={{ walletOptions, setWalletOptions }}>
      {children}
    </WalletOptionsContext.Provider>
  );
};

export const useWalletOptions = (): WalletOptionsContextProps => {
  const context = useContext(WalletOptionsContext);
  if (!context) {
    throw new Error(
      "useWalletOptions must be used within a WalletOptionsProvider"
    );
  }
  return context;
};
