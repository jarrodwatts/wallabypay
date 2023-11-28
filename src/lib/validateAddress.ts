export default function validateAddress(
  addressToSend: string,
  senderAddress?: string
): string | true {
  if (!addressToSend) {
    return "Please enter an address";
  }

  if (addressToSend === senderAddress) {
    return "You can't pay yourself";
  }

  if (addressToSend.length !== 42) {
    return "Invalid address";
  }

  if (!addressToSend.startsWith("0x")) {
    return "Invalid address";
  }

  return true;
}
