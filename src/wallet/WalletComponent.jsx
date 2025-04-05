// import { ConnectButton, useWalletBalance  } from "thirdweb/react";
// import thirdwebIcon from "./thirdweb.svg";
// import { client } from "./client";
// export function WalletComponent() {
	
//   return (
//     <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
//       <div className="py-20">
     

//         <div className="flex justify-center mb-20">
//           <ConnectButton
//             client={client}
//             appMetadata={{
//               name: "Example app",
//               url: "https://example.com",
//             }}
//           />
//         </div>
//    {/* <Header /> */}
//         {/* <ThirdwebResources /> */}
//       </div>
//     </main>
//   );
// }

// function Header() {
// 	const { data: balance } = useWalletBalance();
  
//   console.log(balance)
//   return (
//     <header className="flex flex-col items-center mb-20 md:mb-20">
//       <img
//         src={thirdwebIcon}
//         alt=""
//         className="size-[150px] md:size-[150px]"
//         style={{
//           filter: "drop-shadow(0px 0px 24px #a726a9a8)",
//         }}
//       />

//       <h1 className="text-2xl md:text-6xl font-bold tracking-tighter mb-6 text-zinc-100">
//         thirdweb SDK
//         <span className="text-zinc-300 inline-block mx-1"> + </span>
//         <span className="inline-block -skew-x-6 text-violet-500"> vite </span>
//       </h1>

//       <p className="text-zinc-300 text-base">
//         Read the{" "}
//         <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
//           README.md
//         </code>{" "}
//         file to get started.
//       </p>
//     </header>
//   );
// }

// function ThirdwebResources() {
//   return (
//     <div className="grid gap-4 lg:grid-cols-3 justify-center">
//       <ArticleCard
//         title="thirdweb SDK Docs"
//         href="https://portal.thirdweb.com/typescript/v5"
//         description="thirdweb TypeScript SDK documentation"
//       />

//       <ArticleCard
//         title="Components and Hooks"
//         href="https://portal.thirdweb.com/typescript/v5/react"
//         description="Learn about the thirdweb React components and hooks in thirdweb SDK"
//       />

//       <ArticleCard
//         title="thirdweb Dashboard"
//         href="https://thirdweb.com/dashboard"
//         description="Deploy, configure, and manage your smart contracts from the dashboard."
//       />
//     </div>
//   );
// }

// function ArticleCard(props) {
//   return (
//     <a
//       href={`${props?.href}?utm_source=vite-template`}
//       target="_blank"
//       className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
//       rel="noreferrer"
//     >
//       <article>
//         <h2 className="text-lg font-semibold mb-2">{props?.title}</h2>
//         <p className="text-sm text-zinc-400">{props?.description}</p>
//       </article>
//     </a>
//   );
// }

// import { ConnectButton, useActiveAccount, useSendTransaction } from "thirdweb/react";
// import { client } from "./client";
// import { ethers } from "ethers";
// import { useContract, useContractWrite } from "@thirdweb-dev/react";
// const USDT_CONTRACT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT ERC-20 Contract Address
// const YOUR_CONTRACT_ADDRESS = "TJBCCrTNqegkuvWBBRWXvG6mkjkdYkAr76"; // Replace with your actual contract

// export function WalletComponent() {
//   const account = useActiveAccount(); // Get connected wallet address
//   const { contract } = useContract(USDT_CONTRACT);
//   const { mutateAsync: approve } = useContractWrite(contract, "approve");
//   const sendTransaction = useSendTransaction();

//   const buyPackage = async () => {
//     if (!account) {
//       alert("Please connect your wallet first.");
//       return;
//     }

//     try {
//       const amount = ethers.utils.parseUnits("1", 6); // 10 USDT (6 decimals for USDT)

//       // Step 1: Approve the spending of USDT
//       await approve({ args: [YOUR_CONTRACT_ADDRESS, amount] });

//       // Step 2: Send the transaction to your contract to process the purchase
//       await sendTransaction.mutateAsync({
//         to: YOUR_CONTRACT_ADDRESS,
//         data: "0x", // If calling a function in the contract, update this with correct calldata
//       });

//       alert("Package purchased successfully!");
//     } catch (error) {
//       console.error("Transaction failed:", error);
//       alert("Purchase failed. Check console for details.");
//     }
//   };

//   return (
//     <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
//       <div className="py-20">
//         <div className="flex justify-center mb-20">
//           <ConnectButton
//             client={client}
//             appMetadata={{
//               name: "Example app",
//               url: "https://example.com",
//             }}
//           />
//         </div>

//         {account && (
//           <div className="flex justify-center">
//             <button
//               onClick={buyPackage}
//               className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
//             >
//               Buy Package with USDT
//             </button>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }
// import { 
//   useAddress, 
//   useDisconnect, 
//   useConnect, 
//   metamaskWallet, 
//   coinbaseWallet, 
//   walletConnect ,
//   ConnectWallet 
// } from "@thirdweb-dev/react";

