# Implement the Staking trait

Continuing with the Rusty pattern we know and love, now all that’s left is to write our trait’s ink!plementations (*that’s probably the word squink! would use after all* 😉). 

Let’s briefly remind ourselves what the logic needs to look like:

- `fn stake` . The caller of this function will input some amount to *stake*: if the caller of this function already has some tokens staked, add the amount to the amount they already have staked. Otherwise just stake this amount.
- `fn unstake`. The caller of this function will input the amount they want to *unstake*: if this amount is greater than the amount they have staked, transfer all their stake back to the caller. Otherwise, remove the amount from their total amount staked and transfer just that amount back to their account.
- `fn voting_power`. This function is designed for the voting contract to call: it will return the Voting Power calculated based on the amount staked and time left until the unlocking period is passed, using a simple linear decay equation. If there’s no stake, then it returns `0`.

> 💡 ***Are you wondering how our contract actually locks and unlocks these tokens?*** *Well, here’s where the PSP22 interface comes in handy. We’ll use the `transfer_from` function to transfer the staking amount from the caller’s account to the contract’s account ID. For unstaking, we can use the same function but the other way around.*
> 

In our project’s `src/impls/` folder, we’ll create a new file called `[staking.rs](http://staking.rs)` which will contain two main parts:

- `impl<T> Staking for T ..{}`: the actual Staking implementation block
- `impl<T> Internal for T.. {}`: the implementation block for an internal helper trait

Let’s get coding 💻. 

**Add the Staking trait**

Start off by creating a new file called `[staking.rs](http://staking.rs)` in `src/impls/` and add the following code:

```rust
pub use crate::traits::staking::*;
pub use ink::prelude::vec::Vec;
use openbrush::{
    traits::{
        Storage,
    },
};

impl<T> Staking for T
where
    T: Storage<Data>,
    T: PSP22,
    T: psp22::Internal,
{
		// Staking trait impl block goes here
}
```

Update your project by updating the `src/impls/mod.rs` file with: 

```rust
pub mod staking;
```

**Add storage for Staking data**

First thing’s first we’ll need a way to keep track of what’s been staked. We’ll use the common pattern in ink! for creating storage, except we’ll use Openbrush macros that will help us generate a storage key to make our contract easier to upgrade if ever we needed to. 

Update `src/impls/staking.rs` by adding this code snippet to the top of the file, making sure to also update your imports: 

```rust
pub use crate::traits::staking::*;
pub use ink::prelude::vec::Vec;
use openbrush::{
    storage::Mapping,
    traits::{
        Storage, Timestamp
    },
};

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[openbrush::upgradeable_storage(STORAGE_KEY)]
#[derive(Default, Debug)]
pub struct Data {
    pub staked: Mapping<AccountId, (Balance, Timestamp)>,
    pub _reserved: Option<()>,
}
```

The Staking contract data will track the amount an account has staked in our dApp, as well as a timestamp indicating when the stake was made. 

**Add the trait ink!plementations**

Now let’s get to the ink!plementation. The following steps don’t go into too much detail about specific implementation decisions — make sure to read the code comments to understand the logic.

1. Replace the comment that says `//Staking trait impl block goes here` with the following code block for `stake`
    
    ```rust
    fn stake(&mut self, amount: Balance) -> Result<(), StakingErr> {
            // get the AccountId of this caller
            let caller = Self::env().caller();
    
            // get the staking data
            let staked = &self.data::<Data>().staked.get(&caller);
    
            // if the amount is 0, then return an error
            if amount == 0 {
                return Err(StakingErr::AmountMustBeAboveZero)
            }
    
            // if the caller has some tokens already staked, accumulate the amount
            if let Some(staking_data) = staked {
                // calculate accumulated stake
                let accumulated_amount = staking_data.0 + amount;
                // update contract storage with accumulated stake
                let _ = &self
                    .data::<Data>()
                    .staked
                    .insert(&caller, &(accumulated_amount, staking_data.1));
            } else {
                // otherwise, insert the amount to the staking data
                let _ = &self
                    .data::<Data>()
                    .staked
                    .insert(&caller, &(amount, Self::env().block_timestamp()));
            }
    
            // safely transfer the amount to the contract's account ID
    				PSP22Ref::transfer_from_builder(
                &Self::env().account_id(),
                caller,
                Self::env().account_id(),
                amount,
                Vec::<u8>::new(),
            )
            .call_flags(ink::env::CallFlags::default().set_allow_reentry(true))
            .invoke()?;
    				
            Ok(())
        }
    ```
    
