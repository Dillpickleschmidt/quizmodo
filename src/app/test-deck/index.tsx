import { View } from "react-native"
import React from "react"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

export default function index() {
  return (
    <View className="items-center justify-center w-full h-full">
      <Text className="text-3xl font-interblack">Test Deck Page</Text>
      <View className="justify-center my-6 border-t-2 border-b-2 min-h-96 border-primary">
        <Text>List your json data here!</Text>
      </View>
      <Button>
        <Text>Start Learning!</Text>
      </Button>
    </View>
  )
}
