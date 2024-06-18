import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";

import { mainnet } from "wagmi/chains";
import {
    walletConnectWallet,
    metaMaskWallet,
    phantomWallet
} from "@rainbow-me/rainbowkit/wallets";

import { createConfig, http } from "wagmi";



const PROJECT_ID = import.meta.env.VITE_APP_PROJECT_ID

export const rainbowConfig = getDefaultConfig({
    appName: 'PaalX Sniper🎯',
    projectId: PROJECT_ID,
    chains: [mainnet],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [metaMaskWallet, walletConnectWallet, phantomWallet],
    },
], { projectId: PROJECT_ID, walletConnectParameters: {}, appName: "PaalX Sniper🎯", appDescription: "", appUrl: "", appIcon: "" });




export const wagmiConfig = createConfig({
    connectors,
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(),
    },
});