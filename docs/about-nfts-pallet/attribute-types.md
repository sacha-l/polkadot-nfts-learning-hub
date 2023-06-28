---
title: Attribute types
sidebar_position: 3
---

You can think of attributes as a place to hold different types of additional data a single item can store.
This could be data that can be updated by another app-chain, a smart contract, a collection owner or an item holder.

There are 4 different types of such attributes:

1. **System attributes.** These are attributes that can only be set or unset by the pallet. Examples include locking an item for runtimes that use another pallet to extend the capabilities of the NFTs pallet (e.g. using a pallet that offers fractionalization of single items). This is also the attribute that is set to allow users to mint from a collection if they hold an item from another collection.
2. **Collection owner’s attributes**. These are attributes that can only be set or unset by the collection owner, provided it has not been locked.
3. **User attributes**. These are attributes stored in a namespace to contain various settings that can only be changed by the item owner.
4. **External attributes**. These are attributes that an item owner can use to allow external services (for e.g oracles, smart contracts or another app-chain via governance) to store information in their item.

These attribute types can unleash use cases for item holders to authorize applications to provide them with additional utility. For example, only items that have external attributes set by a specific oracle can be used in an application that requires that oracle.

🧑‍💻 Head to the [Code sandbox](../guides/codesandbox.mdx) to start trying out different settings.