// const WalletComponent = () => {
//   const address = useAddress(); // Get connected wallet address
//   const disconnectWallet = useDisconnect(); // Disconnect wallet
//   const connectMetamask = useConnect(metamaskWallet()); // Connect with Metamask
//   const connectCoinbase = useConnect(coinbaseWallet()); // Connect with Coinbase Wallet
//   const connectWalletConnect = useConnect(walletConnect()); // Connect with WalletConnect

//   const handleBuy = () => {
//     if (!address) {
//       alert("Please connect your wallet first!");
//       return;
//     }
//     alert("Buying process started..."); // Replace with actual purchase logic
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 p-5">
//       {!address ? (
//        <>
//        <p className="text-lg font-semibold">Connect your wallet:</p>
//        <ConnectWallet theme="dark" />
//      </>
//       ) : (
//         <>
//           <p className="text-lg font-semibold">Connected Wallet: {address}</p>
//           <button
//             onClick={handleBuy}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
//           >
//             Buy Something
//           </button>
//           <button
//             onClick={disconnectWallet}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
//           >
//             Disconnect Wallet
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default WalletComponent;
// import { ConnectButton, useWalletBalance  } from "thirdweb/react";
// import { useAddress, useDisconnect, ConnectWallet, useContract, useContractWrite } from "@thirdweb-dev/react";
// import { ethers } from "ethers";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { use } from "react";
// const SERVICE_CONTRACT_ADDRESS = "TJBCCrTNqegkuvWBBRWXvG6mkjkdYkAr76"; // Replace with your service contract
// const USDT_AMOUNT = ethers.utils.parseUnits("1", 6); // 1 USDT (6 decimals for TRC-20)
// const USDT_CONTRACT_ADDRESS = 'TLeVnv2rmto5n35ccvuxn25MY63b4aXe33'; // USDT TRC-20 contract address

// export const WalletComponent = () => {
//   const address = useAddress(); // Get connected wallet
//   const disconnectWallet = useDisconnect(); // Disconnect function
//   const [balance, setBalance] = useState("0"); // State for USDT balance

//   // Load USDT token contract
//   const { contract: usdtContract, isLoading: usdtLoading } = useContract(USDT_CONTRACT_ADDRESS);

//   // Load your service contract
//   const { contract: serviceContract, isLoading: serviceLoading } = useContract(SERVICE_CONTRACT_ADDRESS);

//   // Approve USDT transfer
//   const { mutateAsync: approveUSDT, isLoading: approving } = useContractWrite(usdtContract, "approve");

//   // Buy service
//   const { mutateAsync: buyService, isLoading: buying } = useContractWrite(serviceContract, "buyService");

//   // Function to fetch USDT balance
//   // const fetchBalance = async () => {
//   //   try {
//   //     const response = await axios.post(`http://localhost:4001/cripto/get-balance`,{walletAddress:address} );
//   //   console.log(response.data);
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
    
//   // }

//   // useEffect(() => {
//   //   fetchBalance()
//   // }, [address]);
//   const handleBuy = async () => {
//     if (!address) {
//       alert("Please connect your wallet first!");
//       return;
//     }

//     if (usdtLoading || serviceLoading) {
//       alert("Contracts are still loading...");
//       return;
//     }

//     try {
//       // Step 1: Approve USDT spending
//       await approveUSDT({
//         args: [SERVICE_CONTRACT_ADDRESS, USDT_AMOUNT], // Approve spending
//       });

//       alert("USDT Approved! Proceeding with the purchase...");

//       // Step 2: Call buy function
//       const tx = await buyService({
//         args: [USDT_AMOUNT], // Pass USDT amount if required
//       });

//       alert("Purchase successful! Transaction Hash: " + tx.receipt.transactionHash);
//     } catch (error) {
//       console.error("Transaction failed:", error);
//       alert("Transaction failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 p-5">
//       {!address ? (
//         <>
//           <p className="text-lg font-semibold">Connect your wallet:</p>
//           <ConnectWallet theme="dark" />
//         </>
//       ) : (
//         <>
//           <p className="text-lg font-semibold">Connected Wallet: {address}</p>
//           <p className="text-lg font-semibold">Wallet Balance: {balance}</p>
//           <button
//             onClick={handleBuy}
//             disabled={approving || buying}
//             className="btn btn-success px-4 py-2 rounded shadow-sm hover:bg-green-700 transition"
//           >
//             {approving ? "Approving..." : buying ? "Processing..." : "Buy with USDT"}
//           </button> &nbsp; &nbsp;
//           <button
//             onClick={disconnectWallet}
//             className="btn btn-danger px-4 py-2 rounded shadow-sm hover:bg-green-700 transition"
//           >
//             Disconnect Wallet
//           </button>
//         </>
//       )}
//     </div>
//   );
// // };
// import { useAddress, useDisconnect, ConnectWallet, useContract, useContractWrite,useBalance , useContractRead, useTokenBalance } from "@thirdweb-dev/react";
// import { ethers } from "ethers";
// import { useEffect, useState } from "react";

// // Replace these with your actual contract addresses
// const SERVICE_CONTRACT_ADDRESS = "TJBCCrTNqegkuvWBBRWXvG6mkjkdYkAr76"; // Your service contract address
// const USDT_CONTRACT_ADDRESS = "0xEce64dDf99C007F7CD4f3AA4f3681a777b468067"; // USDT TRC-20 contract address
// const USDT_AMOUNT = ethers.utils.parseUnits("1", 6); // 1 USDT (6 decimals for TRC-20)

