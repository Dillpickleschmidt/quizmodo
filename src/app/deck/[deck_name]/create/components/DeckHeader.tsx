import { Dispatch, SetStateAction } from "react"
import CategoryDialog from "@/components/deck/CategoryDialog"
import { CustomIcon } from "@/components/homeRoute/CustomIcon"
import { Input } from "@/components/ui/input"
import { Pressable, View } from "react-native"
import { Pickaxe } from "@/lib/icons/Pickaxe"
import { addCategory, removeCategory, resetCategories } from "./cardHelpers"
import { CardData } from "./cardData"

type DeckHeaderProps = {
  deckName: string
  setDeckName: Dispatch<SetStateAction<string>>
  uniqueCategories: string[]
  setUniqueCategories: Dispatch<SetStateAction<string[]>>
  cards: CardData[]
  setCards: Dispatch<SetStateAction<CardData[]>>
}

export function DeckHeader({
  deckName,
  setDeckName,
  uniqueCategories,
  setUniqueCategories,
  cards,
  setCards,
}: DeckHeaderProps) {
  const handleDeckNameChange = (name: string) => {
    setDeckName(name.trim())
  }

  const handleAddCategory = (newCategory: string) => {
    const { cards: updatedCards, uniqueCategories: updatedCategories } = addCategory(
      cards,
      uniqueCategories,
      newCategory,
    )
    setCards(updatedCards)
    setUniqueCategories(updatedCategories)
  }

  const handleRemoveCategory = (category: string) => {
    const { cards: updatedCards, uniqueCategories: updatedCategories } = removeCategory(
      cards,
      uniqueCategories,
      category,
    )
    setCards(updatedCards)
    setUniqueCategories(updatedCategories)
  }

  const handleResetCategories = () => {
    const { cards: updatedCards, uniqueCategories: updatedCategories } = resetCategories(
      cards,
      uniqueCategories,
    )
    setCards(updatedCards)
    setUniqueCategories(updatedCategories)
  }

  return (
    <View className="absolute top-0 z-10 flex w-full items-center justify-between bg-background/95 pb-8 pt-20">
      <Input
        value={deckName}
        onChangeText={handleDeckNameChange}
        placeholder="[Deck Name]"
        className="w-full border-0 bg-transparent text-center font-interbold !text-4xl"
      />
      <View className="absolute right-4 top-[4.5rem]">
        <CategoryDialog
          uniqueCategories={uniqueCategories}
          onAddCategory={handleAddCategory}
          onRemoveCategory={handleRemoveCategory}
          onResetCategories={handleResetCategories}
        >
          <Pressable className="p-4">
            <CustomIcon icon={<Pickaxe />} size={28} color="text-primary" />
          </Pressable>
        </CategoryDialog>
      </View>
    </View>
  )
}
