"use client"

import { Section } from "@/components/ui/section"

// Homepage lazy-loading skeletons shown while client islands hydrate.
const HomepageLazy = () => (
  <div className="w-full">
    <Section className="mb-8">
      <div
        data-slot="loading"
        className="h-64 w-full animate-pulse rounded-base bg-background-highlight"
      />
    </Section>
    <Section className="mb-8">
      <div
        data-slot="loading"
        className="h-96 w-full animate-pulse rounded-base bg-background-highlight"
      />
    </Section>
  </div>
)

export default HomepageLazy
