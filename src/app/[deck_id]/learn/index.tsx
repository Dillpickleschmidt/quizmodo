import { useEffect, useMemo, useState } from "react"
import { ScrollView, View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { router, useLocalSearchParams } from "expo-router"
import { useLearningModeContext } from "@/context/LearningModeContext"
import data from "@/test-data/test-data-2.json"
import CardTypeSwitch from "@/components/learning-mode/CardTypeSwitch"
import useDeckSplit from "@/components/learning-mode/useDeckSplit"
import CategoryDropdown from "@/components/learning-mode/CategoryDropdown"
import { handleNextQuestion } from "@/components/learning-mode/cardHandlers"
import { EntryWithCardProperties } from "@/types"
import ReviewPage from "@/components/learning-mode/ReviewPage"
import FinishPage from "@/components/learning-mode/FinishPage"

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

  const { slicedData, remainingData, unslicedData } = useMemo(() => useDeckSplit(data), [data])

  const [activeCards, setActiveCards] = useState<EntryWithCardProperties[]>(slicedData)
  const [inactiveCards, setInactiveCards] = useState<EntryWithCardProperties[]>(remainingData)
  const [isFinished, setIsFinished] = useState(false)
  const [recentlySeenCards, setRecentlySeenCards] = useState<EntryWithCardProperties[] | null>(null)

  useEffect(() => {
    console.log("Now practicing deck " + deck_id)
  }, [deck_id])

  const uniqueCategories = useMemo(() => extractUniqueCategories(data), [data])

  useEffect(() => {
    setEnabledAnswerCategories(uniqueCategories)
  }, [uniqueCategories])

  if (isFinished) {
    return <FinishPage data={unslicedData} />
  }

  if (recentlySeenCards && recentlySeenCards.length === 7) {
    return (
      <ReviewPage
        recentlySeenCards={recentlySeenCards}
        setRecentlySeenCards={setRecentlySeenCards}
      />
    )
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      className={`${setBackgroundColor(isAnswerCorrect, hasUserAnswered)}`}
    >
      <View className={`items-center justify-center w-full h-screen xl:px-72`}>
        <View className="w-full px-6 translate-y-6">
          <Text className={`text-3xl font-interblack ${hasUserAnswered && "text-white"}`}>
            Deck {deck_id} Learning Page
          </Text>
          <View>
            <CategoryDropdown uniqueCategories={uniqueCategories} />
          </View>
          <View className="w-full items-center">
            <CardTypeSwitch data={activeCards} />
          </View>
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
                unslicedData,
              )
            }
            className={`absolute bottom-12 ${hasUserAnswered && "bg-white"}`}
          >
            <Text className={`${hasUserAnswered && "text-black"}`}>Next Question {"->"}</Text>
          </Button>
        )}
      </View>
    </ScrollView>
  )
}

function setBackgroundColor(isCorrect: boolean, hasUserAnswered: boolean) {
  return hasUserAnswered ? (isCorrect ? "bg-green-500" : "bg-red-500") : ""
}

function extractUniqueCategories(data: EntryWithCardProperties[]): string[] {
  const categories = new Set<string>()
  data.forEach((entry) => {
    entry.answerCategories.forEach((category) => {
      categories.add(category.category)
    })
  })
  return Array.from(categories)
}
