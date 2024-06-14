import { View, Pressable } from "react-native"
import { useEffect, useState, useCallback } from "react"
import { Text } from "@/components/ui/text"
import Card from "@/components/deck/Card"
import { Button } from "@/components/ui/button"
import { CustomIcon } from "@/components/homeRoute/CustomIcon"
import { Ionicons } from "@expo/vector-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUser, createDeck, createEntries, createCategories } from "@/lib/supabase/supabaseHooks"
import CreateDeckErrorAlert from "./components/CreateDeckErrorAlert"
import { DeckHeader } from "./components/DeckHeader"
import MissingDeckNameAlert from "./components/MissingDeckNameAlert"
import MinimumCardsAlert from "./components/MinimumCardsAlert" // Import the new alert component
import { router } from "expo-router"
import { updateCardTerm, updateCardCategory } from "./components/cardHelpers"
import { CardData } from "./components/cardData"
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist"

const defaultCategory = "Answer"

export default function CreatePage() {
  // State Management
  const [deckName, setDeckName] = useState<string>("")
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([defaultCategory])
  const [showCreateDeckError, setShowCreateDeckError] = useState(false)
  const [showMissingDeckNameError, setShowMissingDeckNameError] = useState(false)
  const [showMinimumCardsError, setShowMinimumCardsError] = useState(false) // New state for minimum cards alert
  const defaultNumberOfCards = 4
  // Initialize cards with default number of cards
  const [cards, setCards] = useState<CardData[]>(
    Array.from({ length: defaultNumberOfCards }, (_, i) => ({
      term: "",
      mnemonic: "",
      categories: { [defaultCategory]: "" },
      order: i,
    })),
  )

  const queryClient = useQueryClient()

  // Event Handlers
  const handleAddNewCard = () => {
    setCards([
      ...cards,
      {
        term: "",
        mnemonic: "",
        categories: Object.fromEntries(uniqueCategories.map((category) => [category, ""])),
        order: cards.length,
      },
    ])
  }

  const handleUpdateCardTerm = (index: number, value: string) => {
    setCards(updateCardTerm(cards, index, value))
  }

  const handleUpdateCardCategory = (index: number, category: string, value: string) => {
    setCards(updateCardCategory(cards, index, category, value))
  }

  const handleDeleteCard = (index: number) => {
    if (cards.length <= 4) {
      setShowMinimumCardsError(true)
    } else {
      setCards(cards.filter((_, i) => i !== index))
    }
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

  const handleDragEnd = ({ data }: { data: CardData[] }) => {
    // Update the order property based on the new position
    const updatedCards = data.map((card, index) => ({
      ...card,
      order: index,
    }))
    setCards(updatedCards)
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
        order: card.order,
      }))
      console.log("Entries to create:", entries)

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

  // Log every time a card input changes
  // useEffect(() => {
  //   console.log(cards)
  // }, [cards])

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<CardData>) => {
      const index = cards.indexOf(item)
      return (
        <Card
          key={index}
          term={item.term}
          mnemonic={item.mnemonic}
          categories={item.categories}
          onTermChange={(text) => handleUpdateCardTerm(index, text)}
          onCategoryChange={(category, text) => handleUpdateCardCategory(index, category, text)}
          onDelete={() => handleDeleteCard(index)}
          isActive={isActive}
          drag={drag}
        />
      )
    },
    [cards],
  )

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
      <MinimumCardsAlert
        showMinimumCardsError={showMinimumCardsError}
        setShowMinimumCardsError={setShowMinimumCardsError}
      />
      <View>
        <DraggableFlatList
          data={cards}
          onDragEnd={handleDragEnd}
          keyExtractor={(item) => cards.indexOf(item).toString()}
          renderItem={renderItem}
          autoscrollThreshold={150} // Adjust this value as needed
          autoscrollSpeed={300} // Adjust this value as needed
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 160 }} // Adjust this value as needed
        />
      </View>
      <DeckHeader
        deckName={deckName}
        setDeckName={setDeckName}
        uniqueCategories={uniqueCategories}
        setUniqueCategories={setUniqueCategories}
        cards={cards}
        setCards={setCards}
      />
      <View className="absolute bottom-0 z-10 flex w-full items-end">
        <View className="mr-6">
          <Pressable onPress={handleAddNewCard}>
            <CustomIcon icon={<Ionicons name="add-circle" />} size={56} color="text-primary" />
          </Pressable>
        </View>
        <View className="h-18 w-full bg-background/70 px-3 py-2">
          <Button className="w-full bg-emerald-500" onPress={handleSaveDeck}>
            <Text className="text-center">Save Deck</Text>
          </Button>
        </View>
      </View>
    </>
  )
}
