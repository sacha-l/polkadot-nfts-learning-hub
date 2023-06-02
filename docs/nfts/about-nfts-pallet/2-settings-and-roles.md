---
title: How collection settings work
sidebar_position: 2
---

There are different types of accounts allowed to make updates to collection items, depending on the collection settings. The basic idea behind configuring a collection’s settings is to specify what entities are allowed to make changes to a collection. Entities can be accounts controlled by a single user or group of users, or pallet-level accounts.

## Permissions and roles

A collection owner can configure different entities that can make changes to items and collections, provided they are set upon the creation of a collection. These include:

- Issuer: an entity that can mint from a collection.
- Admin: an entity that can control the metadata of a collection.
- Freezer: an entity with permission to freeze a collection.
- None: if no role is configured, the collection is created with no ability to update the any permissions

## Attribute types

A collection can hold the following types of attributes:

1. **System attributes.** These are attributes that can only be set or unset by the pallet. Examples include locking an item for runtimes that use the fractionalization pallet. This is also how users are able to mint from a collection if they hold a valid item from another collection.
2. **Collection owner’s attributes**. These are attributes that can only be set or unset by the collection owner.
3. **User attributes**. These are attributes stored in a namespace to containing various setting that can only be changed by the item owner. No account can restrict modifying those attributes.
4. **External attributes**. These are attributes that an item owner can use to allow some service (oracle, smart contract on another chain or another chain via governance) to set or change.

See **Namespaces** (advanced).