import { Pressable, ScrollView, View } from "react-native"
import { useState } from "react"
import { Text } from "@/components/ui/text"
import AddCard from "@/components/deck/AddCard"
import { Button } from "@/components/ui/button"
import { CustomIcon } from "@/components/homeRoute/CustomIcon"
import { Ionicons } from "@expo/vector-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createDeck, getUser } from "@/lib/supabase/supabaseHooks"
import CreateDeckErrorAlert from "./components/CreateDeckErrorAlert"
import { DeckHeader } from "./components/DeckHeader"
import MissingDeckNameAlert from "./components/MissingDeckNameAlert"
import { router } from "expo-router"

type CardData = {
  term: string
  categories: { [key: string]: string }
}

const defaultCategory = "Answer"

export default function CreatePage() {
  const [deckName, setDeckName] = useState<string>("")
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([defaultCategory])
  const [showCreateDeckError, setShowCreateDeckError] = useState(false)
  const [showMissingDeckNameError, setShowMissingDeckNameError] = useState(false)

  // Initialize the cards state with two empty card objects
  const [cards, setCards] = useState<CardData[]>([
    {
      term: "",
      categories: Object.fromEntries(uniqueCategories.map((category) => [category, ""])),
    },
    {
      term: "",
      categories: Object.fromEntries(uniqueCategories.map((category) => [category, ""])),
    },
  ])

  // Function to add a new card
  const addNewCard = () => {
    // Add a new empty card object to the list
    setCards([
      ...cards,
      {
        term: "",
        categories: Object.fromEntries(uniqueCategories.map((category) => [category, ""])),
      },
    ])
  }

  // Function to update card data
  const updateCardTerm = (index: number, value: string) => {
    const newCards = cards.map((card, i) => (i === index ? { ...card, term: value } : card))
    setCards(newCards)
  }

  // Function to add a new category
  const addCategory = (newCategory: string) => {
    setUniqueCategories([...uniqueCategories, newCategory])
    setCards(
      cards.map((card) => ({
        ...card,
        categories: { ...card.categories, [newCategory]: "" },
      })),
    )
  }

  // Function to update card category data
  const updateCardCategory = (index: number, category: string, value: string) => {
    const newCards = cards.map((card, i) =>
      i === index ? { ...card, categories: { ...card.categories, [category]: value } } : card,
    )
    setCards(newCards)
  }

  // Function to remove a category
  const removeCategory = (category: string) => {
    setUniqueCategories(uniqueCategories.filter((c) => c !== category))
    setCards(
      cards.map((card) => {
        const { [category]: _, ...newCategories } = card.categories
        return { ...card, categories: newCategories }
      }),
    )
  }

  // Function to reset categories to default
  const resetCategories = () => {
    const answerCategoryExists = uniqueCategories.includes(defaultCategory)
    // Keep only the default category and remove all others
    const updatedCards = cards.map((card) => {
      const newCategories = answerCategoryExists
        ? { [defaultCategory]: card.categories[defaultCategory] }
        : { [defaultCategory]: "" }
      return { ...card, categories: newCategories }
    })
    setUniqueCategories([defaultCategory])
    setCards(updatedCards)
  }

  // Function to handle deck name change
  const handleDeckNameChange = (name: string) => {
    setDeckName(name.trim())
  }

  const queryClient = useQueryClient()

  // Get the user
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  })
  const userId = userQuery.data?.id

  // Function to create a new deck
  const createDeckMutation = useMutation({
    mutationFn: createDeck,
    onSuccess: (data) => {
      console.log(`Deck ${deckName} created successfully`)
      // Manually update the query cache with the new deck data (so you don't have to refetch it from the server)
      queryClient.setQueryData([deckName], data)
      // Invalidate the decks list query so it will refetch the updated list
      queryClient.invalidateQueries({ queryKey: ["decks"] })
      router.push(`/deck/${deckName}`)
    },
    onError: () => {
      setShowCreateDeckError(true)
    },
  })

  // Handle save deck button press
  function handleSaveDeck() {
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
              categories={card.categories}
              onTermChange={(text) => updateCardTerm(index, text)}
              onCategoryChange={(category, text) => updateCardCategory(index, category, text)}
            />
          </View>
        ))}
        <View className="h-20"></View>
      </ScrollView>
      <DeckHeader
        deckName={deckName}
        handleDeckNameChange={handleDeckNameChange}
        uniqueCategories={uniqueCategories}
        addCategory={addCategory}
        removeCategory={removeCategory}
        resetCategories={resetCategories}
      />
      <View className="absolute z-10 w-full bottom-0 flex items-end">
        <View className="mr-6">
          <Pressable onPress={addNewCard}>
            <CustomIcon icon={<Ionicons name="add-circle" />} size={56} color="text-primary" />
          </Pressable>
        </View>
        <View className="w-full py-2 px-3 bg-background/70 h-18">
          <Button
            className="w-full bg-orange-500"
            onPress={() => handleSaveDeck()}
            // disabled={createDeckMutation.isPending}
          >
            <Text className="text-center">Save Deck</Text>
          </Button>
        </View>
      </View>
    </>
  )
}
