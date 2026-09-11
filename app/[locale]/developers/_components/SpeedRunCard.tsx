import { Image } from "@/components/Image"
import {
  Card,
  CardButtonFake,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

import speedRunQuantaureumImage from "@/public/images/dev-tools/speed-run-quantaureum-banner.png"

type SpeedRunCardProps = {
  title: string
  description: string
  ctaLabel: string
  className?: string
}
const SpeedRunCard = ({
  title,
  description,
  ctaLabel,
  className,
}: SpeedRunCardProps) => (
  <Card
    href="https://github.com/Quantaureum/"
    sendReferrer
    variant="ghost"
    className={cn(
      "relative min-h-112 overflow-hidden rounded-b-none hover:bg-inherit hover:shadow-none",
      className
    )}
    customEventOptions={{
      eventCategory: "top_boxes",
      eventAction: "click",
      eventName: "speedrun",
    }}
    data-label="speedrunquantaureum-banner"
  >
    <Image
      className="pointer-events-none absolute z-hide h-full w-screen object-cover object-[75%_50%]"
      src={speedRunQuantaureumImage}
      alt="SpeedRunQuantaureum banner"
      sizes="(max-width: 768px) 100vw, 50vw"
    />

    <CardContent>
      <CardTitle size="lg">{title}</CardTitle>
      <CardParagraph>{description}</CardParagraph>
      <CardButtonFake className="sm:w-fit">{ctaLabel}</CardButtonFake>
    </CardContent>
  </Card>
)

export default SpeedRunCard
