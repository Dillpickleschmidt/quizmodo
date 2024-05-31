import { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { router, useLocalSearchParams } from "expo-router"
import { useLearningModeContext } from "@/context/LearningModeContext"
import data from "@/test-data/test-data-2.json"
import CardTypeSwitch from "@/components/learning-mode/CardTypeSwitch"
import useDeckSplit from "@/components/learning-mode/useDeckSplit"
import CategoryDropdown from "@/components/learning-mode/CategoryDropdown"
import { handleNextQuestion } from "@/components/learning-mode/cardHandlers"
import { CardObject } from "@/types"
import ReviewPage from "@/components/learning-mode/ReviewPage"

function logCardCounts(activeCards: CardObject, inactiveCards: CardObject) {
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
    isAnswerCorrect,
    hasUserAnswered,
    setHasUserAnswered,
    setEnabledAnswerCategories,
    currentCardIndex,
    setCurrentCardIndex,
  } = useLearningModeContext()

  const { slicedData, remainingData } = useMemo(() => useDeckSplit(data), [data])

  const [activeCards, setActiveCards] = useState(slicedData)
  const [inactiveCards, setInactiveCards] = useState(remainingData)
  const [isFinished, setIsFinished] = useState(false)
  const [recentlySeenCards, setRecentlySeenCards] = useState<CardObject | null>(null)

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

  if (isFinished) {
    return (
      <View className="w-full h-full justify-center items-center">
        <Text className="font-interbolditalic text-3xl text-center mx-6">
          You've finished this deck!
        </Text>
        <Text className="text-4xl mt-2">🎉</Text>
        <Button size="lg" onPress={router.back} className="mt-6">
          <Text>Continue</Text>
        </Button>
      </View>
    )
  }

  if (recentlySeenCards && Object.keys(recentlySeenCards).length === 7) {
    return (
      <ReviewPage
        recentlySeenCards={recentlySeenCards}
        setRecentlySeenCards={setRecentlySeenCards}
      />
    )
  }

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
        <CardTypeSwitch data={activeCards} />
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
              setHasUserAnswered,
              setActiveCards,
              setInactiveCards,
              setIsFinished,
              recentlySeenCards,
              setRecentlySeenCards,
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
