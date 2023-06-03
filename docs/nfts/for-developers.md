---
title: 🧑‍💻 Advanced material for developers
sidebar_position: 1
---


You can learn more about how to use the NFTs pallet as a runtime engineer here: https://wiki.polkadot.network/docs/learn-nft-pallets

*Are you looking for something that the Wiki doesn't yet cover? [Make an issue](https://github.com/sacha-l/polkadot-nfts-learning-hub/issues) in this repository detailing what information you think is missing and we'll be sure to include it.* 🙏

## Test out your own use cases

We've created a [dedicated standalone app-chain node](https://github.com/sacha-l/substrate-nfts-node) that you can launch in your local development environment to test out the NFTs pallet. 

Clone and build it locally (must have Rust and dependencies installed):

```bash
cargo install substrate-nfts-node --git https://github.com/sacha-l/substrate-nfts-node.git && cargo build --release
```

Or download the latest binary (no dependencies needed) from the [releases page](https://github.com/sacha-l/substrate-nfts-node/releases).

## Use a front-end template

We're working on a dedicated front-end template that can be extended to create your own UIs depending on your use cases.

