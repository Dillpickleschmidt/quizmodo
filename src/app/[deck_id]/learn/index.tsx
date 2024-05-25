import { View } from "react-native"
import React from "react"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { useLocalSearchParams } from "expo-router"

export default function index() {
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>()
  console.log(deck_id)

  return (
    <View className="items-center justify-center w-full h-full">
      <Text className="text-3xl font-interblack">Deck {deck_id} Learning Page</Text>
      <Text className="text-2xl">This is where you'll practice</Text>
    </View>
  )
}
