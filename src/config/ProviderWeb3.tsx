import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';

// Define blockchain networks
const chains = [arbitrum, mainnet, polygon];

// Add your WalletConnect Project ID (get from https://cloud.walletconnect.com)
const projectId = '6c1c7fe6ebdba40e26855f90dd1f3fad';

// Configure wagmi with WalletConnect provider
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

// Create EthereumClient for Web3Modal
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function ProviderWeb3({ children:  }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
