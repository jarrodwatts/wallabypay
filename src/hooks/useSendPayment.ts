import { useMutation } from "@tanstack/react-query";
import { NATIVE_TOKEN_ADDRESS, useSDK } from "@thirdweb-dev/react";

type SendPaymentArgs = {
  addressToPay: string;
  amountToPay: string;
};

export default function useSendPayment() {
  const sdk = useSDK();

  const mutation = useMutation(
    async ({ addressToPay, amountToPay }: SendPaymentArgs) => {
      if (!sdk) throw new Error("SDK not initialized");
      if (!addressToPay) throw new Error("No address provided");
      if (!amountToPay) throw new Error("No amount provided");

      const tx = await sdk.wallet.transfer(
        addressToPay,
        amountToPay,
        NATIVE_TOKEN_ADDRESS
      );

      return tx.receipt;
    }
  );

  return mutation;
}
