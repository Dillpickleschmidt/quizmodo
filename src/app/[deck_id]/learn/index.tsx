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

export default function LearningPage() {
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>()

  const { correctEntry, isAnswerCorrect, setIsAnswerCorrect, hasUserAnswered, setHasUserAnswered } =
    useLearningModeContext()
  const { slicedData, remainingData } = useMemo(() => useDeckSplit(data), [data])

  const [activeCards, setActiveCards] = useState(slicedData) // This is the subset of data that the user is currently practicing
  const [inactiveCards, setInactiveCards] = useState(remainingData)

  // Log the length of the slicedData and remainingData
  useEffect(() => {
    console.log("slicedData length: ", Object.keys(slicedData).length)
    console.log("remainingData length: ", Object.keys(remainingData).length)
  }, [slicedData, remainingData])

  // Log the deck_id whenever it changes
  useEffect(() => {
    console.log("Now practicing deck " + deck_id)
  }, [deck_id])

  function handleNextQuestion(isAnswerCorrect: boolean) {
    console.log("Next question!")
    setHasUserAnswered(false)
    setIsAnswerCorrect(false)

    // If there are no more cards to practice, log a message and return
    if (Object.keys(activeCards).length === 0) {
      console.log("No more cards to practice!")
      return
    }

    // If there are no more inactive cards, handle active cards only
    if (Object.keys(inactiveCards).length === 0) {
      if (isAnswerCorrect) {
        removeCard()
      } else {
        cycleCards("multiple-choice")
      }
      return
    }

    // Get the cardStyle of the first card in the active cards
    const firstKeyStyle = activeCards[Object.keys(activeCards)[0]].cardStyle

    // Handle based on correctness and card type
    if (isAnswerCorrect) {
      if (firstKeyStyle === "write") {
        removeAndAddNewCard()
      } else {
        cycleCards("write")
      }
    } else {
      cycleCards("multiple-choice")
    }
  }

  function cycleCards(cardType: "write" | "multiple-choice") {
    const [firstKey, ...remainingKeys] = Object.keys(activeCards)
    const firstCard = { ...activeCards[firstKey], cardStyle: cardType }

    const updatedActiveCards = updateCards(remainingKeys, activeCards)
    updatedActiveCards[firstKey] = firstCard

    setActiveCards(updatedActiveCards)
    logCardCounts(updatedActiveCards, inactiveCards)
  }

  function removeCard() {
    const [, ...remainingKeys] = Object.keys(activeCards)
    const updatedActiveCards = updateCards(remainingKeys, activeCards)

    setActiveCards(updatedActiveCards)
    logCardCounts(updatedActiveCards, inactiveCards)
  }

  function removeAndAddNewCard() {
    const [firstKey, ...remainingKeys] = Object.keys(activeCards)
    const [inactiveFirstKey, ...remainingInactiveKeys] = Object.keys(inactiveCards)

    const firstInactiveCard = { ...inactiveCards[inactiveFirstKey] }
    const updatedActiveCards = updateCards(remainingKeys, activeCards)
    updatedActiveCards[inactiveFirstKey] = firstInactiveCard
    const updatedInactiveCards = updateCards(remainingInactiveKeys, inactiveCards)

    setActiveCards(updatedActiveCards)
    setInactiveCards(updatedInactiveCards)
    logCardCounts(updatedActiveCards, updatedInactiveCards)
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
