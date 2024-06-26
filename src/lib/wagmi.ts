import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import { mainnet } from "wagmi/chains";
// import {
//     walletConnectWallet,
//     metaMaskWallet,
//     phantomWallet
// } from "@rainbow-me/rainbowkit/wallets";

import { createConfig, http } from "wagmi";
import { metaMask, walletConnect } from "wagmi/connectors";



const PROJECT_ID = "3bff889ebd4e780bdff55e217ae391f5"

export const rainbowConfig = getDefaultConfig({
    appName: 'PaalX Sniper🎯',
    projectId: PROJECT_ID,
    chains: [mainnet],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

// const connectors = connectorsForWallets([
//     {
//         groupName: "Recommended",
//         wallets: [metaMaskWallet, walletConnectWallet, phantomWallet],
//     },
// ], { projectId: PROJECT_ID, walletConnectParameters: {}, appName: "PaalX Sniper🎯", appDescription: "", appUrl: "", appIcon: "" });




export const wagmiConfig = createConfig({
    connectors: [walletConnect({
        projectId: PROJECT_ID, metadata: {
            name: 'PaalAI',
            description: "x",
            url: "https://wagmi-paal.vercel.app/",
            icons: [""]
        }
    }), metaMask()],
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(''),
    },
});