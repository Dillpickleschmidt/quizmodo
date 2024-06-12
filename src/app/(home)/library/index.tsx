import { ScrollView, View } from "react-native"
import { Text } from "@/components/ui/text"

import { Button } from "@/components/ui/button"
import { router } from "expo-router"

export default function index() {
  const decks = [
    {
      id: 1,
      name: "Deck 1",
      description: "This is a deck of cards",
    },
    {
      id: 2,
      name: "Deck 2",
      description: "This is another deck of cards",
    },
    {
      id: 3,
      name: "Deck 3",
      description: "This is another deck of cards",
    },
    {
      id: 4,
      name: "Deck 4",
      description: "This is another deck of cards",
    },
    {
      id: 5,
      name: "Deck 5",
      description: "This is another deck of cards",
    },
    {
      id: 6,
      name: "Deck 6",
      description: "This is another deck of cards",
    },
    {
      id: 7,
      name: "Deck 7",
      description: "This is another deck of cards",
    },
  ]

  return (
    <View className="w-full h-full">
      <View className="h-28" />
      <ScrollView>
        <View className="flex items-center gap-3 mt-6 px-6">
          {/* Map over all the decks */}
          {decks.map((deck) => (
            <Button
              onPress={() => router.navigate(`/deck/${deck.id}`)}
              key={deck.id}
              className="xl:w-[50%] w-full p-12 bg-card border border-card-foreground border-dashed shadow-md items-start"
            >
              <Text className="text-primary mt-5 !text-xl font-interblack">{deck.name}</Text>
              <Text className="text-muted-foreground mb-5 !text-sm">{deck.description}</Text>
            </Button>
          ))}
        </View>
      </ScrollView>
      <View className="absolute top-0 w-full z-10 bg-background/95 items-center pt-12 pb-6">
        <Text className="xl:text-5xl text-3xl font-interblack">Library</Text>
      </View>
    </View>
  )
}
