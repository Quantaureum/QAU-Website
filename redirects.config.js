// All primary redirects ([source, destination, permanent? (default true)])
//
// Target rule: every destination must resolve to a live route (app/[locale]
// page or public/content). The ethereum.org migration table pointed at hub
// subpaths that were never ported (guides, dao, layer-2, nft, security,
// developers/docs/*), which 301'd straight into 404s. Dead targets now go to
// the closest live hub instead:
//   developer-doc paths        -> /developers/
//   beginner concept pages     -> /learn/
//   app/ecosystem discovery    -> /explorer/
//   community programs         -> /community/
//   wallet topics              -> /wallets/
//   staking subtopics          -> /staking/

/** @type { [string, string, boolean | undefined][] } */
module.exports = [
  ["/developers/docs/evm", "/developers/"],
  ["/developers/docs/evm/opcodes", "/developers/"],
  ["/discord", "https://discord.gg/MSctkBT5j"],
  ["/brand", "/assets/"],
  ["/what-is-ethereum", "/what-is-quantaureum/"],
  ["/what-is-ether", "/what-is-qau/"],
  ["/ether", "/what-is-qau/"],
  ["/eth", "/what-is-qau/"],
  ["/token", "/developers/"],
  ["/cli", "/developers/"],
  ["/roadmap/vision", "/roadmap/"],
  ["/roadmap/future-proofing", "/roadmap/"],
  ["/roadmap/future-proofing/quantum-resistance", "/roadmap/"],
  ["/search", "/"],
  ["/beginners", "/what-is-quantaureum/"],
  ["/download", "/wallets/"],
  ["/how", "/learn/"],
  ["/nfts", "/learn/"],
  ["/daos", "/learn/"],
  ["/layer2", "/learn/"],
  ["/grants", "/community/"],
  ["/java", "/developers/"],
  ["/python", "/developers/"],
  ["/javascript", "/developers/"],
  ["/golang", "/developers/"],
  ["/rust", "/developers/"],
  ["/dot-net", "/developers/"],
  ["/delphi", "/developers/"],
  ["/dart", "/developers/"],
  ["/build", "/developers/"],

  // Former ethereum.org eth2/roadmap/upgrade URLs now point at the generic
  // Quantaureum roadmap hub. Historical sub-paths were removed.
  ["/eth2", "/roadmap/"],
  ["/eth2/:path*", "/roadmap/"],
  ["/upgrades", "/roadmap/"],
  ["/upgrades/:path*", "/roadmap/"],
  ["/garden", "/roadmap/"],

  ["/deprecated-software", "/explorer/"],
  ["/dashboards", "/resources"],
  ["/history", "/roadmap/"],
  ["/wallet", "/wallets/"],

  // Developer docs legacy paths (generic, chain-agnostic)
  ["/developers/learning-tools", "/developers/"],
  ["/developers/local-environment", "/developers/"],
  ["/developers/docs/scaling/layer-2-rollups", "/developers/"],
  ["/developers/docs/layer-2-scaling", "/developers/"],
  ["/developers/docs/zk", "/developers/"],
  ["/developers/docs/zk-snarks", "/developers/"],
  ["/developers/docs/security", "/developers/"],
  ["/developers/docs/wallets", "/wallets/"],
  ["/developers/docs/daos", "/developers/"],
  ["/developers/docs/rollups", "/developers/"],
  ["/developers/docs/smart-contracts/source-code-verification", "/developers/"],
  [
    "/developers/docs/smart-contracts/upgrading-smart-contracts",
    "/developers/",
  ],
  ["/developers/docs/consensus-mechanisms/proof-of-stake", "/developers/"],
  [
    "/developers/docs/consensus-mechanisms/proof-of-stake/slashing",
    "/developers/",
  ],
  ["/developers/docs/ides/%23web-based-ides", "/developers/"],
  ["/developers/docs/scaling/rollups", "/developers/"],
  ["/developers/docs/scaling/layer-2", "/developers/"],

  // Removed legacy ethereum.org hub pages — point at the closest Quantaureum equivalent
  ["/enterprise", "/what-is-quantaureum/"],
  ["/enterprise/:path*", "/what-is-quantaureum/"],
  ["/use", "/explorer/"],
  ["/dapps", "/explorer/"],
  ["/team", "/what-is-quantaureum/"],
  ["/donate", "/"],
  ["/blog", "/"],
  ["/tds", "/"],
  ["/trillion-dollar-security", "/"],
  ["/10-years", "/"],
  ["/10years", "/"],
  ["/about/:path*", "/what-is-quantaureum/"],
  // QPOS is a PoS consensus: no miners exist, so explorer/miners folds into
  // the validators page.
  ["/explorer/miners", "/explorer/validators/"],
  ["/guides/how-to-register-an-ethereum-account", "/wallets/"],
  ["/guides/how-to-create-an-ethereum-account", "/wallets/"],
  ["/wlan", "/wallets/"],
  ["/wallets/security", "/wallets/"],
  ["/zero-knowledge", "/learn/"],
  ["/layer-2-scaling", "/learn/"],
  ["/layer-2-scaling/rollups", "/developers/"],
  ["/layer-1-scaling/sidechains", "/developers/"],
  ["/layer-2-scaling/state-channels", "/developers/"],
  ["/staking/withdraws", "/staking/"],
  ["/languages", "/community/"],

  // Pages removed from the QAU site: send old URLs to the closest live hub.
  ["/apps", "/explorer/"],
  ["/developers/docs", "/developers/#docs"],
  ["/developers/docs/qvm", "/developers/#docs"],
  ["/developers/docs/consensus-mechanisms", "/developers/#docs"],
  ["/developers/docs/nodes-and-clients", "/run-a-node/"],
  ["/developers/docs/nodes-and-clients/run-a-node", "/run-a-node/"],
  ["/developers/docs/nodes-and-clients/client-diversity", "/run-a-node/"],
  ["/roadmap/security", "/roadmap/#technical-upgrades"],
  ["/roadmap/security/quantum-resistance", "/roadmap/#technical-upgrades"],
  ["/roadmap/scaling", "/roadmap/#technical-upgrades"],
  ["/roadmap/privacy", "/roadmap/#technical-upgrades"],
  ["/roadmap/user-experience", "/roadmap/#changes-coming"],
  ["/roadmap/verkle-trees", "/roadmap/#technical-upgrades"],
]
