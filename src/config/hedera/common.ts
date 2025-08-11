import { AppConfig } from 'config/types';
import IconHederaLogo from 'assets/logos/hederalogo.svg';
import { ONE_HOUR_IN_MS } from 'utils/time';

const addresses = {
  HBAR: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  TAUGF: '0x000000000000000000000000000000000050623b',
  TRPAX: '0x00000000000000000000000000000000004fe9f1',
  ZERO: '0x0000000000000000000000000000000000000000',
  USDC: '0x0000000000000000000000000000000000068cda',
  // Add other Hedera testnet token addresses here as they become available
};

export const commonConfig: AppConfig = {
  mode: 'development',
  appName: 'Carbon DeFi',
  appUrl: 'http://localhost:3000',
  carbonApi: '', // Disabled - app will work in blockchain-only mode
  selectedConnectors: ['MetaMask', 'WalletConnect', 'Coinbase Wallet'],
  blockedConnectors: ['Tailwind', 'Compass Wallet', 'Seif'],
  walletConnectProjectId: 'f9d8863ab6c03f2293d7d56d7c0c0853',
  policiesLastUpdated: '18 April, 2023',
  network: {
    name: 'Hedera Testnet',
    logoUrl: IconHederaLogo,
    chainId: 296,
    blockExplorer: {
      name: 'HashScan',
      url: 'https://hashscan.io/testnet',
    },
    rpc: {
      url: 'https://testnet.hashio.io/api',
    },
    defaultLimitedApproval: true,
    gasToken: {
      name: 'HBAR',
      symbol: 'HBAR',
      decimals: 8,
      address: addresses.HBAR,
      logoURI: '/tokens/hedera/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.svg',
    },
  },
  sdk: {
    cacheTTL: ONE_HOUR_IN_MS,
  },
  defaultTokenPair: [addresses.HBAR, addresses.USDC], // Updated to use HBAR/TAUGF pair
  popularPairs: [
    [addresses.HBAR, addresses.TAUGF], // Updated to use HBAR/TAUGF pair
    [addresses.HBAR, addresses.TRPAX],
    [addresses.TAUGF, addresses.TRPAX],
  ],
  popularTokens: {
    base: [addresses.HBAR, addresses.TAUGF, addresses.TRPAX],
    quote: [addresses.HBAR, addresses.TAUGF, addresses.TRPAX],
  },
  addresses: {
    tokens: addresses,
    carbon: {
      carbonController: '0x6F482F9c45ea2e6076748dE289eE55B95654A1bA',
      voucher: '0x5253B5CCd337bbAB33817ac26CaB25c96c06D7d3',
      batcher: '0x43ecddf72345373Ea1Ee4D720A6E599b91d03224',
    },
  },
  utils: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1,
    },
  },
  tokenListOverride: [],
  tokenLists: [
    // Bancor
    {
      uri: '/tokens/hedera/list.json',
    },
  ],
  tenderly: {
    faucetTokens: [],
  },
  ui: {
    showSimulator: true,
    priceChart: 'tradingView',
    useGradientBranding: false,
    tradeCount: true,
    currencyMenu: true,
    showTerms: true,
    showPrivacy: true,
    showCart: true,
  },
};
