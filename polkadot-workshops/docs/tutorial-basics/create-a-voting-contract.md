---
title: Create the Voting contract
sidebar_position: 2
---

## Create the Voting contract

In this section we’ll be creating the Voting contract that can use the Steakoin contract 

Just like when we created the Steakoin contract earlier, we’ll use `cargo contract` to create the boilerplate for our Voting contract and update it so that it uses OpenBrush.

1. Create the new contract in the `contracts` directory.
    
    ```bash
    cargo contract new voting
    ```