---
title: Design and core features
sidebar_position: 1
---

At a high-level, the NFTs pallet is designed to offer all the basic functionality for managing NFTs you would expect such as creating a collection, minting and burning items. This section describes the core features that extend this basic functionality which are integral to understanding how the pallet works and how it's designed to be used.

## User and system settings

A core concept in the design of this pallet is the Items can be updated either by user controlled settings or by system controlled settings. Examples of user controlled settings include updating the mutable metadata of an item. System controlled settings by definition can only change the collection’s metadata if this was configured upon creating the collection.

## Metadata

Both collections and single items have their own metadata, i.e. the information an asset and collection holds. This could be the price of an item, the CID corresponding to the images in a collection or the name of the collection for example.

There’s two types of metadata that any collection is required to have: immutable metadata and mutable metadata. Immutable metadata ensures collections carry important data that can’t be changed, preventing users from selling off a collection and modifying the collection’s CID for example. Mutable metadata is useful for storing any data a user might want to attach to their collections or items and update over time. This would allow for things like storing the latest game state to the asset itself, or adding any custom attribute to an item.

## Collection settings

Collections can be created by setting a maximum number of items it can have. This covers the popular case of creating collections with scarcity. A collection creator can also set a maximum number for the number of items a single account is allowed to hold. This is useful for projects who want to allow anyone to claim or buy an item, where only one item can be owned per address.

## Buying, selling and swapping

Depending on asset’s metadata, any pre-approved address is able buy an NFT without the need for a 3rd party. This is achieved by providing a pre-signed offer, in other words a signature that authorizes another account to buy an item.

For example, a buyer can submit an offer to buy some item by providing a signature off-chain, or even on-chain using a System remark. If the seller agrees to the proposed price, the trade can be executed by providing the signed offer.

## Claiming and distributing items

The NFTs pallet supports popular distribution techniques designed to onboard users with more ease and efficiency, including:

- The ability for a collection owner to send the items manually
- The ability for anyone to claim an item, either for free or by paying a predetermined price
- The ability to distribute items to a whitelist of account addresses
- The ability to distribute items via a secret code

## Integration for private marketplaces

The growing number of collections reveals the need to have private marketplaces those focus on a specific type of NFT, like real estate or gaming items. Each of these marketplaces might have their own fee set and pre-approval process. The pallet is designed such that marketplaces can set the fees and manage the added collections or items.