import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";

const fetchTransactionHistory = async (address: string) => {
  const network = ethers.providers.getNetwork("mumbai");
  const provider = new ethers.providers.EtherscanProvider(network);
  const transactions = await provider.getHistory(address);

  // Filter transactions where the address is the sender or receiver
  const filteredTransactions = transactions.filter(
    (tx) => tx.from === address || tx.to === address
  );

  // Sort filtered transactions by timestamp
  filteredTransactions?.sort(
    (a, b) => (b?.timestamp || 0) - (a?.timestamp || 0)
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
