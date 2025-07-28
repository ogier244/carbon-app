import config from 'config';
import { SafeDecimal } from 'libs/safedecimal';

export const expandToken = (amount: string | number, precision: number) => {
  // DEBUG: Add stack trace to see where this is called from
  console.log('🔍 [DEBUG] Token Expansion Called:');
  console.log('📍 Input amount:', amount);
  console.log('📍 Precision (decimals):', precision);
  console.log('📍 Call stack:', new Error().stack);

  // Use ROUND_DOWN for Hedera networks to prevent sending more than intended
  const isHedera =
    config.network.chainId === 295 || config.network.chainId === 296;
  const roundingMode = isHedera ? SafeDecimal.ROUND_DOWN : 1; // 1 = ROUND_UP for other networks

  const trimmed = new SafeDecimal(amount).toFixed(precision, roundingMode);
  const result = new SafeDecimal(trimmed)
    .times(new SafeDecimal(10).pow(precision))
    .toFixed(0);

  // DEBUG: Log expansion details
  console.log('🔍 [DEBUG] Token Expansion:');
  console.log('📍 Input amount:', amount);
  console.log('📍 Precision (decimals):', precision);
  console.log('📍 Trimmed amount:', trimmed);
  console.log('📍 Expanded result:', result);
  console.log('📍 Is Hedera:', isHedera);
  console.log('📍 Rounding mode:', roundingMode);
  console.log('📍 Expected for 50 HBAR:', '5000000000');
  console.log('📍 Expected for 5.255878 TAUGF:', '5255878');

  return result;
};

export const shrinkToken = (
  amount: string | number | SafeDecimal,
  precision: number,
  chopZeros = false,
) => {
  const bigNumAmount = new SafeDecimal(amount);
  if (bigNumAmount.isZero()) return '0';
  const res = bigNumAmount
    .div(new SafeDecimal(10).pow(precision))
    .toFixed(precision, SafeDecimal.ROUND_DOWN);

  return chopZeros ? new SafeDecimal(res).toString() : res;
};

export const NATIVE_TOKEN_ADDRESS =
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const nativeToken = {
  ...config.network.gasToken,
  address: NATIVE_TOKEN_ADDRESS,
};

export const isDifferentGasToken =
  config.network.gasToken.address.toLowerCase() !==
  NATIVE_TOKEN_ADDRESS.toLowerCase();

export const isGasTokenToHide = (address: string) =>
  isDifferentGasToken &&
  address.toLowerCase() === config.network.gasToken.address.toLowerCase();

export const includesGasToken = (address: string) =>
  address.toLowerCase().includes(config.network.gasToken.address.toLowerCase());
