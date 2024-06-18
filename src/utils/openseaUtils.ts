import { NFT } from '@/lib/types';
import axios from 'axios';
import { OPENSEA_KEY } from './env';

export const getOpenseaUser = async (addressOrUsename: string) => {
    try {
        const response = await axios.get(`https://api.opensea.io/api/v2/accounts/${addressOrUsename}`, {
            headers: {
                "x-api-key": OPENSEA_KEY,
            },
        });
        return response.data?.username || addressOrUsename;
    } catch (error) {
        console.error('Error getting user from opensea:', error);
        throw error;
    }
};

export const getUserNFTs = async (chain: string, address: string) => {
    try {
        const response = await axios.get(
            `https://api.opensea.io/api/v2/chain/${chain}/account/${address}/nfts`,
            {
                headers: {
                    "x-api-key": OPENSEA_KEY,
                },
            }
        );

        const nfts = response.data.nfts;

        const paalNFTs = nfts.filter((nft: NFT) => {
            return nft.collection === "paalx-bots-collection";
        });
        return paalNFTs;

    }
    catch (error) {
        console.error('Error getting user nfts:', error);
        throw error;
    }
}