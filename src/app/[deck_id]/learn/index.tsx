import { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { useLocalSearchParams } from "expo-router"
import { useLearningModeContext } from "@/context/LearningModeContext"
import data from "@/test-data/test-data-2.json"
import CardHandler from "@/components/learning-mode/CardHandler"
import useDeckSplit from "@/components/learning-mode/useDeckSplit"
import { JSONWithCardStyle } from "@/types"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import CategoryDropdown from "@/components/learning-mode/CategoryDropdown"
import { Checkbox } from "@/components/ui/checkbox"

export default function LearningPage() {
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>()

  const {
    correctEntry,
    isAnswerCorrect,
    setIsAnswerCorrect,
    hasUserAnswered,
    setHasUserAnswered,
    setEnabledAnswerCategories,
    currentCardIndex,
    setCurrentCardIndex,
  } = useLearningModeContext()
  const { slicedData, remainingData } = useMemo(() => useDeckSplit(data), [data])

  const [activeCards, setActiveCards] = useState(slicedData) // This is the subset of data that the user is currently practicing
  const [inactiveCards, setInactiveCards] = useState(remainingData)

  // Log the deck_id whenever it changes
  useEffect(() => {
    console.log("Now practicing deck " + deck_id)
  }, [deck_id])

  // Extract unique categories from data
  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>()
    Object.values(data).forEach((value) => {
      value.answerCategories.forEach((category: { category: string }) => {
        categories.add(category.category)
      })
    })
    // Return the unique categories
    return Array.from(categories)
  }, [data])

  // Set enabledAnswerCategories to all categories at the start
  useEffect(() => {
    setEnabledAnswerCategories(uniqueCategories)
  }, [uniqueCategories])

  useEffect(() => {
    logCardCounts(activeCards, inactiveCards)
    console.log("Current card index: ", currentCardIndex)
  }, [activeCards, inactiveCards, currentCardIndex])

  function handleNextQuestion(isAnswerCorrect: boolean) {
    console.log("Next question!")
    setHasUserAnswered(false)
    setIsAnswerCorrect(false)

    // If there are no more cards to practice, log a message and return
    if (Object.keys(activeCards).length === 0) {
      console.log("No more cards to practice!")
      return
    }

    // Get the cardStyle of the current active card
    const currentCardStyle = activeCards[Object.keys(activeCards)[currentCardIndex]].cardStyle

    // At the beginning, increment the current card index from 0 to 4
    if (currentCardIndex <= 3) {
      if (isAnswerCorrect) {
        if (currentCardStyle === "multiple-choice") {
          updateCardType("write")
        }
      } else {
        // if the user got it wrong, make it a multiple choice card
        updateCardType("multiple-choice")
      }
      incrementIndex()
      return
    }
    // Once the current card index reaches 4...
    if (isAnswerCorrect) {
      if (currentCardStyle === "write") {
        // if there are no inactive cards, increment the current card index
        if (Object.keys(inactiveCards).length === 0) {
          incrementIndex()
          return
        }
        removeAndAddNewCard()
      } else {
        cycleCards("write")
      }
    } else {
      cycleCards("multiple-choice")
    }
  }

  function cycleCards(cardType: "write" | "multiple-choice", localActiveCards = activeCards) {
    // use optional localActiveCards to avoid bad state updates where applicable
    updateCardType(cardType)

    // split into two arrays: one with the first card and one with the rest
    const [firstKey, ...remainingKeys] = Object.keys(localActiveCards)
    const firstCard = { ...localActiveCards[firstKey] }

    // remove the first card from the activeCards
    const updatedActiveCards = updateCards(remainingKeys, localActiveCards)
    // add the first card back to the updatedActiveCards
    updatedActiveCards[firstKey] = firstCard

    setActiveCards(updatedActiveCards)
  }

  function updateCardType(cardType: "write" | "multiple-choice") {
    // get the active card at currentCardIndex
    const currentCard = activeCards[Object.keys(activeCards)[currentCardIndex]]
    // update the cardStyle of the current card
    currentCard.cardStyle = cardType
  }

  function incrementIndex() {
    const newCardIndex = currentCardIndex + 1
    setCurrentCardIndex(newCardIndex)
  }

  function removeAndAddNewCard() {
    const [firstInactiveKey, ...remainingInactiveKeys] = Object.keys(inactiveCards)
    const updatedActiveCards: JSONWithCardStyle = { ...activeCards }

    // Define the type for newActiveCards
    const newActiveCards: JSONWithCardStyle = {}
    let index = 0

    // Add cards to the new object, replacing the current card with the new card
    for (const key in updatedActiveCards) {
      if (index === currentCardIndex) {
        newActiveCards[firstInactiveKey] = { ...inactiveCards[firstInactiveKey] }
      } else {
        newActiveCards[key] = updatedActiveCards[key]
      }
      index++
    }

    const updatedInactiveCards = updateCards(remainingInactiveKeys, inactiveCards)
    setInactiveCards(updatedInactiveCards)
    setActiveCards(newActiveCards)
    cycleCards("multiple-choice", newActiveCards)
  }

  // Helper function to update cards
  function updateCards(keys: string[], source: JSONWithCardStyle): JSONWithCardStyle {
    return keys.reduce((acc, key) => {
      acc[key] = source[key]
      return acc
    }, {} as JSONWithCardStyle)
  }

  // Helper function to log the number of active and inactive cards
  function logCardCounts(activeCards: JSONWithCardStyle, inactiveCards: JSONWithCardStyle) {
    console.log("Active cards count: ", Object.keys(activeCards).length)
    console.log("Inactive cards count: ", Object.keys(inactiveCards).length)
  }

  function setBackgroundColor(isCorrect: boolean) {
    return hasUserAnswered ? (isCorrect ? "bg-green-500" : "bg-red-500") : ""
  }

  return (
    <View
      className={`${setBackgroundColor(isAnswerCorrect)} items-center justify-center w-full h-full`}
    >
      <View className="w-full px-6 translate-y-12">
        <Text className="text-3xl font-interblack">Deck {deck_id} Learning Page</Text>
        <Text className="text-xl">This is where you'll practice</Text>
        {/* Add category buttons here */}
        <View className="w-56 mt-4">
          <CategoryDropdown uniqueCategories={uniqueCategories} />
        </View>
        <Text className="mt-12 text-2xl font-intersemibold">{correctEntry?.key}</Text>
        <CardHandler data={activeCards} />
      </View>
      {hasUserAnswered && (
        <Button
          size="lg"
          onPress={() => handleNextQuestion(isAnswerCorrect)}
          className="absolute bottom-12"
        >
          <Text>Next Question {"->"}</Text>
        </Button>
      )}
    </View>
  )
}
