---
title: Bitflags
sidebar_position: 2
---

Bitflags are used to encode information about collections and minting settings.
You will need to learn how they work when creating applications that interact with the NFTs pallet.

## Collection settings

Collection settings are defined by a bit-field encoding information for:

1. Item transferrability 
2. Locking collection metadata
3. Modifying attributes
4. Modifying max supply
5. Changing deposit requirements

This is also the order of which bits each configuration corresponds to from right to left.

For example, the corresponding binary value for a default collection setting is `00000` (or `0` as an integer). 

This would be the equivalent of constructing a `collectionConfig` object defined as:

```js
  const collectionConfig = {
    settings: 0, // <- this integer specifies default settings
    maxSupply: undefined,
    mintSettings: {
      mintType: "Issuer",
      price: undefined,
      startBlock: undefined,
      endBlock: undefined,
      defaultItemSettings: 0, 
    }
  };      
```

To make items non-transferrable upon the creation of a collection, the settings would be equivalent to `1` or `00001` in binary. To both lock the collection metadata **and** make items non-transferrable we would specify the setting as `3` or `00011` in binary.

## Item settings

When creating a collection, you also can specify settings for individual items.


```js
  const collectionConfig = {
    settings: 0, 
    maxSupply: undefined,
    mintSettings: {
      mintType: "Issuer",
      price: undefined,
      startBlock: undefined,
      endBlock: undefined,
      defaultItemSettings: 0, // <- this field encodes the item settings
    }
  };      
```

Item settings are defined by 3-bit values for:

1. Transferability (in the sense of freezing or unfreezing which could be changed by admin)
2. Making metadata editable (this cannot be changed once set)
3. Making attributes editable (this cannot be changed once set)

This is also the order of which bits each configuration corresponds to from right to left.

For example, to lock the metadata of an item the item setting would be `2` or `010` in binary.

💡 Head to the [Codesandbox](./codesandbox.mdx) to play around with different collection settings you can make.