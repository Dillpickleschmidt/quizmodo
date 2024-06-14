import { useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Text } from "~/components/ui/text"
import { View } from "react-native"
import { Input } from "../ui/input"
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
} from "~/components/ui/alert-dialog"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

type DeckSettingsDialogProps = {
  children: React.ReactNode
  shuffleInput: boolean
  setShuffleInput: (value: boolean) => void
}

export default function DeckSettingsDialog({
  children,
  shuffleInput,
  setShuffleInput,
}: DeckSettingsDialogProps) {
  const [checked, setChecked] = useState(true)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deck Settings</DialogTitle>
          <DialogDescription>Configure your deck settings here.</DialogDescription>
        </DialogHeader>
        <View className="flex h-[120px] w-[360px] flex-row">
          <Checkbox
            checked={checked}
            onCheckedChange={() => {
              setShuffleInput(!shuffleInput), setChecked(!shuffleInput)
            }}
          />
          <Label nativeID="shuffle" className="ml-2">
            Shuffle
          </Label>
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text>OK</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
