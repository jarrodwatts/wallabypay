import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <main
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: `
            radial-gradient(circle farthest-side at -15% 85%, rgba(90, 122, 255, .36), rgba(0, 0, 0, 0) 52%),
            radial-gradient(circle farthest-side at 100% 30%, rgba(245, 40, 145, 0.25), rgba(0, 0, 0, 0) 30%)
          `,
      }}
    >
      <div className="container justify-center flex flex-col lg:flex-row lg:justify-around items-center h-screen gap-8 lg:gap-0 px-3">
        <div className="mt-72">
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
          <p className="text-md lg:text-lg text-muted-foreground mt-6 mb-8 max-w-xl leading-normal text-center lg:text-start">
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
              href="https://polygon.technology/polygon-zkevm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polygon zkEVM
            </Link>{" "}
            blockchain.
          </p>

          <p className="text-md lg:text-lg text-muted-foreground mb-8 max-w-xl leading-normal text-center lg:text-start">
            Don&rsquo;t know what that means? <br /> <strong>No problem</strong>
            . We can create one for you.
          </p>

          <ConnectWallet
            theme={"light"}
            switchToActiveChain={true}
            modalSize={"wide"}
            welcomeScreen={{
              img: {
                src: "ipfs://bafybeifr7hqrtwsjr7s33pivbppq73rpzdbval7xzdkt5mgg4c5ox4toye/wallaby-wallet.png",
                width: 150,
                height: 150,
              },
              title: "Connect a wallet to use Wallaby Pay",
              subtitle:
                "Wallets help you access your digital assets and sign in to web3 applications.",
            }}
            modalTitleIconUrl={""}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <Image
            src="/wallaby-wallet.png"
            width={500}
            height={500}
            quality={100}
            alt="Wallaby"
            className="invisible lg:-mt-72 lg:visible"
          />
        </div>
      </div>
    </main>
  );
}
