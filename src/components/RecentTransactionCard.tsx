import React from "react";
import { Card } from "./ui/card";
import { CircleDot } from "lucide-react";
import { ethers } from "ethers";
import formatAddress from "@/lib/formatAddress";
import formatNumber from "@/lib/numberFormatter";
import Link from "next/link";
import { CHAIN } from "@/const/config";
import { Transaction } from "@covalenthq/client-sdk";

type Props = {
  transaction: Transaction;
  address: string;
};

/**
 * RecentTransactionCard component displays information about a given transaction.
 * Used in the "Recent Payments" tab on the dashboard.
 *
 * @component
 * @example
 * // Usage in a parent component:
 * <RecentTransactionCard transaction={tx} address={"0x123"} />
 *
 * @param {object} props - React props for the RecentTransactionCard component.
 * @param {TransactionResponse} props.transaction - The Ethereum transaction response object.
 * @param {string} props.address - The user's Ethereum address.
 * @returns {JSX.Element} - Returns the JSX element representing the RecentTransactionCard.
 */
export default function RecentTransactionCard({ transaction, address }: Props) {
  // Determine if the transaction is a receive or send.
  // We use this to show different styles in the UI.
  const isReceive = address === transaction.to_address;

  return (
    <Link
      // Dynamically reading the explorer URL from the CHAIN object in const/config.ts
      href={`${CHAIN.explorers[0].url}/tx/${transaction.tx_hash}`}
      passHref
      target="_blank"
    >
      <Card className="w-full flex flex-row items-center justify-between p-4 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer">
        <div className="flex flex-row items-center gap-4">
          <CircleDot
            className={isReceive ? "text-green-500" : "text-red-500"}
          />

          <p className="text-sm font-semibold">
            {isReceive
              ? formatAddress(transaction.from_address)
              : transaction.to_address
              ? formatAddress(transaction.to_address)
              : "Unknown"}
          </p>
        </div>

        <p
          className={`text-sm text-end font-semibold ${
            isReceive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isReceive ? "+" : "-"}
          {formatNumber(
            Number(ethers.utils.formatEther(transaction.value || 0))
          )}{" "}
        </p>
      </Card>
    </Link>
  );
}
