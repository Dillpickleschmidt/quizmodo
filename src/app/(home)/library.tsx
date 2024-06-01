import { ScrollView, View } from "react-native"
import { Text } from "@/components/ui/text"

import { Button } from "@/components/ui/button"
import { router } from "expo-router"

export default function index() {
  return (
    <View className="justify-center w-full h-full">
      {/* Eventually, fetch the list of decks from the user and use a */}
      {/* map function to create a button for each deck */}
      <View className="items-center mt-24 mb-12">
        <Text className="xl:text-5xl text-3xl font-interblack">Library</Text>
      </View>
      <ScrollView>
        <View className="flex items-center gap-3 mt-6 px-6">
          <Button
            onPress={() => router.navigate("/1")}
            className="xl:w-[50%] w-full !min-h-48 bg-card border-2 border-black shadow-md"
          >
            <Text className="text-primary">Go to Deck 1</Text>
          </Button>
          <Button
            onPress={() => router.navigate("/2")}
            className="xl:w-[50%] w-full !min-h-48 bg-card border-2 border-black shadow-md"
          >
            <Text className="text-primary">Go to Deck 2</Text>
          </Button>
          <Button
            onPress={() => router.navigate("/3")}
            className="xl:w-[50%] w-full !min-h-48 bg-card border-2 border-black shadow-md"
          >
            <Text className="text-primary">Go to Deck 3</Text>
          </Button>
          <Button
            onPress={() => router.navigate("/1")}
            className="xl:w-[50%] w-full !min-h-48 bg-card border-2 border-black shadow-md"
          >
            <Text className="text-primary">Go to Deck 4</Text>
          </Button>
          <Button
            onPress={() => router.navigate("/2")}
            className="xl:w-[50%] w-full !min-h-48 bg-card border-2 border-black shadow-md"
          >
            <Text className="text-primary">Go to Deck 5</Text>
          </Button>
          <Button
            onPress={() => router.navigate("/3")}
            className="xl:w-[50%] w-full !min-h-48 bg-card border-2 border-black shadow-md"
          >
            <Text className="text-primary">Go to Deck 6</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}
