import {
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
} from "@thirdweb-dev/react";
import WalletConnectSection from "@/components/WalletConnectSection";
import AppContainer from "@/components/AppContainer";
import Image from "next/image";
import useTransactionHistory from "@/hooks/useTransactionHistory";
import RecentTransactionCard from "@/components/RecentTransactionCard";
import formatNumber from "@/lib/numberFormatter";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfiles } from "@lens-protocol/react-web";
import { Card } from "@/components/ui/card";
import { ArrowDownToLine, Send } from "lucide-react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const address = useAddress();

  const {
    data: transactionHistory,
    isLoading: loadingTransactionHistory,
    error: transactionHistoryError,
  } = useTransactionHistory(address);

  const { data: lensProfiles } = useProfiles({
    where: {
      // @ts-expect-error: Address might be undefined but it works fine
      ownedBy: [address],
    },
  });

  const { data: nativeTokenBalance, isLoading: loadingNativeTokenBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);

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

        {/* Card Section */}
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
        <h2 className="text-2xl font-semibold mt-16 mb-4">Recent Activity</h2>
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
                key={transaction.hash}
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
