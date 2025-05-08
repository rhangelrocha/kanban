import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
   
  export function Dialog( { ...props } ) {
    const [open, setOpen] = React.useState(props.open);

    return (
      <AlertDialog open={props.open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {(props.data && props.data.title) ?? 
            <>
              <AlertDialogTitle>{props.data.title}</AlertDialogTitle>
            </>
            }
            {(props.data && props.data.content) ?? 
            <>
              <AlertDialogDescription>
                {props.data.content}
              </AlertDialogDescription>
            </>
            }
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel asChild>Entendi</AlertDialogCancel>
            {(props.data && props.data.buttonConfirm) ?? 
              <>
                <AlertDialogAction>{props.data.buttonConfirm}</AlertDialogAction>
              </>
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }