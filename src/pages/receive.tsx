import {
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
} from "@thirdweb-dev/react";
import AppContainer from "@/components/AppContainer";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { CHAIN } from "@/const/config";
import { useQRCode } from "next-qrcode";
import WalletConnectSection from "@/components/WalletConnectSection";
import formatNumber from "@/lib/numberFormatter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function ReceivePage() {
  const address = useAddress();
  const router = useRouter();
  const { Canvas } = useQRCode();

  const { data: nativeTokenBalance, isLoading: loadingNativeTokenBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);

  return (
    <AppContainer>
      <div className="container max-w-[720px] flex flex-col items-center lg:items-center h-auto min-h-[84%] px-3 py-8 lg:px-8 lg:mt-48 gap-2 lg:gap-0">
        <h1 className="scroll-m-20 text-4xl lg:text-6xl font-extrabold tracking-tight lg:mt-4 text-start lg:self-start">
          Receive Funds
        </h1>
        <Separator className="w-5/6  mt-4 lg:mt-8 lg:mb-4" />

        {address ? (
          <>
            <div className="w-full flex flex-col justify-center items-center mt-2 ml-2">
              {loadingNativeTokenBalance && (
                <Skeleton className="w-full h-24" />
              )}
              {nativeTokenBalance && (
                <>
                  <p className="text-md lg:text-lg text-muted-foreground max-w-xl leading-normal text-center lg:text-start">
                    Your Balance
                  </p>

                  <h1 className="scroll-m-20 text-2xl lg:text-4xl font-extrabold tracking-tight  text-center">
                    {formatNumber(Number(nativeTokenBalance?.displayValue))}{" "}
                    {nativeTokenBalance?.symbol}
                  </h1>

                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Wallaby Pay uses {CHAIN.name}.</AlertTitle>
                    <AlertDescription>
                      Please ensure you send the native currency{" "}
                      <strong>{CHAIN.nativeCurrency.symbol}</strong> on the{" "}
                      <strong>{CHAIN.name}</strong> network.
                    </AlertDescription>
                  </Alert>

                  <Separator className="mt-4" />
                </>
              )}
            </div>
            <Canvas
              text={address}
              options={{
                width: 384,
              }}
            />

            <p className="text-sm lg:text-lg text-muted-foreground max-w-xl leading-normal text-center mt-4">
              Your Wallet Address: <strong>{address}</strong>
            </p>

            <Button
              className="w-full mt-2"
              onClick={() => {
                navigator.clipboard.writeText(address);
              }}
            >
              Copy Wallet Address
            </Button>

            <Button
              className="w-full mt-1"
              variant="outline"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Go Back
            </Button>
          </>
        ) : (
          <WalletConnectSection />
        )}
      </div>
    </AppContainer>
  );
}
