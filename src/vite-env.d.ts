/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

interface ImportMetaEnv {
  readonly VITE_NETWORK: string;
  readonly VITE_CHAIN_RPC_URL: string;
  readonly VITE_SDK_VERBOSITY: 0 | 1 | 2;
  readonly VITE_LEGACY_TRADE_BY_SOURCE_RANGE: boolean;
  readonly VITE_TENDERLY_ACCESS_KEY: string;
  readonly MODE: string;
  readonly SENTRY_ORG: string;
  readonly SENTRY_PROJECT: string;
  readonly SENTRY_AUTH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  import type React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
