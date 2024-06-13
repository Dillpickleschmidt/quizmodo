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

type MissingDeckNameAlertProps = {
  showMissingDeckNameError: boolean
  setShowMissingDeckNameError: (show: boolean) => void
}

export default function MissingDeckNameAlert({
  showMissingDeckNameError,
  setShowMissingDeckNameError,
}: MissingDeckNameAlertProps) {
  const closeMissingDeckNameError = () => {
    setShowMissingDeckNameError(false)
  }

  return (
    <AlertDialog open={showMissingDeckNameError} onOpenChange={closeMissingDeckNameError}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center !text-3xl text-red-500">
            Deck name is required!
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onPress={closeMissingDeckNameError}>
              <Text>OK</Text>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
