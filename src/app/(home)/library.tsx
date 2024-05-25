import { View } from "react-native"
import { Text } from "@/components/ui/text"

import { Button } from "@/components/ui/button"
import { router } from "expo-router"

export default function index() {
  return (
    <View className="justify-center w-full h-full px-4">
      {/* Eventually, fetch the list of decks from the user and use a */}
      {/* map function to create a button for each deck */}
      <View className="items-center">
        <Text className="text-3xl font-interblack">Library</Text>
      </View>
      <Button onPress={() => router.navigate("/1")} className="mt-6">
        <Text>Go to Deck 1</Text>
      </Button>
      <Button onPress={() => router.navigate("/2")} className="mt-4">
        <Text>Go to Deck 2</Text>
      </Button>
      <Button onPress={() => router.navigate("/3")} className="mt-4">
        <Text>Go to Deck 3</Text>
      </Button>
    </View>
  )
}
