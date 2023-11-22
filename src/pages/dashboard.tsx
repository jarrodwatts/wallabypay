import {
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
} from "@thirdweb-dev/react";
import { useProfiles } from "@lens-protocol/react-web";
import { Skeleton } from "@/components/ui/skeleton";
import WalletConnectSection from "@/components/WalletConnectSection";
import AppContainer from "@/components/AppContainer";

let formatter = Intl.NumberFormat("en", { notation: "compact" });

export default function Dashboard() {
  const address = useAddress();
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
            {formatter.format(Number(nativeTokenBalance?.displayValue))}{" "}
            {nativeTokenBalance?.symbol}
          </h1>
        )}

        <p className="w-full text-sm text-muted-foreground text-center lg:text-right">
          Available to spend.
        </p>
      </div>
    </AppContainer>
  );
}
