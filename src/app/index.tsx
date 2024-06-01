import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useGlobalContext } from "@/context/GlobalContext"
import { Redirect, router } from "expo-router"
import { Platform, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Svg, { LinearGradient, Text as SVGText, Defs, Stop, TSpan } from "react-native-svg"

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
        <View className="items-center justify-center w-full h-full px-4 -mt-24">
          <View className="flex-row flex-wrap justify-center">
            <Text className="text-4xl text-center font-intermedium mt-12">Welcome to</Text>
          </View>
          <Svg
            height="80"
            width="400"
            viewBox="0 0 400 90"
            // style={{ backgroundColor: "red" }}
          >
            <Defs>
              <LinearGradient
                id="greenGradient"
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <Stop stopColor="#34D399" offset="25%" />
                <Stop stopColor="#0fa976" offset="45%" />
              </LinearGradient>
              <LinearGradient
                id="orangeGradient"
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <Stop stopColor="#F59E0B" offset="50%" />
                <Stop stopColor="#F97316" offset="75%" />
              </LinearGradient>
            </Defs>
            <SVGText x="18" y="72" fontSize="80" fontWeight="bold" fill="url(#greenGradient)">
              Quiz
            </SVGText>
            <SVGText x="180" y="72" fontSize="80" fontWeight="bold" fill="url(#orangeGradient)">
              modo
            </SVGText>
          </Svg>
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
