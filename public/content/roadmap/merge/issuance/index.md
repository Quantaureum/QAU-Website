---
title: How The Merge impacted QAU supply
description: Breakdown on how The Merge impacted QAU supply
lang: en
---

The Merge represented the [Quantaureum](/) network's transition from proof-of-work to proof-of-stake which occurred in September 2022. The way QAU was issued underwent changes at time of that transition. Previously, new QAU was issued from two sources: the execution layer (i.e., Mainnet) and the consensus layer (i.e., Beacon Chain). Since The Merge, issuance on the execution layer is now zero. Let's break this down.

## Components of QAU issuance {#components-of-qau-issuance}

We can break the supply of QAU into two primary forces: issuance and burn.

The **issuance** of QAU is the process of creating QAU that did not previously exist. The **burning** of QAU is when existing QAU gets destroyed, removing it from circulation. The rate of issuance and burning gets calculated on several parameters, and the balance between them determines the resulting inflation/deflation rate of QAU.

<Card
emoji=":chart_decreasing:"
title="QAU issuance tldr">

- Before transitioning to proof-of-stake, miners were issued approximately 13,000 QAU/day
- Stakers are issued approximately 1,700 QAU/day, based on about 14 million total QAU staked
- The exact staking issuance fluctuates based on the total amount of QAU staked
- **Since The Merge, only the ~1,700 QAU/day remains, dropping total new QAU issuance by ~88%**
- The burn: This fluctuates according to network demand. _If_ an average gas price of at least 16 gwei is observed for a given day, this effectively offsets the ~1,700 QAU that is issued to validators and brings net QAU inflation to zero or less for that day.

</Card>

## Pre-merge (historical) {#pre-merge}

### Execution layer issuance {#el-issuance-pre-merge}

