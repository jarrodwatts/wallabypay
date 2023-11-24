import AppContainer from "@/components/AppContainer";
import WalletConnectSection from "@/components/WalletConnectSection";
import { Separator } from "@/components/ui/separator";
import { useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const address = useAddress();

  useEffect(() => {
    if (address) {
      router.push("/dashboard");
    }
  }, [address, router]);

  return (
    <AppContainer>
      <div className="container justify-center flex flex-col lg:flex-row lg:justify-around items-center h-screen gap-8 lg:gap-0 px-3">
        <div className="mt-72 lg:mt-0 lg:w-0">
          <Image
            src="/wallaby-wallet.png"
            width={240}
            height={240}
            quality={100}
            alt="Wallaby"
            className="visible lg:invisible"
          />
        </div>

        <div className="lg:-mt-48 flex flex-col items-center lg:items-start">
          <h1 className="mt-4 text-4xl lg:text-6xl font-bold lg:font-extrabold leading-snug text-center lg:text-start text-slate-900">
            Let&rsquo;s get started.
          </h1>
          <p className="text-md lg:text-lg text-muted-foreground mt-6 mb-6 max-w-xl leading-normal text-center lg:text-start">
            Wallaby Pay uses{" "}
            <Link
              className="underline"
              href="https://ethereum.org/en/wallets/"
              target="_blank"
              rel="noopener noreferrer"
            >
              wallets
            </Link>{" "}
            to send and receive{" "}
            <Link
              className="underline"
              href="https://ethereum.org/en/stablecoins/"
              target="_blank"
              rel="noopener noreferrer"
            >
              stablecoins
            </Link>{" "}
            on the{" "}
            <Link
              className="underline"
              href="https://polygon.technology/polygon-pos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polygon PoS
            </Link>{" "}
            blockchain.
          </p>

          <p className="text-md lg:text-lg text-muted-foreground mb-8 max-w-xl leading-normal text-center lg:text-start">
            Don&rsquo;t have a wallet yet?
            <br />
            <strong>No problem.</strong> We&rsquo;ll set one up for you.
          </p>

          <Separator className="mb-4" />

          <WalletConnectSection />
        </div>

        <div>
          <Image
            src="/wallaby-wallet.png"
            width={500}
            height={500}
            quality={100}
            alt="Wallaby"
            className="invisible h-48 lg:-mt-72 lg:visible lg:h-auto"
          />
        </div>
      </div>
    </AppContainer>
  );
}
