import { Text } from "@/components/ui/text"
import React from "react"
import { View } from "react-native"

import { MoonStar } from "@/lib/icons/MoonStar"
import { Button } from "@/components/ui/button"
import { router } from "expo-router"

export default function Library() {
  return (
    <View className="items-center justify-center w-full h-full">
      <Text className="text-3xl font-interblack">Library</Text>
      <MoonStar className="text-5xl" color="gray" size={48} />
      <Button onPress={() => router.navigate("/test-deck")} className="mt-4">
        <Text>Go to Deck 1</Text>
      </Button>
    </View>
  )
}
