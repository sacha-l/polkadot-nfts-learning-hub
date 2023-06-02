---
title: NFTs on Polkadot 101
sidebar_position: 1
---

The NFT pallet enables new use cases for programmable non-fungibles on Polkadot.

In the Polkadot ecosystem there are primarily two approaches for creating minting and managing NFT collections:

1. Using smart contracts (e.g. ERC-721, ERC-1155, PSP-34) and deploying them on EVM/Wasm compatible app-chains
2. Using chains that specialize in providing services for creating and managing non-fungible assets

The way that app-chains built with Substrate and FRAME are able to offer NFT capabilities is by including special logic in their runtimes, called a ["pallet”](https://docs.substrate.io/reference/frame-pallets). 

Have a look at [this page](https://wiki.polkadot.network/docs/learn-nft#nfts-20-nfts-in-polkadot--kusama) for a list of popular app-chains that have specialized runtime logic for managing non-fungible assets. While existing pallets in production such as the [Uniques pallet](https://github.com/paritytech/substrate/tree/master/frame/uniques) and the [ORML NFT pallet](https://github.com/open-web3-stack/open-runtime-module-library/tree/master/nft) offer basic and secure functionality for managing non-fungible assets, it became apparent how limiting they were for end-users and developers to meet emerging use cases for NFTs in the broader web3 ecosystem.

The [NFTs pallet](https://github.com/paritytech/substrate/tree/master/frame/nfts) was designed to address some of these limitations. It’s new features provide a multitude of configurations for collection creators and collectors, putting end-users at the forefront of its design decisions. Continue reading the next section to discover what those are, or skip to **Start minting your collections** to start creating your collections.