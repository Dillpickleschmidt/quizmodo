import { View, ScrollView } from "react-native"
import React from "react"
import { Text } from "@/components/ui/text"
import { router, useLocalSearchParams } from "expo-router"
import { Button } from "@/components/ui/button"
import StudyList from "@/components/deck/StudyList"
import { SafeAreaView } from "react-native-safe-area-context"
import { useQuery } from "@tanstack/react-query"
import { fetchDeckEntriesWithCategories, getUser } from "@/lib/supabase/supabaseHooks"
// import data from "@/test-data/test-data-2.json"

export default function DeckPage() {
  const { deck_name: deckName } = useLocalSearchParams<{ deck_name: string }>()

  // Get the user
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  })
  // if (userQuery.isSuccess) console.log(userQuery.data?.id)
  const userId = userQuery.data?.id

  // Get all entries + answer categories matching the deck id
  const deckQuery = useQuery({
    queryKey: [deckName, userId],
    queryFn: () => fetchDeckEntriesWithCategories(deckName!, userId!),
    enabled: !!userId,
  })
  const data = deckQuery.data?.entries

  return (
    <SafeAreaView>
      {/* Use ! for overriding "undefined type" warning */}
      <View className="h-full">
        {deckQuery.isLoading ? (
          <View className="h-full justify-center items-center">
            <Text>Loading...</Text>
          </View>
        ) : deckQuery.isError ? (
          <View className="h-full justify-center items-center">
            <Text>Error: {deckQuery.error.message}</Text>
          </View>
        ) : (
          <ScrollView className="px-6">
            <View className="h-28" />
            {data && <StudyList data={data} />}
            <View className="h-14" />
          </ScrollView>
        )}
      </View>
      <View className="absolute top-0 z-10 w-full bg-background/95 items-center pt-16 pb-8">
        <Text className="xl:text-5xl text-3xl font-interblack">{`${deckName} Cards`}</Text>
      </View>
      <View className="absolute bottom-0 z-10 w-full">
        <View className="w-full py-2 px-3 bg-background/70 h-18">
          <Button onPress={() => router.navigate("./learn")} className="min-w-full bg-orange-500">
            <Text>Start Learning!</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
