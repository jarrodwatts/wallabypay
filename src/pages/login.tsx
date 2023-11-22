import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useWalletOptions } from "@/context/WalletOptionsContext";
import { useProfiles } from "@lens-protocol/react-web";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const address = useAddress();
  const { setWalletOptions } = useWalletOptions();

  const { data: lensProfiles, loading: loadingLensProfiles } = useProfiles({
    where: {
      // @ts-expect-error: Address might be undefined but it works fine
      ownedBy: [address],
    },
  });

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
              href="https://polygon.technology/polygon-zkevm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polygon zkEVM
            </Link>{" "}
            blockchain.
          </p>

          <p className="text-md lg:text-lg text-muted-foreground mb-8 max-w-xl leading-normal text-center lg:text-start">
            Don&rsquo;t have a wallet yet?
            <br />
            <strong>No problem.</strong> We&rsquo;ll set one up for you.
          </p>

          <Separator className="mb-4" />

          <div className="flex flex-col items-center justify-center rounded-xl shadow-xl h-auto w-full backdrop-blur-xl backdrop-filter bg-white bg-opacity-5 px-8 py-8">
            <div className="w-full flex flex-col items-center">
              <p className="text-md text-muted-foreground mb-4">
                I already have my own wallet.
              </p>

              <div
                className="w-full flex flex-row items-center justify-center z-10"
                onClick={() => setWalletOptions("byo")}
              >
                <ConnectWallet
                  theme={"light"}
                  switchToActiveChain={true}
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
                  style={{ width: "90%", marginBottom: 12 }}
                />
              </div>
            </div>

            {!address && (
              <>
                <div className="flex items-center justify-center w-full mt-6 opacity-50 mb-6">
                  <div className="w-1/4 h-px bg-muted-foreground opacity-25"></div>
                  <p className="text-md text-muted-foreground mx-4">OR</p>
                  <div className="w-1/4 h-px bg-muted-foreground opacity-25"></div>
                </div>

                <div className="w-full flex flex-col items-center">
                  <p className="text-md text-muted-foreground">
                    I&rsquo;m new to wallets, I need to create one.
                  </p>
                </div>

                <div
                  className="w-full flex flex-row items-center justify-center z-10"
                  onClick={() => setWalletOptions("create")}
                >
                  <ConnectWallet
                    theme={"light"}
                    btnTitle="Sign up with Email"
                    switchToActiveChain={true}
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
                    style={{
                      marginTop: 12,
                      width: "90%",
                      outline: "1px solid rgba(0,0,0,0.25)",
                      backgroundColor: "transparent",
                      color: "black",
                    }}
                  />
                </div>
              </>
            )}

            {address && loadingLensProfiles && (
              <Skeleton className="w-full h-6" />
            )}

            {address &&
              !loadingLensProfiles &&
              (lensProfiles && lensProfiles.length > 0 ? (
                <p className="text-green-500 text-sm lg:text-md mb-8 max-w-xl leading-normal text-center lg:text-start">
                  Found Lens profile:{" "}
                  {lensProfiles[0].handle?.suggestedFormatted.localName}
                </p>
              ) : (
                <p className="text-red-500 text-sm lg:text-md mb-8 max-w-xl leading-normal text-center lg:text-start">
                  No Lens profile found.
                </p>
              ))}
          </div>
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
    </main>
  );
}
