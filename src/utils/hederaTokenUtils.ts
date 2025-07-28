import { SafeDecimal } from 'libs/safedecimal';

/**
 * Hedera-specific token utilities to handle decimal precision issues
 * that cause BalanceMismatch errors in Carbon protocol
 */

/**
 * Expands token amount for Hedera tokens with proper precision handling
 * Uses ROUND_DOWN to prevent sending more than intended
 */
export const expandHederaToken = (
  amount: string | number,
  precision: number,
) => {
  const decimal = new SafeDecimal(amount);

  // Use ROUND_DOWN (not ROUND_UP) to ensure we never send more than expected
  const trimmed = decimal.toFixed(precision, SafeDecimal.ROUND_DOWN);

  return new SafeDecimal(trimmed)
    .times(new SafeDecimal(10).pow(precision))
    .toFixed(0);
};

/**
 * Validates that an amount can be represented exactly in the token's precision
 * Returns adjusted amount that will work with Carbon's strict validation
 */
export const validateTokenPrecision = (
  amount: string | number,
  decimals: number,
): { adjustedAmount: string; hasAdjustment: boolean } => {
  const originalDecimal = new SafeDecimal(amount);

  // Convert to token units and back to check for precision loss
  const tokenUnits = originalDecimal.times(new SafeDecimal(10).pow(decimals));
  const roundedUnits = new SafeDecimal(
    tokenUnits.toFixed(0, SafeDecimal.ROUND_DOWN),
  );
  const backToDecimal = roundedUnits.div(new SafeDecimal(10).pow(decimals));

  const hasAdjustment = !originalDecimal.equals(backToDecimal);

  return {
    adjustedAmount: backToDecimal.toString(),
    hasAdjustment,
  };
};

/**
 * Check if running on Hedera network
 */
export const isHederaNetwork = (chainId?: number): boolean => {
  // Hedera Mainnet: 295, Hedera Testnet: 296
  return chainId === 295 || chainId === 296;
};

/**
 * Safe amount expansion that handles Hedera's precision requirements
 */
export const expandTokenSafe = (
  amount: string | number,
  precision: number,
  chainId?: number,
) => {
  if (isHederaNetwork(chainId)) {
    return expandHederaToken(amount, precision);
  }

  // Use ROUND_DOWN for all networks to prevent overpaying
  // This prevents BalanceMismatch errors in Carbon's strict validation
  const trimmed = new SafeDecimal(amount).toFixed(
    precision,
    SafeDecimal.ROUND_DOWN,
  );
  return new SafeDecimal(trimmed)
    .times(new SafeDecimal(10).pow(precision))
    .toFixed(0);
};
