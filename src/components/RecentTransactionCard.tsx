import React from "react";
import { Card } from "./ui/card";
import { TransactionResponse } from "@ethersproject/providers";
import { CircleDot } from "lucide-react";
import { ethers } from "ethers";
import formatAddress from "@/lib/formatAddress";
import formatNumber from "@/lib/numberFormatter";
import Link from "next/link";
import { CHAIN } from "@/const/config";

type Props = {
  transaction: TransactionResponse;
  address: string;
};

export default function RecentTransactionCard({ transaction, address }: Props) {
  const isReceive = address === transaction.to;

  return (
    <Link
      href={`${CHAIN.explorers[0].url}/tx/${transaction.hash}`}
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
              ? formatAddress(transaction.from)
              : transaction.to
              ? formatAddress(transaction.to)
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
            Number(ethers.utils.formatEther(transaction.value))
          )}{" "}
        </p>
      </Card>
    </Link>
  );
}
