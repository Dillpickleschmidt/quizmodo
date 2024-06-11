import { ScrollView, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Text } from "@/components/ui/text"
import AddCard from "@/components/deck/AddCard"
import { Button } from "@/components/ui/button"

type CardData = {
  term: string
  definition: string
}

export default function CreatePage() {
  // Initialize the state with two empty card objects
  const [cards, setCards] = useState<CardData[]>([
    { term: "", definition: "" },
    { term: "", definition: "" },
  ])

  // Function to add a new card
  const addNewCard = () => {
    // Add a new empty card object to the list
    setCards([...cards, { term: "", definition: "" }])
  }

  // Function to update card data
  const updateCard = (index: number, field: keyof CardData, value: string) => {
    const newCards = cards.map((card, i) => (i === index ? { ...card, [field]: value } : card))
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
              definition={card.definition}
              onTermChange={(text) => updateCard(index, "term", text)}
              onDefinitionChange={(text) => updateCard(index, "definition", text)}
            />
          </View>
        ))}
      </ScrollView>
      <View className="absolute z-20 w-full bg-background/95 blur-2xl pt-20 pb-8">
        <Text className="text-center font-interbold text-4xl">Create Deck</Text>
      </View>
      <Button onPress={addNewCard} className="my-3 mx-4">
        <Text>Add New Card</Text>
      </Button>
    </>
  )
}
