import { Link, router } from "expo-router"
import * as React from "react"
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

type AddDialogProps = {
  children: React.ReactNode
}

export default function AddDialog({ children }: AddDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <DialogDescription>This is where you'll add new items to your library.</DialogDescription>
        </DialogHeader>
        <Button variant="outline" className="shadow-md min-h-32" onPress={() => router.push("")}>
          <Text className="text-primary">Create Folder</Text>
        </Button>
        <DialogClose asChild>
          <Button
            variant="outline"
            className="shadow-md min-h-32"
            onPress={() => router.push("/deck/new/create")}
          >
            <Text className="text-primary">Create New Set</Text>
          </Button>
        </DialogClose>
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
