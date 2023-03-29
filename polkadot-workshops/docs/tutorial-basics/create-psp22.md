---
title: Create a PSP22 contract
sidebar_position: 1
---

## File Structure and Setup with OpenBrush

To make it easier for you to get started, I’ve created a Github repo which contains the basic structure of a dapp project built with OpenBrush. Feel free to use it in other projects and to give it a star if you find it useful! 

`git clone https://github.com/sacha-l/scaffold-openbrush.git`

A quick run through the OpenBrush file structure:

<!-- ![Screen Shot]() -->

- `contracts`: will contain the contracts with their generic types.
- `src/impls`: will contain the implementations for each contract.
- `src/libs`: will contain common functionality shared by our contracts, specifically for handling errors.
- `src/traits`: will contain the trait definitions for each contract.

1. Set up your working environment by cloning the `scaffold-openbrush` repo.
2. Create a contract called `steakoin` by following the [steps provided in `contracts/README.md`](https://github.com/sacha-l/scaffold-openbrush/tree/master/contracts).

## **Create a PSP22 Steakoin contract**

OpenBrush makes it easy to use a set of standards for smart contracts developers called PSPs (Polkadot Standards Proposals), similar to [ERC’s in the EVM world](https://eips.ethereum.org/erc). Using a standard for our token contract will make it easier for other applications to interact with it. Read more about the standard proposals [here](https://github.com/w3f/PSPs). 

In the previous section you created a simple ink! contract using `cargo contract`. The resulting boilerplate in the `[lib.rs](http://lib.rs)` file shows some basic features of ink!:

- Storage
- Constructor
- Message
- Tests

Because we’re using OpenBrush to build our dapp, our contract code will look different than a typical ink! contract.

1. First, add the PSP 22 feature in the `contracts/steakoin/Cargo.toml` file:
    
    ```toml
    openbrush = { git = "https://github.com/727-Ventures/openbrush-contracts", version = "3.0.0", default-features = false }
    ```
    
2. Replace the contents of `contracts/steakoin/lib.rs` with the following code:

```rust
#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
        
#[openbrush::contract]
pub mod steakoin {
    
  // imports from openbrush
	use openbrush::contracts::psp22::*;
	use openbrush::traits::Storage;

    // Defines storage for your contract
    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Steakoin {
    	#[storage_field]
		  psp22: psp22::Data,
    }
    
  // Section contains default implementation without any modifications
	impl PSP22 for Steakoin {}
     
    impl Steakoin {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance) -> Self {
            let mut _instance = Self::default();
			_instance._mint_to(_instance.env().caller(), initial_supply).expect("Should mint"); 
			_instance
        }
    }
}
```

What is this coding doing? Well, it’s simply adding a storage structure and adding a trait implementation to mint a default supply of the PSP22 token. In ink! any storage structure needs to be annotated with the `#[ink(storage)]` attribute to declare a storage data structure. Notice the additional macros and new constructor we’ve just included:

- `#[derive(Default, Storage)]`: the derive macro is used to bring in Rust’s standard Default trait which enables our storage struct to inherit default behaviour. We also use Openbrush’s Storage trait which gives the storage struct a standard Openbrush storage implementation.
- `#[storage_field]`: this annotation over the storage field allows our implementation files to know about these fields.
- The `new(initial_supply: Balance) -> Self` function which is part of the PSP22 standard implementation.

### Compile and deploy your contract

1. Compile your contract using:
    
    ```bash
    cargo contract build
    ```
    
    This should produce a three files as shown below.
    
    <!-- ![Screen Shot]() -->
    
2. Deploy your contract on the Contracts parachain using the [Contracts UI](https://contracts-ui.substrate.io/).
    
    <!-- ![Screen Shot]() -->
    

Great you have the first version of your Steakoin contract deployed! That was easy right? But in truth, it really isn’t doing much apart from storing PSP22 data and proving the bare bones PSP22 implementation. Next, we’ll want to create a custom implementation of the PSP22 contract in order to add data specific to our Steakoin implementation — i.e. a mapping between AccountId and a staking Balance.

## Create the Steakoin trait, impls, errors and events

Creating a trait will act as an interface that will help us make an API to make cross-contract calls. OpenBrush provides the `#[openbrush::trait_definition]` macro to 

1. In the `traits` folder, create a new file called `[steakoin.rs](http://steakoin.rs)`
2. In `[steakoin.rs](http://steakoin.rs)` copy the following code:
    
    ```rust
    // import OpenBrush traits
    use openbrush::{
        contracts::psp22::*,
        traits::{
            AccountId,
            Balance,
        },
    };
    // import custom PSP22 error
    use crate::libs::errors::SteakErr;
    
    // create a wrapper to use ink! core util
    #[openbrush::wrapper]
    pub type SteakoinRef = dyn Steakoin + PSP22;
    
    #[openbrush::trait_definition]
    pub trait Steakoin {
    		// this function allows users to stake some balance of this PSP22 token
        #[ink(message)]
        fn steak(&mut self, amount: Balance) -> Result<(), SteakErr>;
    
    		// this function allows users to unstake some balance of this PSP22 token
        #[ink(message)]
        fn unsteak(&mut self, amount: Balance) -> Result<(), SteakErr>;	  
    }
    ```
    
    - In the code above, we’re simply defining the interface to interact with our Steakoin contract using OpenBrush. We’ve annotated each function with the `#[ink(message)]` attribute which tells our dapp that these are publicly callable functions.
    - We’ve introduced a new OpenBrush attribute to help us create a [contract reference](https://use.ink/basics/cross-contract-calling#contract-references) called `SteakoinRef`  which will enable the Steakoin contract to be called by another contract.
    
    We’ve also just introduced the `SteakErr` type which we haven’t yet defined. So let’s actually do this because we’ll need to use this type in our trait implementation.
    

And update the `/traits/mod.rs` file too:

1. In `/impls/steakoin.rs`, paste the following code to implement the Steakoin logic:
    
    ```rust
    use crate::error::SteakErr;
    pub use crate::traits::steakoin::*;
    use openbrush::{
        contracts::psp22,
        storage::Mapping,
        traits::{
            AccountId,
            Balance,
            Storage,
            Timestamp,
        },
    };
    
    // create a storage key for the data of the Steakoin contract
    pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);
    
    #[openbrush::upgradeable_storage(STORAGE_KEY)]
    #[derive(Default, Debug)]
    pub struct Data {
        pub staked: Mapping<AccountId, (Balance, Timestamp)>,
        pub _reserved: Option<()>, // reserved for upgrading the Data struct
    }
    
    impl<T> Steakoin for T
    where
        T: Storage<Data>,
        T: Storage<psp22::Data>,
        T: psp22::Internal,
    {
    		fn steak(&mut self, amount: Balance) -> Result<(), SteakErr> {
            Ok(())
        }
    		
        fn unsteak(&mut self, amount: Balance) -> Result<(), SteakErr> {
            Ok(())
        }
    }
    ```
    
    Notice a few things about this code:
    
    - We’ve created a storage key using OpenBrush’s `storage_unique_key!` . ink implicitly generates its own key, but if we want to redeploy the contract we need to update it to the same key otherwise the contract’s storage will be corrupted. Read more about how a storage key [ink! docs](https://use.ink/datastructures/storage-in-metadata#storage-key-calculation-for-ink-mapping-values).
    - We’ve introduced a storage data structure called `Data` which  has two fields:
        - `pub staked`: a mapping of `AccountId` to a `Balance` and `Timestamp` tuple.
        - `pub _reserved` : a field reserved to make this storage data structure upgradable, which we won’t need to use here.
2. In `contracts/steakoin/` add steakoin data from our dapp’s API to the Steakoin contract.
    
    ```rust
    	cargo contract check
    ```
    
    ```toml
    [package]
    name = "steakoin"
    version = "0.1.0"
    authors = ["[your_name] <[your_email]>"]
    edition = "2021"
    
    [dependencies]
    ink = { version = "4.0.1", default-features = false }
    openbrush = { git = "https://github.com/727-Ventures/openbrush-contracts", version = "3.0.0", default-features = false, features = ["psp22"] }
    
    scale = { package = "parity-scale-codec", version = "3", default-features = false, features = ["derive"] }
    scale-info = { version = "2.3", default-features = false, features = ["derive"], optional = true }
    # Add the dapp dependency
    dapp = { path = "../../src", default-features = false, features = ["steakoin"] }
    
    [dev-dependencies]
    ink_e2e = "4.0.1"
    
    [lib]
    name = "steakoin"
    path = "lib.rs"
    crate-type = [
    	"cdylib",
    ]
    
    [features]
    default = ["std"]
    std = [
        "ink/std",
        "scale/std",
        "scale-info/std",
        "openbrush/std",
        # add the std features
        "dapp/std",
    ]
    
    ink-as-dependency = []
    e2e-tests = []
    
    [profile.release]
    overflow-checks = false     # Disable integer overflow checks.
    lto = false                 # Enable full link-time optimization.
    ```