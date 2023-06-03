---
title: Exploring use cases
sidebar_position: 3
---

Now that you've learned a little about how the NFTs pallet is designed in [Design and core features](../about-nfts-pallet/1-design-and-core-features.md), you'll probably better understand how it can provide a wide array services.

In this section, we explore what the different use cases of the NFTs pallet could look like.

## Atomic-swapping between item holders

* An item holder can swap their item with another item holder of the same collection
* The trade can be atomically without the need for a marketplace

## Allowing authorized entities to set new attributes to items

* Item holders can allow a third party to update the attributes of their item
* This can meet use cases in gaming whereby users can authorize a gaming platform to make updates to their NFT, such as saving game state

## Pre-signing the ability for accounts to mint from a collection

* A collection owner can create signatures for a whitelist of addresses to be able to mint from their collection
* The signature can contain sale conditions or allow addresses to mint items for free

## Minting from a collection as holder from another collection

* Collections can be created with mint settings that specify another collection ID
* Only holders of items from an existing collection can mint from this new collection