// const USDTBalance = () => {
//   const address = useAddress(); // Get connected wallet address
//   const { data, isLoading } = useTokenBalance(USDT_CONTRACT_ADDRESS, address); // Fetch USDT balance

//   if (!address) return <p>Please connect your wallet</p>;
//   if (isLoading) return <p>Loading balance...</p>;

//   return <p>USDT Balance: {data?.displayValue} {data?.symbol}</p>;
// };
// export const WalletComponent = () => {
//   const address = useAddress(); // Get connected wallet address
//   const disconnectWallet = useDisconnect(); // Disconnect wallet function
//   const [balance, setBalance] = useState("0"); // State for USDT balance

//   // Load USDT token contract
//   const { contract: usdtContract, isLoading: usdtLoading } = useContract(USDT_CONTRACT_ADDRESS);

//   // Load your service contract
//   const { contract: serviceContract, isLoading: serviceLoading } = useContract(SERVICE_CONTRACT_ADDRESS);

//   // Fetch USDT balance
//   const { data: usdtBalance, isLoading: balanceLoading } = useContractRead(usdtContract, "balanceOf", [address]);

//   // Approve USDT transfer
//   const { mutateAsync: approveUSDT, isLoading: approving } = useContractWrite(usdtContract, "approve");

//   // Buy service
//   const { mutateAsync: buyService, isLoading: buying } = useContractWrite(serviceContract, "buyService");

//   // Update balance when USDT balance changes
//   useEffect(() => {
//     if (usdtBalance) {
//       const formattedBalance = ethers.utils.formatUnits(usdtBalance, 6); // USDT has 6 decimals
//       setBalance(formattedBalance);
//     }
//   }, [usdtBalance]);

//   // Handle buy button click
//   const handleBuy = async () => {
//     if (!address) {
//       alert("Please connect your wallet first!");
//       return;
//     }

//     if (usdtLoading || serviceLoading) {
//       alert("Contracts are still loading...");
//       return;
//     }

//     try {
//       // Step 1: Approve USDT spending
//       await approveUSDT({
//         args: [SERVICE_CONTRACT_ADDRESS, USDT_AMOUNT], // Approve spending
//       });

//       alert("USDT Approved! Proceeding with the purchase...");

//       // Step 2: Call buy function
//       const tx = await buyService({
//         args: [USDT_AMOUNT], // Pass USDT amount if required
//       });

//       alert("Purchase successful! Transaction Hash: " + tx.receipt.transactionHash);
//     } catch (error) {
//       console.error("Transaction failed:", error);
//       alert("Transaction failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 p-5">
//       {!address ? (
//         // Show Connect Wallet button if wallet is not connected
//         <>
//           <p className="text-lg font-semibold">Connect your wallet:</p>
//           <ConnectWallet theme="dark" />
//         </>
//       ) : (
//         // Show wallet info and buttons if wallet is connected
//         <>
//           <p className="text-lg font-semibold">Connected Wallet: {address}</p>
//           <p className="text-lg font-semibold">
//             Wallet Balance: {balanceLoading ? "Loading..." : `${balance} USDT`}
//           </p>
//           <button
//             onClick={handleBuy}
//             disabled={approving || buying}
//             className="btn btn-success px-4 py-2 rounded shadow-sm hover:bg-green-700 transition"
//           >
//             {approving ? "Approving..." : buying ? "Processing..." : "Buy with USDT"}
//           </button>
//           <button
//             onClick={disconnectWallet}
//             className="btn btn-danger px-4 py-2 rounded shadow-sm hover:bg-red-700 transition"
//           >
//             Disconnect Wallet
//           </button>
//           <USDTBalance />
//         </>
//       )}
//     </div>
//   );
// };

// src/app.tsx
import { client } from "./client";
import { ConnectButton } from "thirdweb/react";

export function WalletComponent() {
  return (
    <div>
      <ConnectButton client={client} />
      <Wallet></Wallet>
      {/* <Pay></Pay> */}
    </div>
  );
}



import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
 function Wallet() {
  const account = useActiveAccount();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address,
  });

  return (
    <div>
      <p>Wallet address: {account?.address}</p>
      <p>
        Wallet balance: {balance?.displayValue} {balance?.symbol}
      </p>
    </div>
  );
}

import { PayEmbed, getDefaultToken } from "thirdweb/react";
import { base } from "thirdweb/chains";

export function Pay() {
  return (
    <PayEmbed
      client={client}
      theme={"light"}
      payOptions={{
        mode: "direct_payment",
        paymentInfo: {
          amount: "0.0175",
          chain: base,
          token: getDefaultToken(base, "USDT"),
          sellerAddress:
            "0xece64ddf99c007f7cd4f3aa4f3681a777b468067",
        },
        metadata: {
          name: "Buy Your Package Auto Pull One",
          // image: "/drip-hoodie.png",
        },
      }}
    />
  );
}