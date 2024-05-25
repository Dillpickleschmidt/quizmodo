import { View } from "react-native"
import React from "react"
import { Text } from "@/components/ui/text"
import { Stack } from "expo-router"

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="decks/index" />
      <Stack.Screen name="decks/[deck_id]" />
    </Stack>
  )
}
