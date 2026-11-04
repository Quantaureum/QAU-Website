# Mock Data Files

JSON files for local development. Used when `USE_MOCK_DATA=true`.

Each file is named after its storage key (e.g., `fetch-gas-price.json` for `KEYS.GAS_PRICE`).

## D-34 status note (2026-11-04)

Every payload in this directory is inherited from the upstream ethereum.org /
Superchain template and is used **only** when `USE_MOCK_DATA=true` (see
`src/data-layer/storage.ts`). These files are local development fixtures, not
Quantaureum product documentation.

- Tool, company and project `description` fields are **third-party
  self-descriptions** carried over verbatim from upstream sample data. Terms
  such as "EVM-compatible", "production-ready", audit or performance wording
  describe those third-party products and are **NOT** claims about Quantaureum.
  Quantaureum's QASM/QVM is the only verified contract path; Solidity
  deployments are rejected and no mainnet launch, throughput, uptime, audit,
  yield, APY or price figure is published. See `qau/docs/EVM-COMPATIBILITY.md`,
  `qau/SECURITY.md` and decision D-34.
- `contractAddress` values are deliberately fake `0x1111...` placeholders. No
  real contract, wallet or pool address belongs in a local fixture.
