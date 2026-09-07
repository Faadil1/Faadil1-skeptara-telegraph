// Resolves a real settlement transaction hash to a real public block explorer.
// Only networks we've actually observed real settlements on are supported —
// never guess an explorer for an unrecognized network id.

const EXPLORER_BY_NETWORK: Record<string, string> = {
  "eip155:84532": "https://sepolia.basescan.org/tx/",
};

export function explorerTxUrl(network: string | null | undefined, txHash: string | null | undefined): string | null {
  if (!network || !txHash) return null;
  const base = EXPLORER_BY_NETWORK[network];
  return base ? `${base}${txHash}` : null;
}
