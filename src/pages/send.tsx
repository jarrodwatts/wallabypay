import {
  MediaRenderer,
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
} from "@thirdweb-dev/react";
import WalletConnectSection from "@/components/WalletConnectSection";
import AppContainer from "@/components/AppContainer";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { BookUser, ChevronLeft, Sprout } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CHAIN, explorerUrl } from "@/const/config";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { Profile, useSearchProfiles } from "@lens-protocol/react-web";
import formatNumber from "@/lib/numberFormatter";
import useSendPayment from "@/hooks/useSendPayment";
import validateAddress from "@/lib/validateAddress";

// Define the form phases we're going to use in the send page.
const formPhases = [
  // Phase 0: Enter Address to send funds to
  {
    title: "Who are you paying?",
    description: "Who's the lucky recipient?",
    options: [
      {
        key: "address",
        title: "Wallet Address",
        icon: <BookUser />,
      },
      {
        key: "lens",
        title: "Lens Profile",
        icon: <Sprout />,
      },
    ],
  },
  // Phase 1: Enter Amount to Send
  {
    title: "How much are you paying?",
    description: "How much do you want to send?",
  },
  // Phase 2: Confirm Details
  {
    title: "Ready to send?",
    description: "Review your payment and confirm.",
  },
  // Phase 3: Loading + error/success screen
  {
    title: "Sending Payment",
    description: "Please wait while we send your payment.",
  },
];

/**
 * On this page, user's can find a Lens profile to pay, or enter a wallet address to pay.
 * They first select a wallet address, then enter an amount to pay, then confirm the payment.
 * It's a long file, you'd probably want to split it up into multiple components.
 * But for simplicity sake, we've kept it all in one file.
 */
