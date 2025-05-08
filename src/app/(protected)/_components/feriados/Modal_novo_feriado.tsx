import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FeriadoNovoForm } from "./FeriadoNovoForm"

export function Modal_Novo_Feriado() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Novo feriado</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-center text-xl">
            Novo feriado
          </DialogTitle>
          <DialogDescription className="text-center">
            <b> Importante:</b> Nos feriados, as horas úteis de todos os
            usuários não serão contabilizadas no sistema.
          </DialogDescription>
        </DialogHeader>

        <FeriadoNovoForm />
      </DialogContent>
    </Dialog>
  )
}
