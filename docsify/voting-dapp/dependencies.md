## Add `StakingData` to your contract and link dependencies

When we created our Staking trait, we added a storage structure called `Data` but we never added this to our contract file. You’ll need to do this so that your contract includes it.

In `contracts/lib.rs` import the `Data` struct from our staking implementation and create an alias called `StakingData`:

```rust
// imports from Staking impl
    use dapp::impls::staking::{
        Data as StakingData,
        *,
    };
```

And add it to the Staking storage struct:

```rust
		#[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Staking {
	    	#[storage_field]
				psp22: psp22::Data,
        #[storage_field]      // <- add this line
        staking: StakingData, // <- add this line
    }
```

Finally, implement Staking for our contract by adding:

```rust
impl dapp::Staking for Staking {}
```

Before we can verify our contract has properly been updated with the new Staking trait and impls, we need to link our `src` folder to the contract library. 

In `contracts/staking/Cargo.toml` add the `src` folder dependency and add it to `std` features:

```rust
dapp = { path = "../../src", default-features = false, features = ["staking"] }

// -- snip --

std = [
// -- snip --
"dapp/std",
]
```

In `src/Cargo.toml` , add the staking feature:

```rust
# adds staking features to dapp
staking = []
```

In `src/impls/mod.rs` include the staking feature configuration:

```rust
#[cfg(feature = "staking")]
pub mod staking;

#[cfg(feature = "staking")]
pub use staking::*;
```

Run `cargo check` to check all dependencies can compile.