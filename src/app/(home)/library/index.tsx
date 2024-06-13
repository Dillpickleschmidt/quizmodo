import { ScrollView, View } from "react-native"
import { Text } from "@/components/ui/text"

import { Button } from "@/components/ui/button"
import { router } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { getDecks, getUser } from "@/lib/supabase/supabaseHooks"

export default function index() {
  // Get the user
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  })
  const userId = userQuery.data?.id

  // Get the decks
  const decksQuery = useQuery({
    queryKey: ["decks"],
    queryFn: () => getDecks(userId!),
    enabled: !!userId,
  })
  const decks = decksQuery.data
  // console.log(decks)

  return (
    <View className="h-full w-full">
      <ScrollView>
        <View className="h-32" />
        <View className="mt-6 flex items-center gap-3 px-6">
          {/* Map over all the decks */}
          {decks?.map((deck) => (
            <Button
              onPress={() => router.navigate(`/deck/${deck.deck_name}`)}
              key={deck.deck_name}
              className="w-full items-start border border-dashed border-card-foreground bg-card p-12 shadow-md xl:w-[50%]"
            >
              <Text className="mt-5 font-interblack !text-xl text-primary">{deck.deck_name}</Text>
              <Text className="mb-5 !text-sm text-muted-foreground">{deck.description}</Text>
            </Button>
          ))}
        </View>
      </ScrollView>
      <View className="absolute top-0 z-10 w-full items-center bg-background/95 pb-6 pt-12">
        <Text className="font-interblack text-3xl xl:text-5xl">Library</Text>
      </View>
    </View>
  )
}
