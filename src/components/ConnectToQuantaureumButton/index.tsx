import { ConnectButton } from "@rainbow-me/rainbowkit"

import QauGlyphSolid from "@/components/icons/qau-glyph-solid.svg"
import { Button } from "@/components/ui/buttons/Button"

const ConnectToQuantaureumButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted
        if (!ready) return null

        if (account && chain) {
          return <ConnectButton />
        }

        return (
          <Button
            onClick={() => {
              openConnectModal()
              onClick()
            }}
            className="w-full px-8 sm:w-auto"
          >
            <QauGlyphSolid />
            Sign in with Quantaureum
          </Button>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectToQuantaureumButton
