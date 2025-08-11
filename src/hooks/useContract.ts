import { useWagmi } from 'libs/wagmi';
import { ERC20__factory, Voucher__factory } from 'abis/types';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import config from 'config';

export const useVoucher = () => {
  const { provider, signer } = useWagmi();
  const address = config.addresses.carbon.voucher;
  return useQuery({
    queryKey: ['contract', 'voucher'],
    queryFn: () => ({
      read: Voucher__factory.connect(address, provider!),
      write: Voucher__factory.connect(config.addresses.carbon.voucher, signer!),
    }),
  });
};

export const useContract = () => {
  const { provider, signer } = useWagmi();

  const Token = useCallback(
    (address: string) => ({
      read: ERC20__factory.connect(address, provider!),
      write: ERC20__factory.connect(address, signer!),
    }),
    [provider, signer],
  );

  return { Token };
};
