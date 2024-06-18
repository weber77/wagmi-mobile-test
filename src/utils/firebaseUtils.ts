import axios from 'axios';
import moment from "moment";

export const saveUser = async (user: { id: string; hash: string; firstName: string }) => {
    try {
        const response = await axios.post('https://paal-sniper-api-bff-4tozrh7z2a-ew.a.run.app/new_user', {
            id: user.id,
            hash: user.hash,
            first_name: user.firstName,
        });
        return response;
    } catch (error) {
        console.error('Error saving user data:', error);
        throw error;
    }
};

export const getCount = async () => {
    try {
        const response = await axios.get('https://paal-sniper-api-4tozrh7z2a-oe.a.run.app/total');
        return response;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const ListUsers = async (first: number = 1, quantity: number = 200) => {
    try {
        const response = await axios.post('https://paal-sniper-api-bff-4tozrh7z2a-ew.a.run.app/list_users', {
            first,
            quantity
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const allowToBuy = async (first: number = 1, quantity: number = 200) => {
    try {
        const response = await axios.post('https://paal-sniper-api-bff-4tozrh7z2a-ew.a.run.app/allow_users_to_buy', {
            first,
            quantity
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching allow to buy data:', error);
        throw error;
    }
};

export const listModels = async () => {
    try {
        const response = await axios.post('https://paal-sniper-api-4tozrh7z2a-oe.a.run.app/list_models_temp', {
            first: 1,
            quantity: 200,
        }, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching models:', error);
        throw error;
    }
};

export const CallCoinBase = async (id: string) => {
    try {
        const response = await axios.post('https://sniper-checkout-bff-4tozrh7z2a-nn.a.run.app/coinbase', {
            user_id: id,
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error making API call:', error);
        throw error;
    }
};

export const fetcWhitelist = async (id: string) => {
    try {
        const response = await axios.post('https://paal-sniper-api-bff-4tozrh7z2a-ew.a.run.app/fetch_user', {
            id: id,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};


export const updateNFTTrialTemp = async (id: string, trial_days: string, nft_identifier: string) => {
    try {
        const response = await axios.post('https://paal-sniper-api-4tozrh7z2a-oe.a.run.app/set_trial_temp', {
            id: id,
            start_date: moment().format("YYYY-MM-DD"),
            trial_days: trial_days,
            nft_identifier: nft_identifier
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const updateNFTTrial = async (id: string, trial_days: string, nft_identifier: string
) => {
    try {
        const response = await axios.post('https://paal-sniper-api-bff-4tozrh7z2a-ew.a.run.app/set_trial', {
            id: id,
            start_date: moment().format("YYYY-MM-DD"),
            trial_days: trial_days,
            nft_identifier: nft_identifier

        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};



export const getClaimedNFTsTemp = async () => {
    try {
        const response = await axios.post('https://paal-sniper-api-4tozrh7z2a-oe.a.run.app/get_claimed_nfts_temp', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching claimed nfts:', error);
        throw error;
    }
};

export const getClaimedNFTs = async (
) => {
    try {
        const response = await axios.post('https://paal-sniper-api-bff-4tozrh7z2a-ew.a.run.app/get_claimed_nfts', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching claimed nfts:', error);
        throw error;
    }
};

