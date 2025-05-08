import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { EquipeNovaForm } from "./EquipeNovaForm"

export function Modal_Nova_Equipe() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Nova equipe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-center text-xl">Nova equipe</DialogTitle>
        </DialogHeader>

        <EquipeNovaForm />
      </DialogContent>
    </Dialog>
  )
}
