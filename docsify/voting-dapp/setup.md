# Setup your workspace

To make it easier for you to set up your workspace, you can use the `scaffolf-openbrush` Github repo which contains the file structure we’ll be using for building out our dApp. 

```bash
$ git clone https://github.com/sacha-l/scaffold-openbrush.git
```

Here’s a quick run through of this file structure:

- `contracts`: will contain the contracts with their generic types.
- `src/impls`: will contain the implementations for each contract.
- `src/libs`: will contain common functionality shared by our contracts, such as for handling errors or doing safe math.
- `src/traits`: will contain the trait definitions for each contract.

Rename the newly created directory to voting-dapp, cd into its contracts directory and open it in your preferred code editor.

```bash
$ mv scaffold-openbrush voting-dapp && cd voting-dapp/contracts
```

In the `contracts/README.md` file, you’ll find instructions about how to create a contract. Create a contract called staking by following the steps there.

Check your Rust compiler version is set to nightly (you should see a similar output to this):

```bash
$ rustc --version
rustc 1.68.0-nightly (d6f99e535 2023-01-02)
```

And finally, make sure your `cargo contract` version is updated to 2.0 or higher (you should see a similar output to this):

```bash
$ cargo contract --version
cargo-contract-contract 2.1.0-unknown-aarch64-apple-darwin
```

You should now have the scaffold file structure which you’ll be using to build out your dApp.