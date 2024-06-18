export interface NFT {
    identifier: string,
    collection?: string,
    contract?: string,
    token_standard?: string,
    name?: string,
    description?: string,
    image_url?: string,
    display_image_url?: string,
    display_animation_url?: string,
    metadata_url?: string,
    opensea_url?: string,
    updated_at?: string,
    is_disabled: boolean,
    is_nsfw: boolean
}

export interface ClaimedNFT {

    user_id: string,
    nft_identifier: string,
    timestamp: string
}

