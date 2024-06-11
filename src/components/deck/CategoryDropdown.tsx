import { View } from "react-native"
import { Text } from "@/components/ui/text"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Label } from "../ui/label"

type CategoryDropdownProps = {
  uniqueCategories: string[]
}

export default function CategoryDropdown({ uniqueCategories }: CategoryDropdownProps) {
  const [open, setOpen] = useState(false)

  function toggleCategory(category: string) {}

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(newVal) => {
        setOpen(newVal)
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-24 !px-0">
          <Text className="!text-sm text-white">Categories</Text>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        // insets={contentInsets}
        className="w-56 bg-background"
      >
        {/* <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        {uniqueCategories.map((category) => (
          <DropdownMenuItem key={category}>
            <View className="flex flex-row gap-2 mx-1 my-2">
              <Label key={`${category}-label`} nativeID={category}>
                {category}
              </Label>
            </View>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
