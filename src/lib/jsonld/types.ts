import { KNOWN_ORGANIZATIONS } from "./organizations"
import { KNOWN_PERSONS } from "./persons"

export type KnownEntity =
  | (typeof KNOWN_PERSONS)[keyof typeof KNOWN_PERSONS]
  | (typeof KNOWN_ORGANIZATIONS)[keyof typeof KNOWN_ORGANIZATIONS]
  | (typeof KNOWN_ORGANIZATIONS)["quantaureum-org"]
  | (typeof KNOWN_ORGANIZATIONS)["quantaureum-community"]
