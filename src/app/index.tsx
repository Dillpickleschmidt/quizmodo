import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useGlobalContext } from "@/context/GlobalContext"
import { Redirect, router } from "expo-router"
import { Platform, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext()

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/library" />
  }

  return (
    <SafeAreaView className="h-full bg-background">
      <ScrollView
        contentContainerStyle={{ height: "100%" }}
        overScrollMode={Platform.OS === "android" ? "always" : "auto"}
      >
        <View className="items-center justify-center w-full h-full px-4 -mt-12">
          <View className="flex-row flex-wrap justify-center mx-3">
            <View className="flex-row flex-wrap items-center">
              <Text className="text-4xl">Welcome</Text>
              <Text className="text-3xl"> to </Text>
              <Text className="text-6xl font-interbold text-emerald-500">Learn</Text>
              <Text className="text-6xl text-orange-500 font-interbold">Stack</Text>
            </View>
          </View>
          <View className="relative mt-2">
            <Text className="text-xl text-center">
              Memorize <Text className="text-xl font-interbolditalic">any</Text> subject!
            </Text>
          </View>
        </View>
        <View className="absolute items-center w-full px-8 bottom-44">
          <Button
            size="lg"
            onPress={() => {
              router.navigate("/auth/sign-up")
            }}
            className="w-full my-3 rounded-xl"
          >
            <Text className="!text-lg font-interblack text-emerald-600">Sign up</Text>
          </Button>
          <Button
            size="lg"
            onPress={() => {
              router.navigate("/auth/sign-in")
            }}
            className="w-full max-w-[600px] rounded-xl"
          >
            <Text className="!text-base font-interblack flex-row">Log in</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
