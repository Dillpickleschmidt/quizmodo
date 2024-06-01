import { View } from "react-native"
import React from "react"
import { Slot } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function layout() {
  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  )
}
