import { View } from "react-native"
import React from "react"
import { Text } from "@/components/ui/text"
import { router, useLocalSearchParams } from "expo-router"
import { Button } from "@/components/ui/button"
import QuizList from "@/components/deck/TestStudySet"

export default function DeckPage() {
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>()

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      {/* <Text style={{ fontSize: 24, fontWeight: "bold" }}>Deck {deck_id} Info</Text> */}
      <QuizList />
      <Button onPress={() => router.navigate("./learn")}>
        <Text>Start Learning!</Text>
      </Button>
    </View>
  )
}
