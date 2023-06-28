---
title: Mint settings and roles
sidebar_position: 2
---

There are different types of roles allowed to make updates to collection items, depending on the collection settings. The basic idea behind configuring a collection’s settings is to specify what entities are allowed to make updates to the minting settings of a collection over time.
Entities can be accounts controlled by a single user, a group of users or for more advanced use cases, pallet-level accounts.

The different roles a collection owner can configure include:

- **Issuer**: an entity that can mint from a collection.
- **Admin**: an entity that can update the metadata of a collection unless it is already locked.
- **Freezer**: an entity with permission to freeze (and unfreeze) a collection, making items non-transferable.
- **None**: if a collection has no roles set, the collection is created with no ability to update these roles in the future.

🧑‍💻 Head to the [Code sandbox](../guides/codesandbox.mdx) to start trying out different settings.