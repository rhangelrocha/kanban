import { Checkbox } from "@/components/ui/checkbox"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { useState } from "react"

export default function MarcarTodasOpcoes({
  titulo,
  onCheckedChange,
}: {
  titulo: string
  onCheckedChange: (checked: boolean) => void
}) {
  const [checked, setChecked] = useState(false)
  const handleCheckedChange = (newChecked: boolean) => {
    setChecked(newChecked)
    onCheckedChange(newChecked)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-bold">{titulo}</p>
      <div className="relative w-max text-center">
        <Checkbox
          className=""
          checked={checked}
          onCheckedChange={handleCheckedChange}
        />
        <div className="absolute top-1/2 -right-6 -translate-y-1/2">
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger>
              <InfoCircledIcon />
            </HoverCardTrigger>
            <HoverCardContent side="bottom" className="pointer-events-none">
              Ao marcar essa opção, todas abaixo serão marcadas junto
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  )
}
