import { AppConfig } from '../types';
import { commonConfig } from './common';

const config: AppConfig = {
  ...commonConfig,
  mode: 'production',
  appUrl: 'https://your-hedera-app.com', // Replace with your actual domain
  carbonApi: 'https://your-hedera-api.com/v1/', // Replace with your actual API
  network: {
    ...commonConfig.network,
    name: 'Hedera Mainnet',
    chainId: 295,
    blockExplorer: {
      name: 'HashScan',
      url: 'https://hashscan.io/mainnet',
    },
    rpc: {
      url: 'https://mainnet.hashio.io/api',
    },
  },
  // Add production-specific configurations here
  sentryDSN: '', // Add your Sentry DSN for production monitoring
};
export default config;
