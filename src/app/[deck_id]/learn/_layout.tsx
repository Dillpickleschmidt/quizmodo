import { View } from "react-native"
import React from "react"
import { Slot } from "expo-router"
import { LearningModeContextProvider } from "@/context/LearningModeContext"

export default function layout() {
  return (
    <LearningModeContextProvider>
      <Slot />
    </LearningModeContextProvider>
  )
}
