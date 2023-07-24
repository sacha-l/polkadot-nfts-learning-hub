---
title: Design and core features
sidebar_position: 1
---

The NFTs pallet is designed to offer all the basic functionality for managing NFTs in an economically secure way, extending popular standards such as the [ERC 721 standard](https://eips.ethereum.org/EIPS/eip-721).
This section describes features which are integral to understanding how the pallet is designed to be used.

## Collection metadata and settings

Each collection stores metadata about the collection itself, used for rendering items of a collection. This would typically be an [IPFS CID](https://docs.ipfs.tech/concepts/content-addressing/) containing information to render the items of a collection, for example:

`QmfJfhBkPBdvxpERizDo91GCcm4rm5SkePKXUsgaMCvPuA` stored in the collection's metadata field could map to this JSON file:

```json
{
  "name": "Collection name",
  "image": "ipfs://ipfs/{IMAGE_CID}",
  "description": "Collection description",
  "animation_url":"",
  "attributes": 
}   
```

Collection metadata can be locked upon creation which ensures the metadata can’t be changed for the lifetime of the collection.
It can also be changed if a collection is created without enabling the locking feature. Here's a code snippet to create a collection with locked metadata:

```js
// Import the API and Keyring
const { ApiPromise } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

// Instantiate the API
const api = await ApiPromise.create();

// Construct the keyring after the API (crypto has an async init)
const keyring = new Keyring({ type: 'sr25519' });

// Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
const alice = keyring.addFromUri('//Alice');

// Create collection with locked settings
const collectionConfig = {
    settings: 2,
    maxSupply: undefined,
    mintSettings: {
        mintType: "Issuer",
        price: undefined,
        startBlock: undefined,
        endBlock: undefined,
        defaultItemSettings: 0,
        }
    };      

  // Submit the transaction
  await api.tx.nft.create(admin, collectionConfig)
    .signAndSend(alice);
```

Collections can also be created by configuring certain settings upon the creation of a collection or during the lifetime of a collection depending on the [mint setting roles](./settings-and-roles.md) a creator has configured. 

For example, if a collection creator wants to introduce scarcity to their collection they can set a maximum number of items the collection will forever have.
A collection creator can also set a maximum number of items a single account is allowed to hold. 
This is useful for projects who want to allow anyone to claim or buy an item, where only one item can be owned per address.

*Try out different setting configurations in the [codesandbox](../guides/codesandbox.mdx).*

## Item attributes 

Each item in a collection can store attributes which can hold any data a user might want to attach to an item they own. 
This allows for things like storing the latest game state or personalizing an item using different [attribute types](attribute-types.md).
Item attributes can be read by smart contracts or other web applications to give item holders access to exclusive in-app features.

## Pre-signing

Collection owners can pre-authorize certain accounts to mint items from their collection by pre-signing those items.
The eligible accounts can then mint an item using the pre-signed approval.

Pre-signing can also be used in this way to update an item's attributes.