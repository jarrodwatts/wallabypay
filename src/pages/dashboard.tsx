import {
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
} from "@thirdweb-dev/react";
import WalletConnectSection from "@/components/WalletConnectSection";
import RecentTransactionCard from "@/components/RecentTransactionCard";
import AppContainer from "@/components/AppContainer";
import Image from "next/image";
import useTransactionHistory from "@/hooks/useTransactionHistory";
import formatNumber from "@/lib/numberFormatter";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfiles } from "@lens-protocol/react-web";
import { Card } from "@/components/ui/card";
import { ArrowDownToLine, Send } from "lucide-react";
import { useRouter } from "next/router";

/**
 * This is the main page that user's see after the connection flow from /login.
 * It shows the user's balance, recent transactions, and options to send and receive.
 */
export default function Dashboard() {
  // Useful to send user's to the /send and /receive pages.
  const router = useRouter();
  // Grab the currently connected wallet address.
  const address = useAddress();

  // Fetch the user's most recent send & receive transactions using the Etherscan API wrapped in a React Query hook.
  const {
    data: transactionHistory,
    isLoading: loadingTransactionHistory,
    error: transactionHistoryError,
  } = useTransactionHistory(address);

  // Just for some nice UI, we can grab the user's Lens profile and show their name if they have one.
  const { data: lensProfiles } = useProfiles({
    where: {
      // @ts-expect-error: Address might be undefined but it works fine
      ownedBy: [address],
    },
  });

  // Load their balance in the native token. i.e. ETH on Ethereum, MATIC on Polygon, etc.
  const { data: nativeTokenBalance, isLoading: loadingNativeTokenBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);

  // If the user hit this page without going through the login flow, show the wallet connection section rather than the main page.
  // We need the user to be connected to a wallet to show their balance and transaction history.
  if (!address) {
    return (
      <AppContainer>
        <div className="container max-w-screen-sm w-[560px] flex flex-col items-center lg:items-start h-screen px-3 py-8 lg:px-8 lg:mt-48">
          <WalletConnectSection />
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <div className="container max-w-[720px] flex flex-col items-center lg:items-start h-screen max-h-[85%] px-3 py-8 lg:px-8 lg:mt-48 gap-4 lg:gap-0">
        {/* Balance Section */}
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Welcome back,{" "}
          <strong>
            {lensProfiles?.[0]?.handle?.localName ?? address?.slice(0, 6)}
          </strong>
          .
        </p>
        {loadingNativeTokenBalance && <Skeleton className="w-full h-24" />}
        {nativeTokenBalance && (
          <h1 className="scroll-m-20 text-5xl lg:text-8xl font-extrabold tracking-tight lg:mt-4 text-center">
            {formatNumber(Number(nativeTokenBalance?.displayValue))}{" "}
            {nativeTokenBalance?.symbol}
          </h1>
        )}
        <p className="w-full text-sm text-muted-foreground text-center lg:text-right">
          Available to spend.
        </p>

        {/* Card Section: Receive and Send */}
        <div className="w-full flex flex-row justify-center items-center gap-2 lg:gap-4 mt-6 lg:mt-12">
          <Card
            className="w-1/2 flex flex-col items-center justify-start gap-2 py-2 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer"
            onClick={() => router.push("/receive")}
          >
            <Image
              src={`/wallaby-receive.png`}
              width={128}
              height={128}
              alt="Receive"
            />

            <p className="text-lg font-semibold flex flex-row items-center gap-2">
              Receive
              <ArrowDownToLine />
            </p>
          </Card>
          <Card
            className="w-1/2 flex flex-col items-center justify-start gap-2 py-2 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer"
            onClick={() => router.push("/send")}
          >
            <Image
              src={`/wallaby-money.png`}
              width={128}
              height={128}
              alt="Send"
            />

            <p className="text-lg font-semibold flex flex-row items-center gap-2">
              Send
              <Send />
            </p>
          </Card>
        </div>

        {/* Transaction History Section */}
        <h2 className="text-2xl font-semibold mt-16 mb-4">Recent Payments</h2>
        {!!transactionHistoryError && (
          <p className="text-sm text-red-500">
            Failed to load transaction history.
          </p>
        )}
        {loadingTransactionHistory &&
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-16 mb-2" />
          ))}
        {transactionHistory && (
          <div className="w-full flex flex-col gap-2 pb-8">
            {transactionHistory.map((transaction) => (
              <RecentTransactionCard
                key={transaction.tx_hash}
                transaction={transaction}
                address={address}
              />
            ))}
          </div>
        )}
        {!loadingTransactionHistory && !transactionHistory?.length && (
          <p className="text-sm text-muted-foreground">
            No recent transactions.
          </p>
        )}
      </div>
    </AppContainer>
  );
}
