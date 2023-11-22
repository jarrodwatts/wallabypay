import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { useWalletOptions } from "@/context/WalletOptionsContext";
import { useProfiles } from "@lens-protocol/react-web";

export default function WalletConnectSection() {
  const address = useAddress();
  const { setWalletOptions } = useWalletOptions();
  const { data: lensProfiles, loading: loadingLensProfiles } = useProfiles({
    where: {
      // @ts-expect-error: Address might be undefined but it works fine
      ownedBy: [address],
    },
  });

  return (
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

      {address && loadingLensProfiles && <Skeleton className="w-full h-6" />}

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
  );
}
