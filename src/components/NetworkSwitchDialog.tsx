import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CHAIN } from "@/const/config";
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  isOpen: boolean;
};

export default function NetworkSwitchDialog({ isOpen }: Props) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="w-full flex flex-row items-center justify-center">
            <Image
              src={"/wallaby-zkevm.png"}
              alt="Wallaby"
              width={96}
              height={96}
              style={{
                // flip the image
                transform: "scaleX(-1)",
              }}
            />
          </div>
          <DialogTitle>Switch to Polygon zkEVM</DialogTitle>
          <DialogDescription>
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
              {CHAIN.name}
            </Link>{" "}
            blockchain.
          </DialogDescription>

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
            style={{ width: "100%", marginTop: 16 }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
