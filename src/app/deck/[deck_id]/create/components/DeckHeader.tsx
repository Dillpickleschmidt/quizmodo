import CategoryDialog from "@/components/deck/CategoryDialog"
import { CustomIcon } from "@/components/homeRoute/CustomIcon"
import { Input } from "@/components/ui/input"
import { Pressable, View } from "react-native"
import { Pickaxe } from "@/lib/icons/Pickaxe"

type DeckHeaderProps = {
  deckName: string
  handleDeckNameChange: (name: string) => void
  uniqueCategories: string[]
  addCategory: (newCategory: string) => void
  removeCategory: (category: string) => void
  resetCategories: () => void
}

export function DeckHeader({
  deckName,
  handleDeckNameChange,
  uniqueCategories,
  addCategory,
  removeCategory,
  resetCategories,
}: DeckHeaderProps) {
  return (
    <View className="absolute top-0 z-10 w-full bg-background/95 pt-20 pb-8 flex justify-between items-center">
      <Input
        value={deckName}
        onChangeText={handleDeckNameChange}
        placeholder="[Deck Name]"
        className="bg-transparent text-center font-interbold !text-4xl w-full border-0"
      />
      <View className="absolute right-4 top-[4.5rem]">
        <CategoryDialog
          uniqueCategories={uniqueCategories}
          onAddCategory={addCategory}
          onRemoveCategory={removeCategory}
          onResetCategories={resetCategories}
        >
          <Pressable className="p-4">
            <CustomIcon icon={<Pickaxe />} size={28} color="text-primary" />
          </Pressable>
        </CategoryDialog>
      </View>
    </View>
  )
}
