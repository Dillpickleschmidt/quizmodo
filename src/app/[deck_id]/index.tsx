import { View } from "react-native"
import React from "react"
import { Text } from "@/components/ui/text"
import { router } from "expo-router"
import { Button } from "@/components/ui/button"
import { useLocalSearchParams } from "expo-router"

export default function DeckPage() {
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>()

  return (
    <View className="items-center justify-center w-full h-full">
      <Text className="text-3xl font-interblack">Deck {deck_id} Info</Text>
      <View className="justify-center my-6 border-t-2 border-b-2 min-h-96 border-primary">
        {/* Get all the questions+answers the deck has and list them here */}
        <Text>List your deck's terms and answers here!</Text>
      </View>
      <Button onPress={() => router.navigate("./learn")}>
        <Text>Start Learning!</Text>
      </Button>
    </View>
  )
}
