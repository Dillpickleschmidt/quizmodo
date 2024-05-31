import { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { useLocalSearchParams } from "expo-router"
import { useLearningModeContext } from "@/context/LearningModeContext"
import data from "@/test-data/test-data-2.json"
import CardHandler from "@/components/learning-mode/CardHandler"
import useDeckSplit from "@/components/learning-mode/useDeckSplit"
import CategoryDropdown from "@/components/learning-mode/CategoryDropdown"
import { handleNextQuestion } from "@/components/learning-mode/cardHandlers"
import { JSONWithCardStyle } from "@/types"

function logCardCounts(activeCards: JSONWithCardStyle, inactiveCards: JSONWithCardStyle) {
  console.log("Active cards count: ", Object.keys(activeCards).length)
  console.log("Inactive cards count: ", Object.keys(inactiveCards).length)
}

function setBackgroundColor(isCorrect: boolean, hasUserAnswered: boolean) {
  return hasUserAnswered ? (isCorrect ? "bg-green-500" : "bg-red-500") : ""
}

function extractUniqueCategories(data: any): string[] {
  const categories = new Set<string>()
  Object.values(data).forEach((value: any) => {
    value.answerCategories.forEach((category: { category: string }) => {
      categories.add(category.category)
    })
  })
  return Array.from(categories)
}

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

  const [activeCards, setActiveCards] = useState(slicedData)
  const [inactiveCards, setInactiveCards] = useState(remainingData)

  useEffect(() => {
    console.log("Now practicing deck " + deck_id)
  }, [deck_id])

  const uniqueCategories = useMemo(() => extractUniqueCategories(data), [data])

  useEffect(() => {
    setEnabledAnswerCategories(uniqueCategories)
  }, [uniqueCategories])

  useEffect(() => {
    logCardCounts(activeCards, inactiveCards)
    console.log("Current card index: ", currentCardIndex)
  }, [activeCards, inactiveCards, currentCardIndex])

  return (
    <View
      className={`${setBackgroundColor(isAnswerCorrect, hasUserAnswered)} items-center justify-center w-full h-full`}
    >
      <View className="w-full px-6 translate-y-12">
        <Text className="text-3xl font-interblack">Deck {deck_id} Learning Page</Text>
        <Text className="text-xl">This is where you'll practice</Text>
        <View className="w-56 mt-4">
          <CategoryDropdown uniqueCategories={uniqueCategories} />
        </View>
        <Text className="mt-12 text-2xl font-intersemibold">{correctEntry?.key}</Text>
        <CardHandler data={activeCards} />
      </View>
      {hasUserAnswered && (
        <Button
          size="lg"
          onPress={() =>
            handleNextQuestion(
              isAnswerCorrect,
              activeCards,
              inactiveCards,
              currentCardIndex,
              setCurrentCardIndex,
              setIsAnswerCorrect,
              setHasUserAnswered,
              setActiveCards,
              setInactiveCards,
            )
          }
          className="absolute bottom-12"
        >
          <Text>Next Question {"->"}</Text>
        </Button>
      )}
    </View>
  )
}
