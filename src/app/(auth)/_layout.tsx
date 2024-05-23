import { Text } from "@/components/ui/text"
import { Stack } from "expo-router"
import React from "react"
import { View } from "react-native"

export default function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="sign-up" options={{ headerShown: false }}></Stack.Screen>
      </Stack>
    </>
  )
}
