## Application design and overview

Our Voting dapp’s logic is based on the fact that users need to acquire PSP22 tokens in order to vote or propose items to be voted on. Therefore, the ability to send, receive and stake these tokens will be a core part of what we’re building.

This tutorial can be completed in 3 sections. The first will be about building our the Staking contract and it’s custom functionality. The second will be about building the Voting contract which can make call to the Staking contract. In the second section, we’ll also write tests for both contracts. In the third and last section, we’ll add a front-end that will allow users to vote on proposals.


<img src="../assets/user-diagram-1.png"  width="300">  <img src="../assets/user-diagram-2.png"  width="300">

Let’s imagine a user, Jeremy who is eager to vote on proposals found on this voting dApp. The first thing he’ll need to do is to acquire some tokens, which he asks his friend for. The more tokens he stakes, the more initial voting power he receives. But when he un-stakes his tokens, he’ll lose all voting power. Because voting power is contingent on the user staking, we’ll really be doing two things in this part:

- Implement the PSP22 standard to create a supply of staking tokens
- Extend our implementation to include a function that returns some Voting Power based on the active amount staked. For calculating voting power, we’ll use a simple linear decay function to calculate the voting power at a given time since the last stake :
    
    f(t) = CX - r*t
    
    - where C denotes a constant for a 30 day period in Unix time
    - X is the amount of stake
    - r is the decay

The rules we’ll enforce in our Staking contract logic are: 

- Only 42_000_000 tokens will initially be issued
- Users can only earn Voting Power as a function of how much they stake, following a linear decaying amount of Voting Power over time
- Users can add stake to earn more voting power at any time
- For any amount staked, the contract will lock those funds for another 1 month

> 📝 Note that our Staking logic is very simplified — there’s a lot more you can do to improve the overall voting dApp once you get these basics down. **Please note that whatever it is you end up building in this tutorial, none of the code should be considered production ready and is only meant for educational purposes. Outside the scope of this tutorial: add inflation for token supply and allow users to chose lock-up periods to increase voting power.**

<!-- slide:break -->

<!-- tabs:start -->

Here’s an overview of the architecture of our voting dApp:

![dapp-architecture.png](../assets/dapp-architecture.png)

<!-- tabs:end -->

In this first section we’ll create a Staking contract to issue some tokens on-chain and allow users to *stake* an amount — which will give them some Voting Power (VP) — and to *unstake* an amount — which will take away their Voting Power. VP will be an important part of our dapp’s overall logic once we write the Voting contract in the next part of this tutorial. For now, just think of it as a unit of account that users of our dApp can only acquire by staking the PSP22 token we’ll create.  