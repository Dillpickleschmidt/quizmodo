import { View, StyleSheet, ScrollView } from "react-native"
import React from "react"
import { Text } from "@/components/ui/text"
import { router, useLocalSearchParams } from "expo-router"
import { Button } from "@/components/ui/button"
import StudyList from "@/components/deck/StudyList"
import { SafeAreaView } from "react-native-safe-area-context"

export default function DeckPage() {
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Use ! for overriding "undefined type" warning */}
        <StudyList deck_id={deck_id!} />
      </ScrollView>
      <View className="fixed bottom-0 max-w-[600px] px-4 py-4">
        <Button onPress={() => router.navigate("./learn")} className="min-w-full bg-orange-500">
          <Text>Start Learning!</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "--background--",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#d3ad7f",
    marginBottom: 20,
    textAlign: "center",
  },
})
