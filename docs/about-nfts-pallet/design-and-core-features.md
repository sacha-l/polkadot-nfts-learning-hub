---
title: Design and core features
sidebar_position: 1
---

At a high-level, the NFTs pallet is designed to offer all the basic functionality for managing NFTs you would expect such as creating a collection, minting and burning items. This section describes additional core features which are integral to understanding how the pallet is designed to be used.

## Collection metadata

Each collection stores metadata about the collection itself, used for rendering items of a collection. This would typically be an [IPFS CID](https://docs.ipfs.tech/concepts/content-addressing/) containing information to render the items of a collection.
Collection metadata can be locked upon creation which ensures the metadata can’t be changed, preventing users from selling off a collection and modifying the collection’s CID for example. 

## Collection settings

Collections can be created by configuring certain settings upon the creation of a collection or during the lifetime of a collection depending on the [mint setting roles](./settings-and-roles.md) a creator has configured. 

For example, a collection can set a maximum number of items it can have. This covers the popular case of creating collections with scarcity. A collection creator can also set a maximum number for the number of items a single account is allowed to hold. This is useful for projects who want to allow anyone to claim or buy an item, where only one item can be owned per address.

## Item attributes 

Each item in a collection can store attributes which can hold any data a user might want to attach to an item they own. 
This allows for things like storing the latest game state or personalizing an item using different [attribute types](attribute-types.md).
Item attributes can be read by smart contracts or other web applications to give item holders access to exclusive in-app features.

## Pre-signing

Collection owners can create offers for addresses to buy an NFT without the need for a 3rd party. 
This is achieved by providing a pre-signed offer &mdash; in other words a signature that authorizes another account to buy an item with a fixed price.

For example, a buyer can submit an offer to buy some item by providing a signature off-chain, or even on-chain using a System remark. If the seller agrees to the proposed price, the trade can be executed by providing the signed offer.
This is particularly useful to enable novel [distribution mechanisms and uses cases for private marketplaces](distribution-and-marketplaces.md).
