import { connectorsForWallets, getDefaultConfig, getDefaultWallets } from "@rainbow-me/rainbowkit";

import { mainnet } from "wagmi/chains";
import {
    walletConnectWallet,
    metaMaskWallet,
    phantomWallet
} from "@rainbow-me/rainbowkit/wallets";

import { createConfig, http } from "wagmi";
import { PROJECT_ID } from "@/utils/env";



const { wallets } = getDefaultWallets();
const transports = {
    [mainnet.id]: http()
};
export const config = getDefaultConfig({
    appName: 'rainbowkit.com',
    projectId: PROJECT_ID,
    chains: [
        mainnet,
    ],
    transports,
    wallets: [
        ...wallets,

    ],
    ssr: true,
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