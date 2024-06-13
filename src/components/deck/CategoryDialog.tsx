import React, { useState, useRef } from "react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Text } from "~/components/ui/text"
import { View, FlatList } from "react-native"
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

type CategoryDialogProps = {
  uniqueCategories: string[]
  onAddCategory: (newCategory: string) => void
  onRemoveCategory: (category: string) => void
  onResetCategories: () => void
  children: React.ReactNode
}

export default function CategoryDialog({
  uniqueCategories,
  onAddCategory,
  onRemoveCategory,
  onResetCategories,
  children,
}: CategoryDialogProps) {
  const [newCategory, setNewCategory] = useState("")
  const [showWarning, setShowWarning] = useState(false)

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      onAddCategory(newCategory.trim())
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    if (uniqueCategories.length <= 1) {
      setShowWarning(true)
    } else {
      onRemoveCategory(category)
    }
  }

  const closeWarning = () => {
    setShowWarning(false)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="h-[400px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
            <DialogDescription>Add or remove answer categories for your cards.</DialogDescription>
          </DialogHeader>
          <View className="py-4">
            <Input value={newCategory} onChangeText={setNewCategory} placeholder="New Category" />
          </View>
          <FlatList
            data={uniqueCategories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View className="flex flex-row items-center justify-between p-2">
                <Text>{item}</Text>
                <Button variant="outline" onPress={() => handleRemoveCategory(item)}>
                  <Text>Remove</Text>
                </Button>
              </View>
            )}
          />
          <DialogFooter>
            <View className="relative mb-2 flex w-full flex-row justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <Text>Reset</Text>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Categories</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to reset categories? This will remove all categories and
                      add 'Answer'.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button>
                        <Text className="text-primary">Cancel</Text>
                      </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button onPress={onResetCategories} className="bg-destructive">
                        <Text className="font-interbold text-white">Reset</Text>
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onPress={handleAddCategory} className="mr-2 w-3/4">
                <Text>Add</Text>
              </Button>
            </View>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showWarning} onOpenChange={closeWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-red-500">
              There must be at least one category.
            </AlertDialogTitle>
            {/* <AlertDialogDescription className="text-red-500">
              There must be at least one category.
            </AlertDialogDescription> */}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button onPress={closeWarning}>
                <Text>OK</Text>
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
