import { KNOWN_ORGANIZATIONS } from "./organizations"

export type KnownEntity =
  | (typeof KNOWN_ORGANIZATIONS)[keyof typeof KNOWN_ORGANIZATIONS]
  | (typeof KNOWN_ORGANIZATIONS)["quantaureum-org"]
  | (typeof KNOWN_ORGANIZATIONS)["quantaureum-community"]
