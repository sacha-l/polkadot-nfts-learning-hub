# Build a Voting Dapp tutorial (part 1)

Welcome to the Polkadot voting dApp tutorial. You’ll learn how to build a dApp in the ink! programming language using OpenBrush, write tests for it and interact with it using a front-end. This tutorial is based on the OpenBrush Substrate Seminars (full videos here and here) which is recommended material to watch before diving into this tutorial.

The voting app you’ll be building is for educational purposes and is not meant to be shipped to production. However you’ll learn the basics of creating a dApp that implements staking and voting logic for a simple application that allows users to vote and propose items to be voted on. It’s meant to be fun, educational and somewhat applicable to a real world use case.😊

## Prerequisites

Before you dive in, make sure you:

- Know basic Rust
- Have completed the [beginner’s ink! tutorial](https://docs.substrate.io/tutorials/smart-contracts/)
- Have a wallet chrome extension to sign transactions
- Have a test account wallet funded with ROC tokens. [Learn how to get some here if you haven’t already](https://wiki.polkadot.network/docs/build-pdk#obtaining-roc).
- Have the latest cargo +nightly installed: see [https://github.com/paritytech/cargo-contract/issues/1058#issuecomment-1501225760](https://github.com/paritytech/cargo-contract/issues/1058#issuecomment-1501225760)

## Tools

The tools you’ll be exploring in this tutorial are: 

- ink! - a DSL for writing Wasm smart contracts for Substrate chains.
- OpenBrush - a framework for developing dapps.
- The Contracts parachain on Rococo - the live testnet.
- Contracts UI - a UI to easily deploy contracts to Rococo.