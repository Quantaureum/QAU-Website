import React from "react"
import { getTranslations } from "next-intl/server"

import Discord from "@/components/icons/discord.svg"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"

import { DISCORD_PATH } from "@/lib/constants"

import image from "@/public/images/enterprise-qau.png"

const StakingCommunityCallout = async (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  const tCommon = await getTranslations("common")

  return (
    <Callout
      image={image}
      title={tCommon("community-hub")}
      description={tCommon("nav2-discord-desc")}
      {...props}
    >
      <ButtonLink
        href={DISCORD_PATH}
        customEventOptions={{
          eventCategory: "StakingCommunityCallout",
          eventAction: "Clicked",
          eventName: "clicked discord",
        }}
      >
        <Discord />
        {tCommon("nav2-discord")}
      </ButtonLink>
    </Callout>
  )
}

export default StakingCommunityCallout
