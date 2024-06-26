import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";

import { mainnet } from "wagmi/chains";
import {
    walletConnectWallet,
    metaMaskWallet,

} from "@rainbow-me/rainbowkit/wallets";

import { createConfig, http } from "wagmi";
import { metaMask, walletConnect } from "wagmi/connectors";



const PROJECT_ID = "3bff889ebd4e780bdff55e217ae391f5"

export const rainbowConfig = getDefaultConfig({
    appName: 'PaalX Sniper🎯',
    projectId: PROJECT_ID,
    chains: [mainnet],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [metaMaskWallet, walletConnectWallet],
    },
], { projectId: PROJECT_ID, walletConnectParameters: {}, appName: "PaalX Sniper🎯", appDescription: "", appUrl: "", appIcon: "" });



const wagmiWallets = [walletConnect({
    projectId: PROJECT_ID, metadata: {
        name: 'PaalAI',
        description: "x",
        url: "https://wagmi-paal.vercel.app/",
        icons: [""]
    }
}), metaMask()]

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export const wagmiConfig = createConfig({
    connectors: isMobileDevice() ? wagmiWallets : connectors,
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(''),
    },
});