2. And now for `unstake`, add in the following code:
    
    ```rust
    fn unstake(&mut self, amount: Balance) -> Result<(), StakingErr> {
            // get the AccountId of this caller
            let caller = Self::env().caller();
    
            // get the staking data
            let staked = &self.data::<Data>().staked.get(&caller);
    
            // users must enter an amount greater than zero
            if amount == 0 {
                return Err(StakingErr::AmountMustBeAboveZero)
            }
    
            // used to calculated if locking period has expired based on 30 days in Unix time
            const UNIX_DAY: u64 = 86400;
            let month: u64 = 30 * UNIX_DAY;
    
            if let Some(staking_data) = staked {
                // get current staked balance
                let current_stake = staking_data.0;
    
                // if user input is equal to or more than their current stake
                if amount >= current_stake {
    
                    // first check if they are allowed to unstake
                    if Self::env().block_timestamp() - staking_data.1 < month {
                        return Err(StakingErr::LockingPeriodNotEnded)
                    }
    
                    // return all staked tokens back to the caller
                    self.transfer_from(Self::env().account_id(), caller, current_stake, Vec::default())?;
    
                    // clean up storage by removing staking data for this caller
                    self.data().staked.remove(&caller);
    
                } else {
                    // otherwise, update the staked amount and reset staking timestamp
                    self.data()
                        .staked
                        .insert(&caller, &(current_stake - amount, Self::env().block_timestamp()));
    
                    // and transfer the amount to be unstaked back to the caller
                    self.transfer_from(Self::env().account_id(), caller, amount, Vec::default())?;
                }
            } else {
                // this means that the stake is None
                return Err(StakingErr::NothingToWithdraw)
            }
    
            Ok(())
        }
    ```
    
3. Finally for `voting_power`:
    
    ```rust
    fn voting_power(&self, account: AccountId) -> u128 {
            // get the amount the account ID has staked
            let staked = &self.data::<Data>().staked.get(&account);
    
            // use Internal trait to get voting power
            if let Some(staking_data) = staked {
                return self._calculate_voting_power(&staking_data)
            } else {
                0
            }
        }
    
    ```
    
4. All that’s left to do now is to write our helper functions `_calculate_voting_power`we’ve used above. Add the following code to the end of the file:
    
    ```rust
    // Internal helpers for the Staking trait implementation
    pub trait Internal {
        /// Calculates voting power based on amount staked and time locked
        fn _calculate_voting_power(&self, staking_data: &(Balance, Timestamp)) -> u128;
    }
    
    impl<T> Internal for T
    where
        T: Storage<Data>,
    {
        fn _calculate_voting_power(&self, staking_data: &(Balance, Timestamp)) -> u128 {
            
            // get the current amount staked
            let current_amount_staked = staking_data.0;
    
            // calculate the amount of time passed since the last stake
            let time_until_unlocking = Self::env().block_timestamp() - staking_data.1;
    
            // calculate percentage of time passed until user can unlock
            const UNIX_MONTH: u64 = 2592000; // based on 30 days in Unix time
            let decay_coefficient = 1 - (time_until_unlocking / UNIX_MONTH);
    
            // calculate voting_power using linear decay based on amount staked
    		let voting_power = decay_coefficient as u128 * current_amount_staked;
    
            return voting_power as u128
        }
    }
    ```
    
All we’re doing here is calculating voting power as a function the amount a user has staked and the the amount of time left a user has until they can unstake.

