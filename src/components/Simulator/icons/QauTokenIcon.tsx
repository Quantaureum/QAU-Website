import { cn } from "@/lib/utils/cn"

import QauToken from "./qau-token.svg"

const QauTokenIcon = ({ className }: { className?: string }) => (
  <QauToken
    className={cn(
      "[&_circle]:fill-primary-hover [&_path]:fill-background",
      className
    )}
  />
)

export default QauTokenIcon
