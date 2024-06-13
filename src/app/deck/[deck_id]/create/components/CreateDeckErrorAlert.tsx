import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useState } from "react"

type CreateDeckErrorAlertProps = {
  createDeckMutationErrorMessage: string
  showError: boolean
  setShowError: (showError: boolean) => void
}

export default function CreateDeckErrorAlert({
  createDeckMutationErrorMessage,
  showError,
  setShowError,
}: CreateDeckErrorAlertProps) {
  const closeError = () => {
    setShowError(false)
  }
  return (
    <AlertDialog open={showError} onOpenChange={closeError}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-red-500">
            Error: {createDeckMutationErrorMessage}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onPress={closeError}>
              <Text>OK</Text>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
