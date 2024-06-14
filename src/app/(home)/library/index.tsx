import { ScrollView, View, Pressable } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { router } from "expo-router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteDeck, getDecks, getUser } from "@/lib/supabase/supabaseHooks"
import SwipeableItem, { useSwipeableItemParams } from "react-native-swipeable-item"
import { CustomIcon } from "@/components/homeRoute/CustomIcon"
import { Trash2 } from "@/lib/icons/Trash2"

const UnderlayLeft = ({ onDelete }: { onDelete: () => void }) => {
  const { close } = useSwipeableItemParams()
  return (
    <View className="!ml-12 flex-1 items-end justify-center rounded-lg border border-background bg-red-500 pr-[1.31rem]">
      <Pressable
        onPress={() => {
          onDelete()
          close()
        }}
        className="pt-6"
      >
        <CustomIcon icon={<Trash2 />} size={24} color="text-primary-foreground" />
      </Pressable>
    </View>
  )
}

export default function Index() {
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

  const queryClient = useQueryClient()

  const deleteDeckMutation = useMutation({
    mutationFn: deleteDeck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] })
      console.log("Deck deleted")
    },
  })

  function handleDeleteDeck(deckName: string) {
    if (deckName && userId) {
      deleteDeckMutation.mutate({ deck_name: deckName, user_id: userId })
    } else {
      console.error("Deck name or user ID is missing")
    }
  }

  return (
    <View className="h-full w-full">
      <ScrollView>
        <View className="h-32" />
        {/* Map over all the decks */}
        {decks?.map((deck) => (
          <View key={deck.deck_name} className="mr-6 mt-6 overflow-hidden rounded-md pl-6">
            <SwipeableItem
              item={deck}
              renderUnderlayLeft={() => (
                <UnderlayLeft onDelete={() => handleDeleteDeck(deck.deck_name)} />
              )}
              snapPointsLeft={[60]}
            >
              <Pressable
                onPress={() => router.navigate(`/deck/${deck.deck_name}`)}
                className="min-w-full items-start rounded-md border border-dashed border-card-foreground bg-card px-12 shadow-md xl:w-[50%]"
              >
                <View>
                  <Text className="mt-5 font-interblack !text-xl text-primary">
                    {deck.deck_name}
                  </Text>
                  <Text className="mb-5 !text-sm text-muted-foreground">{deck.description}</Text>
                </View>
              </Pressable>
            </SwipeableItem>
          </View>
        ))}
      </ScrollView>
      <View className="absolute top-0 z-10 w-full items-center bg-background/95 pb-6 pt-12">
        <Text className="font-interblack text-3xl xl:text-5xl">Library</Text>
      </View>
    </View>
  )
}
