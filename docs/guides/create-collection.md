---
title: Create a collection
sidebar_position: 1
---

This guide assumes you have the NFTs node running in the background &mdash; you can learn how to set that [here](setup.md) - either by cloning the repo and running it locally or by using the binary available in the releases.

## Collection settings

We'll create a collection under the following settings:

- The creator (Alice) is the `Issuer`
- The collection's metadata will be locked
- The metadata contains the CID of an arbitrary picture on IPFS
- The collection has no maximum number of items set
- Items from this collection are non-transferrable

## Set up

Start by importing `ApiPromise` and `KeyRing` from the Polkadot JS library in your local environment.

```js
// Import the API, Keyring and some utility functions
const { ApiPromise } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

// Addresses from our dev chain
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

// Instantiate the API
const api = await ApiPromise.create();

// Construct the keyring after the API (crypto has an async init)
const keyring = new Keyring({ type: 'sr25519' });

// Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
const alice = keyring.addFromUri('//Alice');

```

## Create a collection

The following snippet constructs an extrinsic and signs it using the Alice account:

```js
  // Create an extrinsic to create a collection with default settings
  const createCollection = await api.tx.nft.create(ALICE, 0x00);
  
  // Sign and send the transaction using our account
  const hash = await createCollection.signAndSend(alice);
  
  console.log('Collection created with id', collectionId.toString());
```

## Set the metadata

Create another extrinsic to set the collection's metadata:

```js
  // Set metadata for collection 0 with metadata CID
  const collectionId = 0;
  const setCollectionMetadata = api.tx.nft.setCollectionMetadata(collectionId.toString(), 'QmY5GnoiANupwMbsLVaEa3YwjXKkKyvL4fCyAMRTTNqJNY')
  
  // Sign and send the transaction using the Alice account
  const txHash = await setCollectionMetadata.signAndSend(alice);

  console.log('Metadata updated with transaction hash', txHash.toHex());
  ```

## Lock the metadata of selected items

Finally, to lock the metadata of a single item all we need to do is specify the collection and item ID with want to lock. Note: only the collection owner, Alice can make this operation:

```js
const itemId = 1;
const lockCollection = api.tx.nft.lockItemProperties(collectionId, itemId, true, false);

// Sign and send the transaction using the Alice account
const txHash = await lockCollection.signAndSend(alice);

console.log('Metadata updated with transaction hash', txHash.toHex());
```

Note that these series of transactions can be batched using the Utility pallet. Future guides will have these examples once [`#3`](https://github.com/sacha-l/substrate-nfts-node/issues/3) is closed.

Continue onto learning how to configure specific minting settings for collections.