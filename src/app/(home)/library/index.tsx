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
  console.log(decks)

  return (
    <View className="w-full h-full">
      <ScrollView>
        <View className="h-32" />
        <View className="flex items-center gap-3 mt-6 px-6">
          {/* Map over all the decks */}
          {decks?.map((deck) => (
            <Button
              onPress={() => router.navigate(`/deck/${deck.deck_name}`)}
              key={deck.deck_name}
              className="xl:w-[50%] w-full p-12 bg-card border border-card-foreground border-dashed shadow-md items-start"
            >
              <Text className="text-primary mt-5 !text-xl font-interblack">{deck.deck_name}</Text>
              <Text className="text-muted-foreground mb-5 !text-sm">{deck.description}</Text>
            </Button>
          ))}
        </View>
      </ScrollView>
      <View className="absolute top-0 w-full z-10 bg-background/95 items-center pt-12 pb-6">
        <Text className="xl:text-5xl text-3xl font-interblack">Library</Text>
      </View>
    </View>
  )
}
