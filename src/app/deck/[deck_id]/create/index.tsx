import { Pressable, ScrollView, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Text } from "@/components/ui/text"
import AddCard from "@/components/deck/AddCard"
import { Button } from "@/components/ui/button"
import CategoryDialog from "@/components/deck/CategoryDialog"
import { CustomIcon } from "@/components/homeRoute/CustomIcon"
import { Ionicons } from "@expo/vector-icons"
import { Pickaxe } from "@/lib/icons/Pickaxe"
import { Input } from "@/components/ui/input"

type CardData = {
  term: string
  categories: { [key: string]: string }
}

const defaultCategory = "Answer"

export default function CreatePage() {
  const [deckName, setDeckName] = useState<string>("")
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([defaultCategory])

  // Initialize the state with two empty card objects
  const [cards, setCards] = useState<CardData[]>([
    {
      term: "",
      categories: Object.fromEntries(uniqueCategories.map((category) => [category, ""])),
    },
    {
      term: "",
      categories: Object.fromEntries(uniqueCategories.map((category) => [category, ""])),
    },
  ])

  // Function to add a new card
  const addNewCard = () => {
    // Add a new empty card object to the list
    setCards([
      ...cards,
      {
        term: "",
        categories: Object.fromEntries(uniqueCategories.map((category) => [category, ""])),
      },
    ])
  }

  // Function to update card data
  const updateCardTerm = (index: number, value: string) => {
    const newCards = cards.map((card, i) => (i === index ? { ...card, term: value } : card))
    setCards(newCards)
  }

  const updateCardCategory = (index: number, category: string, value: string) => {
    const newCards = cards.map((card, i) =>
      i === index ? { ...card, categories: { ...card.categories, [category]: value } } : card,
    )
    setCards(newCards)
  }

  const addCategory = (newCategory: string) => {
    setUniqueCategories([...uniqueCategories, newCategory])
    setCards(
      cards.map((card) => ({
        ...card,
        categories: { ...card.categories, [newCategory]: "" },
      })),
    )
  }

  const removeCategory = (category: string) => {
    setUniqueCategories(uniqueCategories.filter((c) => c !== category))
    setCards(
      cards.map((card) => {
        const { [category]: _, ...newCategories } = card.categories
        return { ...card, categories: newCategories }
      }),
    )
  }

  const resetCategories = () => {
    const answerCategoryExists = uniqueCategories.includes(defaultCategory)
    // Keep only the default category and remove all others
    const updatedCards = cards.map((card) => {
      const newCategories = answerCategoryExists
        ? { [defaultCategory]: card.categories[defaultCategory] }
        : { [defaultCategory]: "" }
      return { ...card, categories: newCategories }
    })
    setUniqueCategories([defaultCategory])
    setCards(updatedCards)
  }

  const handleDeckNameChange = (name: string) => {
    setDeckName(name.trim())
  }

  return (
    <>
      <ScrollView>
        <View className="h-40"></View>
        {cards.map((card, index) => (
          <View key={index} className="w-full items-center px-4">
            <AddCard
              term={card.term}
              categories={card.categories}
              onTermChange={(text) => updateCardTerm(index, text)}
              onCategoryChange={(category, text) => updateCardCategory(index, category, text)}
            />
          </View>
        ))}
        <View className="h-20"></View>
      </ScrollView>
      <View className="absolute z-10 w-full bg-background/95 pt-20 pb-8 flex justify-between items-center">
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
      <View className="absolute z-10 w-full bottom-0 flex items-end">
        <View className="mr-6">
          <Pressable onPress={addNewCard}>
            <CustomIcon icon={<Ionicons name="add-circle" />} size={56} color="text-primary" />
          </Pressable>
        </View>
        <View className="w-full py-2 px-3 bg-background/70 h-18">
          <Button
            className="w-full bg-orange-500"
            onPress={() => console.log("Save deck", deckName, cards)}
          >
            <Text className="text-center">Save Deck</Text>
          </Button>
        </View>
      </View>
    </>
  )
}
