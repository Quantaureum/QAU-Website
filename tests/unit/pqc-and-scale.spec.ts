import { expect, test } from "@playwright/test"

import networkMsg from "@/intl/en/page-what-is-the-quantaureum-network.json"
import communityMsg from "@/intl/en/page-community.json"
import whatIsMsg from "@/intl/en/page-what-is-quantaureum.json"
import roadmapMsg from "@/intl/en/page-roadmap.json"
import resourcesMsg from "@/intl/en/page-resources.json"
import bugBountyMsg from "@/intl/en/page-bug-bounty.json"
import whatIsQauMsg from "@/intl/en/page-what-is-qau.json"
import openSourceMsg from "@/intl/en/page-open-source.json"

// NIST standardized the CRYSTALS primitives under new names: FIPS 204 → ML-DSA,
// FIPS 203 → ML-KEM. Writing "Dilithium3 (NIST FIPS 204)" is technically
// imprecise. The chain implementation is the circl Dilithium3 / Kyber768 mode
// (≈ ML-DSA-65 / ML-KEM-768), so copy must say so.
test("PQC copy uses the NIST-standardized names with derivation noted", () => {
  const sources = [
    whatIsMsg,
    roadmapMsg,
    resourcesMsg,
    bugBountyMsg,
    whatIsQauMsg,
    openSourceMsg,
  ]
  const allPqc = sources.map((s) => JSON.stringify(s)).join("\n")
  expect(allPqc).toContain("ML-DSA-65")
  expect(allPqc).toContain("ML-KEM-768")
  // The imprecise "Dilithium3 (NIST FIPS 204)" phrasing must be gone.
  expect(allPqc).not.toMatch(/Dilithium3 \(NIST FIPS 204\)/)
  expect(allPqc).not.toMatch(/Kyber768 \(NIST FIPS 203\)/)
})

// Scale claims must be backed by evidence. The Explorer shows a tiny live
// network, so template-scale copy ("thousands of nodes", "hundreds of
// thousands" of community, "12,000+ contributors") is misleading.
test("network and community copy drops unfounded scale claims and 2024 data", () => {
  const networkSer = JSON.stringify(networkMsg)
  expect(networkSer).not.toMatch(/thousands of independent computers/)
  expect(networkSer).not.toMatch(/how many transactions were settled in 2024/)
  expect(networkSer).not.toMatch(
    /hundreds of thousands of developers|thousands of open-source contributors/
  )

  const communitySer = JSON.stringify(communityMsg)
  expect(communitySer).not.toMatch(/hundreds of thousands/)
  expect(communitySer).not.toMatch(/thousands of open-source contributors/)
})
