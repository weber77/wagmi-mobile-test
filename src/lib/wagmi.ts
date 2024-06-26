import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";

import { mainnet } from "wagmi/chains";
import {
    walletConnectWallet,
    metaMaskWallet,
    phantomWallet
} from "@rainbow-me/rainbowkit/wallets";

import { createConfig, http } from "wagmi";



const PROJECT_ID = "c744ff4b904ef92718611d818abeb30a"

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
        [mainnet.id]: http('https://twilight-fittest-meadow.quiknode.pro/b50a098075b21df19b752b3911621c909e34e723/'),
    },
});