export default function SendPage() {
  // Get the currently conected wallet
  const address = useAddress();

  // Get the router so we can navigate between pages, e.g. go back to /dashboard
  const router = useRouter();

  // Manage what phase of the form we're on.
  const [formPhase, setFormPhase] = useState<number>(0);

  // What option did the user select to enter the address to pay? Lens or Wallet Address?
  const [enterAddressOption, setEnterAddressOption] = useState<
    null | "address" | "lens"
  >(null);

  // What is the wallet address we're sending funds to?
  const [addressToPay, setAddressToPay] = useState<string>("");

  // Is there any error with the address we're sending funds to? e.g. non-valid address?
  const [addressToPayError, setAddressToPayError] = useState<string>("");

  // What has the user entered as the Lens address to pay?
  const [lensProfileToPay, setLensProfileToPay] = useState<string>("");

  // Debounce the lens profile to pay so we don't spam the API with requests.
  const [debouncedLensProfile] = useDebounce(lensProfileToPay, 1000);

  // Search for the lens profile the user has entered to find relevant profiles that match the query.
  const { data: profiles } = useSearchProfiles({
    query: debouncedLensProfile,
  });

  // What lens profile did the user select to pay?
  const [selectedLensProfile, setSelectedLensProfile] = useState<Profile>();

  // How much are we sending?
  const [amountToPay, setAmountToPay] = useState<string>("");

  // Is there any error with the amount we're sending? e.g. non-valid amount?
  const [amountToPayError, setAmountToPayError] = useState<string>("");

  // Load the user's native token balance so we can show it in the UI.
  const { data: nativeTokenBalance, isLoading: loadingNativeTokenBalance } =
    useBalance(NATIVE_TOKEN_ADDRESS);

  // Function for sending the payment, incl. the response, error and loading state.
  const {
    data: paymentTransaction,
    error: paymentError,
    isLoading: isSendingPayment,
    mutate: sendPayment,
  } = useSendPayment();

  // If no wallet connected, show the wallet connection section.
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
        <h1 className="scroll-m-20 text-4xl lg:text-6xl font-extrabold tracking-tight lg:mt-4 text-center">
          Pay Someone
        </h1>

        <Separator className="w-5/6  mt-4 lg:mt-8 mb-8" />

        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-2 items-center justify-center lg:w-full lg:justify-between">
          <h2 className="text-xl lg:text-2xl font-semibold text-center lg:text-start lg:mb-4">
            {formPhases[formPhase].title}
          </h2>

          {/* Show the back button which has different behaviour depending on where we are at in the form */}
          {formPhase !== 3 && (
            <Button
              variant="outline"
              onClick={() => {
                if (formPhase === 0 && !enterAddressOption) {
                  router.push(`/dashboard`);
                }

                if (formPhase === 0 && enterAddressOption) {
                  setEnterAddressOption(null);
                }

                if (formPhase === 1) {
                  setEnterAddressOption(null);
                }

                if (formPhase > 0) {
                  setFormPhase(formPhase - 1);
                }
              }}
              className="h-auto rounded-full lg:self-start"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Phase 0: Enter Address to send funds to */}
        {formPhase === 0 && enterAddressOption === null && (
          <>
            <div className="w-full flex flex-row justify-center items-center gap-2 lg:gap-4 mb-8">
              {/* @ts-expect-error: Also fine - formPhases[0].options can only be undefined if we change the object which we don't */}
              {formPhases[0].options.map((option) => (
                <Card
                  key={option.key}
                  onClick={() => {
                    setAddressToPay("");
                    // @ts-expect-error: This is fine unless we change the object it will always be a key.
                    setEnterAddressOption(option.key);
                  }}
                  className="w-full flex flex-col items-center justify-start gap-2 py-2 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer"
                >
                  {option.icon}
                  <p className="text-sm lg:text-md font-semibold gap-2">
                    {option.title}
                  </p>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Phase 0, Option A: Wallet Address */}
        {formPhase === 0 && enterAddressOption === "address" && (
          <div className="w-5/6 flex flex-col items-center justify-center">
            <div className="w-full flex flex-row justify-end items-start gap-2">
              <div className="w-full flex flex-col">
                <Input
                  type="text"
                  placeholder="Wallet Address"
                  className={`w-full ${
                    addressToPayError ? "border-red-500" : ""
                  }`}
                  value={addressToPay}
                  onChange={(e) => {
                    setAddressToPay(e.target.value);
                  }}
                />
                {addressToPayError && (
                  <p className="text-sm text-red-500 ml-2 mt-1">
                    {addressToPayError}
                  </p>
                )}
              </div>
              <Button
                onClick={() => {
                  const validation = validateAddress(addressToPay, address);
                  if (validation !== true) {
                    setAddressToPayError(validation);
                    return;
                  }

                  setAddressToPayError("");
                  setFormPhase(formPhase + 1);
                }}
                className="w-1/4"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Phase 0 Option B: Lens Profile */}
        {formPhase === 0 && enterAddressOption === "lens" && (
          <>
            <div className="w-5/6 flex flex-col items-center justify-center">
              <div className="w-full flex flex-row justify-end items-start gap-2">
                <div className="w-full flex flex-col">
                  <Input
                    type="text"
                    placeholder="Enter a Lens handle, e.g. jarrodwatts.lens"
                    className={`w-full`}
                    value={lensProfileToPay}
                    onChange={(e) => {
                      setLensProfileToPay(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col mt-8">
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                People
              </h4>

              <Separator />

              {debouncedLensProfile &&
                debouncedLensProfile === lensProfileToPay && (
                  <div className="w-full flex flex-col justify-center items-center gap-2 mt-4">
                    <div className="w-full flex flex-col gap-2">
                      {profiles?.map((profile) => (
                        <Card
                          onClick={() => {
                            setAddressToPay(profile.ownedBy.address);
                            setSelectedLensProfile(profile);
                            setFormPhase(formPhase + 1);
                          }}
                          key={profile.id}
                          className="w-full flex flex-row items-center justify-start gap-2 py-2 px-3 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer"
                        >
                          <MediaRenderer
                            src={
                              // @ts-expect-error: IDK why it doesn't like this
                              profile?.metadata?.picture?.optimized?.uri ||
                              `/profile.png`
                            }
                            style={{
                              width: 32,
                              height: 32,
                            }}
                            alt="Lens Profile Avatar"
                            className="rounded-full"
                          />

                          <div className="flex flex-col items-start justify-center">
                            <p className="text-sm lg:text-md font-semibold">
                              {profile.handle?.suggestedFormatted.localName}
                            </p>
                            <p className="text-xs lg:text-sm text-muted-foreground">
                              {profile.ownedBy.address}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

              {debouncedLensProfile !== lensProfileToPay && (
                <div className="w-full flex flex-col justify-center items-center gap-2 mt-4">
                  {Array.from(Array(5).keys()).map((index) => (
                    <Skeleton className="w-full h-12" key={index} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Phase 1: Enter Amount to Send */}
        {formPhase === 1 && (
          <>
            <div className="w-5/6 flex flex-col items-center justify-center">
              <div className="w-full flex flex-row justify-end items-start gap-2">
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="w-full flex flex-col">
                    <Input
                      value={amountToPay}
                      onChange={(e) => {
                        if (e.target.value.startsWith("-")) {
                          return;
                        }

                        if (e.target.value.length > 18) {
                          return;
                        }

                        setAmountToPay(e.target.value);
                      }}
                      className={`w-full ${
                        amountToPayError ? "border-red-500" : ""
                      }`}
                      type="number"
                      placeholder="Amount"
                    />
                    {amountToPayError && (
                      <p className="text-sm text-red-500 ml-2 mt-1">
                        {amountToPayError}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-row justify-start items-center gap-2 mt-2 ml-2">
                    <p className="text-sm font-semibold gap-2">Your balance:</p>
                    <p className="text-sm">
                      {loadingNativeTokenBalance && "Loading..."}

                      {!loadingNativeTokenBalance &&
                        nativeTokenBalance &&
                        formatNumber(Number(nativeTokenBalance.displayValue))}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (!amountToPay) {
                      setAmountToPayError("Please enter an amount");
                      return;
                    }

                    if (Number(amountToPay) === 0) {
                      setAmountToPayError("Please enter an amount");
                      return;
                    }

                    if (
                      nativeTokenBalance &&
                      Number(amountToPay) >
                        Number(nativeTokenBalance.displayValue)
                    ) {
                      setAmountToPayError("Insufficient funds");
                      return;
                    }

                    if (Number(amountToPay) < 0) {
                      setAmountToPayError("Invalid amount");
                      return;
                    }

                    setAmountToPayError("");
                    setFormPhase(formPhase + 1);
                  }}
                  className="w-1/4"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Phase 2: Confirm Payment */}
        {formPhase === 2 && (
          <>
            <div className="w-full flex flex-col justify-end items-start gap-2">
              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start rounded-xl shadow-xl h-auto w-full backdrop-blur-xl backdrop-filter bg-white bg-opacity-5 px-8 py-8 mb-4">
                <Image
                  src={`/wallaby-money.png`}
                  width={128}
                  height={128}
                  quality={100}
                  alt="Wallaby"
                />

                <div className="flex flex-col items-start justify-center ml-4 gap-1">
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    You are sending
                  </p>

                  <p className="text-md lg:text-lg font-semibold">
                    {amountToPay} {CHAIN.nativeCurrency.symbol}
                  </p>

                  <p className="text-xs lg:text-sm text-muted-foreground">to</p>
                  <p className="text-xs lg:text-md">{addressToPay}</p>

                  {selectedLensProfile && (
                    <>
                      <p className="text-xs lg:text-sm text-muted-foreground">
                        the owner of Lens profile
                      </p>
                      <p className="text-xs lg:text-md">
                        {
                          selectedLensProfile?.handle?.suggestedFormatted
                            .localName
                        }
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-row justify-end items-start gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAmountToPay("");
                    setAddressToPay("");
                    setFormPhase(0);
                  }}
                  className="w-1/3"
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    try {
                      sendPayment({
                        addressToPay,
                        amountToPay,
                      });
                      setFormPhase(formPhase + 1);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="w-1/3"
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Phase 3: Payment Sending */}
        {formPhase === 3 && (
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start rounded-xl shadow-xl h-auto w-full backdrop-blur-xl backdrop-filter bg-white bg-opacity-5 px-8 py-8 mb-4">
            <div className="w-full flex flex-col items-center gap-2 ">
              {isSendingPayment && (
                <>
                  <div className="relative">
                    <Image
                      src={`/lol.gif`}
                      fill
                      alt="Flying effect gif"
                      className="opacity-50 rounded-xl"
                    />
                  </div>

                  <Image
                    src={`/wallaby-flying.png`}
                    width={300}
                    height={300}
                    quality={100}
                    alt="Wallaby Cape"
                    className="z-10"
                  />
                </>
              )}

              {!paymentError && paymentTransaction && (
                <>
                  <Image
                    src={`/wallaby-success.png`}
                    width={300}
                    height={300}
                    quality={100}
                    alt="Wallaby Success"
                    className="z-10"
                  />

                  <p className="text-md lg:text-lg font-semibold">
                    Payment Successful
                  </p>

                  <Link
                    className="text-sm lg:text-md text-blue-500 bold underline"
                    href={`${explorerUrl}/tx/${paymentTransaction?.transactionHash}`}
                    target="_blank"
                  >
                    View Transaction Details
                  </Link>

                  <Button
                    variant="outline"
                    onClick={() => router.push(`/dashboard`)}
                    className="w-full"
                  >
                    Go Home
                  </Button>
                </>
              )}

              {!!paymentError && (
                <>
                  <Image
                    src={`/wallaby-failure.png`}
                    width={300}
                    height={300}
                    quality={100}
                    alt="Wallaby Error"
                    className="z-10"
                  />

                  <p className="text-md lg:text-lg font-semibold">
                    Payment Failed!
                  </p>

                  <p className="text-sm lg:text-md text-red-500">
                    Please try again later.
                  </p>

                  <div className="w-full flex flex-row justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/dashboard`)}
                      className="w-1/3"
                    >
                      Go Home
                    </Button>

                    <Button
                      onClick={() => {
                        try {
                          sendPayment({
                            addressToPay,
                            amountToPay,
                          });
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                      className="w-1/3"
                    >
                      Try Again
                    </Button>
                  </div>

                  <Separator className="my-2" />

                  <p className="text-sm font-semibold">
                    The full error message can be found below:
                  </p>

                  <p className="text-sm lg:text-md text-red-500 break-all max-w-full">
                    {(paymentError as Error)?.message ||
                      "An unknown error occurred."}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </AppContainer>
  );
}
