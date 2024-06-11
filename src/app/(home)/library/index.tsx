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
  ]

  return (
    <View className="justify-center w-full h-full">
      {/* Eventually, fetch the list of decks from the user and use a */}
      {/* map function to create a button for each deck */}
      <View className="items-center mt-24 mb-12">
        <Text className="xl:text-5xl text-3xl font-interblack">Library</Text>
      </View>
      <ScrollView>
        <View className="flex items-center gap-3 mt-6 px-6">
          {/* Map over all the decks */}
          {decks.map((deck) => (
            <Button
              onPress={() => router.navigate(`/${deck.id}`)}
              key={deck.id}
              className="xl:w-[50%] w-full !min-h-48 bg-card border-2 border-black shadow-md"
            >
              <Text className="text-primary">{deck.name}</Text>
            </Button>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
