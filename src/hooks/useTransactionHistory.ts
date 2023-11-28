import { useQuery } from "@tanstack/react-query";
import { CovalentClient } from "@covalenthq/client-sdk";

const fetchTransactionHistory = async (address: string) => {
  const client = new CovalentClient(
    process.env.NEXT_PUBLIC_COVALENT_API_KEY as string
  );

  const response = await client.TransactionService.getTransactionsForAddressV3(
    "polygon-zkevm-testnet",
    address,
    0
  );

  // Filter transactions where the address is the sender or receiver
  const filteredTransactions = response.data.items.sort(
    (a, b) => b?.block_signed_at.getTime() - a?.block_signed_at.getTime()
  );

  // Limit to the 10 latest transactions
  const latestTransactions = filteredTransactions.slice(0, 5);

  return latestTransactions;
};

export default function useTransactionHistory(address: string | undefined) {
  return useQuery(
    ["transaction-history", address],
    () => fetchTransactionHistory(address as string),
    {
      enabled: address !== undefined, // Only fetch when the address is defined
    }
  );
}
