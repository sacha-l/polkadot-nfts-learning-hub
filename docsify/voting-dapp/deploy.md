## Deploy your contract (optional)

1. Build your contract using:
    
    ```bash
    cargo contract build
    ```
    
2. Deploy your contract on the Contracts parachain using the [Contracts UI](https://contracts-ui.substrate.io/) (this is where you’ll need to make sure you have ROC tokens).
3. Interact with the contract in the UI and explore the different methods provided by the PSP22 standard as well as our new Staking functions. For example, transfer some tokens to another account:
    
    ![Screen Shot 2023-03-31 at 3.36.18 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6c069187-03f1-4b37-ba36-76c864cc9406/Screen_Shot_2023-03-31_at_3.36.18_PM.png)
    

Great — you have the first version of your Staking contract deployed! Continue to the next part of this tutorial to create a Voting contract and write tests for your dApp. 🎉