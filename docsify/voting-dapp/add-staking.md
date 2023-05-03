### Add a trait definition for Staking

A common pattern in developing ink! contracts with OpenBrush is to first define your traits and then implement them in their own modules. This keeps the project organized, easy to read and extend.

1. In the `src/traits` folder of our project, create a Rust module called `staking.rs`.
2. In the `src/traits/mod.rs` file, make this module accessible to the rest of your project by adding:
    
    ```rust
    pub mod staking;
    ```
    
3. In the `staking.rs` file, add the following code :
    
    ```rust
    pub use openbrush::{
        contracts::psp22::*,
        traits::{
            AccountId,
            Balance,
        },
    };
    
    #[openbrush::wrapper]
    pub type StakingRef = dyn Staking + PSP22;
    
    #[openbrush::trait_definition]
    pub trait Staking {
        #[ink(message)]
        fn stake(&mut self, amount: Balance) -> Result<(), PSP22Error>;
    
        #[ink(message)]
        fn unstake(&mut self, amount: Balance) -> Result<(), PSP22Error>;
    
        #[ink(message)]
        fn voting_power(&self, account: AccountId) -> u128;
    }
    ```
    
<!-- slide:break -->

<!-- tabs:start -->

#### **💡Code explanation**

We’ve added the function signatures that we’ll need for the Staking trait as well as the other PSP22 imports. Just like declaring any publicly callable function in an ink! contract, notice how each function signature is annotated with `#[ink(message)]`. This ensures that the methods in this trait are callable when we implement it for the staking contract. 

You’ll also notice that OpenBrush is doing some macro magic for us too:

- `#[openbrush::wrapper]` : this provides a wrapper around the storage declaration to pass it into our ink! contract.
- `#[openbrush::traits]`: this allows us to define a trait in a separate file that can be used by our generic Staking contract.

<!-- tabs:end -->