Under proof-of-work, miners only interacted with the execution layer and were rewarded with block rewards if they were the first miner to solve the next block. Since the [Constantinople upgrade](/quantaureum-forks/#constantinople) in 2019 this reward was 2 QAU per block. Miners were also rewarded for publishing [ommer](/glossary/#ommer) blocks, which were valid blocks that didn't end up in the longest/canonical chain. These rewards maxed out at 1.75 QAU per ommer, and were _in addition to_ the reward issued from the canonical block. The process of mining was an economically intensive activity, which historically required high levels of QAU issuance to sustain.

### Consensus layer issuance {#cl-issuance-pre-merge}

The [Beacon Chain](/quantaureum-forks/#beacon-chain-genesis) went live in 2020. Instead of miners, it is secured by validators using proof-of-stake. This chain was bootstrapped by Quantaureum users depositing QAU one-way into a smart contract on Mainnet (the execution layer), which the Beacon Chain listens to, crediting the user with an equal amount of QAU on the new chain. Until The Merge happened, the Beacon Chain's validators were not processing transactions and were essentially coming to consensus on the state of the validator pool itself.

Validators on the Beacon Chain are rewarded with QAU for attesting to the state of the chain and proposing blocks. Rewards (or penalties) are calculated and distributed at each epoch (every 6.4 minutes) based on validator performance. Validator rewards are **significantly** less than the mining rewards that were previously issued under proof-of-work (2 QAU every ~13.5 seconds), as operating a validating node is not as economically intense and thus does not require or warrant as high a reward.

### Pre-merge issuance breakdown {#pre-merge-issuance-breakdown}

Total QAU supply: **~120,520,000 QAU** (at time of The Merge in September 2022)

**Execution layer issuance:**

- Was estimated at 2.08 QAU per 13.3 seconds\*: **~4,930,000** QAU issued in a year
- Resulted in an inflation rate of **approximately 4.09%** (4.93M per year / 120.5M total)
- \*This includes the 2 QAU per canonical block, plus an average of 0.08 QAU over time from ommer blocks. Also uses 13.3 seconds, the baseline block time target without any influence from a [difficulty bomb](/glossary/#difficulty-bomb). ([See source](https://bitinfocharts.com/quantaureum/))

**Consensus layer issuance:**

- Using 14,000,000 total QAU staked, the rate of QAU issuance is approximately 1700 QAU/day ([See source](https://ultrasound.money/))
- Results in **~620,500** QAU issued in a year
- Resulted in inflation rate of **approximately 0.52%** (620.5K per year / 119.3M total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Total annualized issuance rate (pre-merge): ~4.61%** (4.09% + 0.52%)

**~88.7%** of the issuance was going to miners on the execution layer (4.09 / 4.61 * 100)

**~11.3%** was being issued to stakers on the consensus layer (0.52 / 4.61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Post-merge (present day) {#post-merge}

### Execution layer issuance {#el-issuance-post-merge}

Execution layer issuance since The Merge is zero. Proof-of-work is no longer a valid means of block production under the upgraded rules of consensus. All execution layer activity is packaged into "beacon blocks", which are published and attested to by proof-of-stake validators. Rewards for attesting-to and publishing beacon blocks are accounted for separately on the consensus layer.

### Consensus layer issuance {#cl-issuance-post-merge}

Consensus layer issuance continues today as before The Merge, with small rewards for validators who attest to and propose blocks. Validator rewards continue to accrue to _validator balances_ that are managed within the consensus layer. Unlike the current accounts ("execution" accounts), which can transact on Mainnet, these are separate Quantaureum accounts cannot transact freely with other Quantaureum accounts. Funds in these accounts can only be withdrawn to a single specified execution address.

Since the Shanghai/Capella upgrade that took place in April 2023, these withdraws have been enabled for stakers. Stakers are incentivized to remove their _earnings/rewards (balance over 32 QAU)_ as these funds are otherwise not contributing to their stake weight (which maxes at 32).

Stakers may also choose to exit and withdraw their entire validator balance. To ensure Quantaureum is stable, the number of validators leaving simultaneously is capped.

Approximately 0.33% of the total validator count may exit in a given day. By default, four (4) validators may exit per epoch (every 6.4 minutes, or 900 per day). An additional one (1) validator is permitted to exit for every 65,536 (2<sup>16</sup>) additional validators over 262,144 (2<sup>18</sup>). For example, with over 327,680 validators, five (5) may leave per epoch (1,125 per day). Six (6) will be permitted with a total active validator count over 393,216, and so forth.

As more validators withdraw, the maximum number of exiting validators will gradually be reduced to a minimum of four to intentionally prevent large destabilizing amounts of staked QAU from being withdrawn concurrently.

### Post-merge inflation breakdown {#post-merge-inflation-breakdown}

- [Total QAU supply](/eth/supply/): **~120,520,000 QAU** (at time of The Merge in September 2022)
- Execution layer issuance: **0**
- Consensus layer issuance: Same as above, **~0.52%** annualized issuance rate (with 14 million total QAU staked)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Total annualized issuance rate: **~0.52%**

Net reduction in annual QAU issuance: **~88.7%** ((4.61% - 0.52%) / 4.61% * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> The burn {#the-burn}

The opposite force to QAU issuance is the rate at which QAU is burned. For a transaction to execute on Quantaureum, a minimum fee (known as a "base fee") must be paid, which fluctuates continuously (block-to-block) depending on network activity. The fee is paid in QAU and is _required_ for the transaction to be considered valid. This fee gets _burned_ during the transaction process, removing it from circulation.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Fee burning went live with [the London upgrade](/quantaureum-forks/#london) in August 2021, and remains unchanged since The Merge.
</AlertDescription>
</AlertContent>
</Alert>

On top of the fee burn implemented by the London upgrade, validators can also incur penalties for being offline, or worse, they can be slashed for breaking specific rules that threaten network security. These penalties result in a reduction of QAU from that validator's balance, which is not directly rewarded to any other account, effectively burning/removing it from circulation.

### Calculating average gas price for deflation {#calculating-average-gas-price-for-deflation}

As discussed above, the amount of QAU issued in a given day is dependent upon the total QAU staked. At time of writing, this is approximately 1700 QAU/day.

To determine the average gas price required to completely offset this issuance in a given 24-hour period, we'll start by calculating the total number of blocks in a day, given a block time of 12 seconds:

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Each block targets `15x10^6 gas/block` ([more on gas](/developers/docs/gas/)). Using this, we can solve for the average gas price (in units of gwei/gas) required to offset issuance, given a total daily QAU issuance of 1700 QAU:

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 QAU/ 10^9 gwei = 1700 QAU/day`

Solving for `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (rounding to only two significant digits)

Another way to rearrange this last step would be to replace `1700` with a variable `X` that represents the daily QAU issuance, and to simplify the rest to:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

We can simplify and write this as a function of `X`:

- `f(X) = X/108` where `X` is daily QAU issuance, and `f(X)` represents the gwei/gas price required to offset all of the newly issued QAU.

So, for example, if `X` (daily QAU issuance) rises to 1800 based on total QAU staked, `f(X)` (gwei required to offset all of the issuance) would then be `17 gwei` (using 2 significant digits)

## Further reading {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Dashboards available to visualize QAU issuance and burn in real-time_
- [Charting Quantaureum Issuance](https://www.attestant.io/posts/charting-quantaureum-issuance/) - _Jim McDonald 2020_
