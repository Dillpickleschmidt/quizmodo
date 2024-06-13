import { Pressable, ScrollView, View } from "react-native"
import { useState } from "react"
import { Text } from "@/components/ui/text"
import AddCard from "@/components/deck/AddCard"
import { Button } from "@/components/ui/button"
import { CustomIcon } from "@/components/homeRoute/CustomIcon"
import { Ionicons } from "@expo/vector-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUser, createDeck, createEntries, createCategories } from "@/lib/supabase/supabaseHooks"
import CreateDeckErrorAlert from "./components/CreateDeckErrorAlert"
import { DeckHeader } from "./components/DeckHeader"
import MissingDeckNameAlert from "./components/MissingDeckNameAlert"
import { router } from "expo-router"
import { addNewCard, updateCardTerm, updateCardCategory } from "./components/cardHelpers"
import { CardData } from "./components/cardData"

const defaultCategory = "Answer"

export default function CreatePage() {
  // State Management
  const [deckName, setDeckName] = useState<string>("")
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([defaultCategory])
  const [showCreateDeckError, setShowCreateDeckError] = useState(false)
  const [showMissingDeckNameError, setShowMissingDeckNameError] = useState(false)
  const [cards, setCards] = useState<CardData[]>([
    {
      term: "",
      mnemonic: "",
      categories: Object.fromEntries(uniqueCategories.map((category) => [category, ""])),
      order: 0,
    },
    {
      term: "",
      mnemonic: "",
      categories: Object.fromEntries(uniqueCategories.map((category) => [category, ""])),
      order: 1,
    },
  ])

  const queryClient = useQueryClient()

  // Event Handlers
  const handleAddNewCard = () => {
    setCards(addNewCard(cards, uniqueCategories))
  }

  const handleUpdateCardTerm = (index: number, value: string) => {
    setCards(updateCardTerm(cards, index, value))
  }

  const handleUpdateCardCategory = (index: number, category: string, value: string) => {
    setCards(updateCardCategory(cards, index, category, value))
  }

  const handleSaveDeck = () => {
    if (!deckName.trim()) {
      setShowMissingDeckNameError(true)
      return
    }
    if (userId) {
      createDeckMutation.mutate({ deck_name: deckName, user_id: userId })
    } else {
      console.log("User not found")
    }
  }

  // Query to get the user
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  })
  const userId = userQuery.data?.id

  // Mutations
  const createDeckMutation = useMutation({
    mutationFn: createDeck,
    onSuccess: async (data) => {
      console.log(`Deck ${deckName} created successfully`)
      const deckId = data[0].deck_id

      await createEntriesAndCategories(deckId)

      queryClient.setQueryData([deckName], data)
      queryClient.invalidateQueries({ queryKey: ["decks"] })
      router.push(`/deck/${deckName}`)
    },
    onError: () => {
      setShowCreateDeckError(true)
    },
  })

  async function createEntriesAndCategories(deckId: number) {
    try {
      const entries = cards.map((card) => ({
        deck_id: deckId,
        key: card.term,
        mnemonic: card.mnemonic,
      }))

      const entriesData = await createEntries(entries)

      for (const card of cards) {
        const entry = entriesData.find((e) => e.key === card.term)
        if (!entry) continue

        const entryId = entry.entry_id

        const categoriesToInsert = Object.entries(card.categories).map(([category, answers]) => ({
          entry_id: entryId,
          category,
          answers: answers.split(",").map((answer) => answer.trim()),
        }))

        await createCategories(categoriesToInsert)
      }
    } catch (error) {
      console.error("Error creating entries and categories:", error)
      setShowCreateDeckError(true)
    }
  }

  // Render Component
  return (
    <>
      {createDeckMutation.isError && (
        <CreateDeckErrorAlert
          createDeckMutationErrorMessage={createDeckMutation.error.message}
          showError={showCreateDeckError}
          setShowError={setShowCreateDeckError}
        />
      )}
      <MissingDeckNameAlert
        showMissingDeckNameError={showMissingDeckNameError}
        setShowMissingDeckNameError={setShowMissingDeckNameError}
      />
      <ScrollView>
        <View className="h-40"></View>
        {cards.map((card, index) => (
          <View key={index} className="w-full items-center px-4">
            <AddCard
              term={card.term}
              mnemonic={card.mnemonic}
              categories={card.categories}
              onTermChange={(text) => handleUpdateCardTerm(index, text)}
              onCategoryChange={(category, text) => handleUpdateCardCategory(index, category, text)}
            />
          </View>
        ))}
        <View className="h-20"></View>
      </ScrollView>
      <DeckHeader
        deckName={deckName}
        setDeckName={setDeckName}
        uniqueCategories={uniqueCategories}
        setUniqueCategories={setUniqueCategories}
        cards={cards}
        setCards={setCards}
      />
      <View className="absolute z-10 w-full bottom-0 flex items-end">
        <View className="mr-6">
          <Pressable onPress={handleAddNewCard}>
            <CustomIcon icon={<Ionicons name="add-circle" />} size={56} color="text-primary" />
          </Pressable>
        </View>
        <View className="w-full py-2 px-3 bg-background/70 h-18">
          <Button className="w-full bg-orange-500" onPress={handleSaveDeck}>
            <Text className="text-center">Save Deck</Text>
          </Button>
        </View>
      </View>
    </>
  )
}
