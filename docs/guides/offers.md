---
title: Create offers for P2P swaps
sidebar_position: 3
---

**Goal:** holders of a specific item can create offers onchain for any account to claim the  + some incentive for the bidders to remove their offer later

Steps to test this use case out:

1. Create a public collection with an unlimited supply using the Alice account as collection owner.
2. For Alice to create offers on specific items of her collection, you'll need to batch the `mint` and `create_swap` calls using her account.
4. Assume there is some marketplace that lists these offers for others to take. 
5. For another user, Charlie, to accept it they make a `claim` transaction.

You can also set the expiration date for an offer.