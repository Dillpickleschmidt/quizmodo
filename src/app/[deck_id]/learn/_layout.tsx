import { View } from "react-native"
import React from "react"
import { Slot } from "expo-router"
import { LearningModeContextProvider } from "@/context/LearningModeContext"
import { SafeAreaView } from "react-native-safe-area-context"

export default function layout() {
  return (
    <LearningModeContextProvider>
      <SafeAreaView>
        <Slot />
      </SafeAreaView>
    </LearningModeContextProvider>
  )
}
