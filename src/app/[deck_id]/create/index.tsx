import { ScrollView, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Text } from "@/components/ui/text"
import AddCard from "@/components/deck/AddCard"
import { Button } from "@/components/ui/button"
import CategoryDropdown from "@/components/deck/CategoryDropdown"

type CardData = {
  term: string
  categories: { [key: string]: string }
}

const uniqueCategories = ["category 1", "category 2"] // Define your categories here

export default function CreatePage() {
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

  // Log the state whenever it changes
  useEffect(() => {
    console.log("Cards state changed: ", cards)
  }, [cards])

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
      <View className="absolute z-10 w-full bg-background/95 pt-20 pb-8">
        <Text className="text-center font-interbold text-4xl">Create Deck</Text>
      </View>
      <View className="absolute z-10 w-full bottom-0 flex items-end">
        <View className="mb-1 mr-2">
          <CategoryDropdown uniqueCategories={uniqueCategories} />
        </View>
        <View className="w-full bg-background/90">
          <Button onPress={addNewCard} className="my-3 mx-4">
            <Text>Add New Card</Text>
          </Button>
        </View>
      </View>
    </>
  )
}
