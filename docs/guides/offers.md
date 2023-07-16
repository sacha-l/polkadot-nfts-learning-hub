---
title: Create offers for P2P swaps
sidebar_position: 3
---

The pallet introduces novel mechanisms for creating offers for collection owners.
You can imagine marketplaces who provide services for anyone to bid on items of a collection.

These bids can be done using Polkadot cheques &mdash; a unlimited collection created by the destined owner which acts 

**Goal:** allow anyone to create offers using the cheque book onchain for the collection owner to approve, enforcing some incentive for the bidders to remove their offer later.

Scenario: Charlie's eager to buy an item from Alice's collection so he provides her with an offer. She can choose to accept it or reject it. If the offer is accepted,

Steps to test this use case out:

1. Create a public collection with an unlimited supply using the Charlie account as owner of this cheque book.
2. For Charlie to submit an offer on a specific item of Alice's collection, you'll need to batch the `mint` and `create_swap` calls using his account. The `mint` call is like using a cheque, and the `create_swap` is the proposed exchange between the cheque and the desired item.
4. Assume there is some marketplace that lists these offers for collection owners to accept. 
5. For Alice to accept it, she will need to make a `claim` transaction and then you must allow Charlie to `burn` his chequebook item for him to get back his deposit.

You can also set the expiration date for an offer.