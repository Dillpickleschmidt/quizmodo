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
import { useMemo, useState } from "react"
import { Button } from "~/components/ui/button"
import { CardObject } from "@/types"
import { useLearningModeContext } from "@/context/LearningModeContext"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

type CategoryDropdownProps = {
  uniqueCategories: string[]
}

export default function CategoryDropdown({ uniqueCategories }: CategoryDropdownProps) {
  const { enabledAnswerCategories, setEnabledAnswerCategories, hasUserAnswered } =
    useLearningModeContext()

  const [open, setOpen] = useState(false)

  function toggleCategory(category: string) {
    let newEnabledCategories = [...enabledAnswerCategories]
    if (enabledAnswerCategories.includes(category)) {
      // Set enabledAnswerCategories to all categories except the one that was toggled
      newEnabledCategories = enabledAnswerCategories.filter((c) => c !== category)
      setEnabledAnswerCategories(newEnabledCategories)
    } else {
      // Add the category to enabledAnswerCategories
      newEnabledCategories = [...enabledAnswerCategories, category]
      setEnabledAnswerCategories(newEnabledCategories)
    }
    // console.log("Enabled categories: ", newEnabledCategories)
  }

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(newVal) => {
        setOpen(newVal)
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-24 !px-0">
          <Text className={`!text-sm ${!hasUserAnswered ? "text-orange-500" : "text-white"}`}>
            Categories
          </Text>
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
              <View className="w-6 h-6">
                <Checkbox
                  key={category}
                  checked={enabledAnswerCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
              </View>
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
