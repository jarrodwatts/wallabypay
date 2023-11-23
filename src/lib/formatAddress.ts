/**
 * Given a wallet address, format it to display the first 4 and last 4 characters with an ellipsis in between.
 */
export default function formatAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
