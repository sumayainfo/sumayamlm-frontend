import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';

export default function WalletButton() {
  const { open } = useWeb3Modal(); // Function to open WalletConnect modal
  const { address, isConnected } = useAccount(); // Get wallet connection status
  const { disconnect } = useDisconnect(); // Function to disconnect wallet

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected: {address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={() => open()}>Connect Wallet</button>
      )}
    </div>
  );
}
