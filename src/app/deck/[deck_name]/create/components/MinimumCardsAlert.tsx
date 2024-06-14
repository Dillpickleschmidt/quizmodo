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

type MinimumCardsAlertProps = {
  showMinimumCardsError: boolean
  setShowMinimumCardsError: (show: boolean) => void
}

export default function MinimumCardsAlert({
  showMinimumCardsError,
  setShowMinimumCardsError,
}: MinimumCardsAlertProps) {
  const closeMinimumCardsError = () => {
    setShowMinimumCardsError(false)
  }

  return (
    <AlertDialog open={showMinimumCardsError} onOpenChange={closeMinimumCardsError}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mx-6 my-6 text-center !text-2xl text-red-500">
            Minimum 4 cards required!
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onPress={closeMinimumCardsError}>
              <Text>OK</Text>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
