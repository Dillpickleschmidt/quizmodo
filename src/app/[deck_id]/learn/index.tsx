import { View } from "react-native"
import React, { useEffect } from "react"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { useLocalSearchParams } from "expo-router"
import MultipleChoice from "@/components/learning-mode/multiple-choice/MultipleChoice"
import { useLearningModeContext } from "@/context/LearningModeContext"

export default function index() {
  const { correctKey } = useLearningModeContext()

  const { deck_id } = useLocalSearchParams<{ deck_id: string }>()
  useEffect(() => {
    console.log(deck_id)
  }, [])

  return (
    <View className="items-center justify-center w-full h-full">
      <Text className="text-3xl font-interblack">Deck {deck_id} Learning Page</Text>
      <Text className="text-xl">This is where you'll practice</Text>
      <Text className="mt-12 text-2xl font-intersemibold">{correctKey}</Text>
      <MultipleChoice />
    </View>
  )
}
