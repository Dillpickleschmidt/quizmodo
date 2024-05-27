import { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { useLocalSearchParams } from "expo-router"
import { useLearningModeContext } from "@/context/LearningModeContext"
import data from "@/test-data/test-data.json"
import CardHandler from "@/components/learning-mode/CardHandler"
import useDeckSplit from "@/components/learning-mode/useDeckSplit"
import { UniversalJSONData } from "@/types"

export default function LearningPage() {
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>()

  const { correctEntry, isAnswerCorrect, setIsAnswerCorrect, hasUserAnswered, setHasUserAnswered } =
    useLearningModeContext()
  const { slicedData, remainingData, firstKey } = useMemo(() => useDeckSplit(data), [data])

  const [activeCards, setActiveCards] = useState(slicedData) // This is the subset of data that the user is currently practicing
  const [remainingCards, setRemainingCards] = useState(remainingData)

  useEffect(() => {
    console.log("firstKey: ", firstKey)
    console.log("slicedData length: ", Object.keys(slicedData).length)
    console.log("remainingData length: ", Object.keys(remainingData).length)
  }, [slicedData, remainingData, firstKey])

  useEffect(() => {
    console.log("Now practicing deck " + deck_id)
  }, [deck_id])

  const setBackgroundColor = (isCorrect: boolean) => {
    return hasUserAnswered ? (isCorrect ? "bg-green-500" : "bg-red-500") : ""
  }

  function handleNextQuestion() {
    console.log("Next question!")
    setHasUserAnswered(false)
    setIsAnswerCorrect(false)

    // Cycle the first card to the end of the active cards
    const newActiveCards: UniversalJSONData = { ...activeCards }
    const [firstKey, ...remainingKeys] = Object.keys(activeCards)
    const firstCard = newActiveCards[firstKey]
    const updatedCards: UniversalJSONData = remainingKeys.reduce((acc, key) => {
      acc[key] = newActiveCards[key]
      return acc
    }, {} as UniversalJSONData)

    updatedCards[firstKey] = firstCard

    setActiveCards(updatedCards)
    console.log("Active cards: ", updatedCards)
  }

  return (
    <View
      className={`${setBackgroundColor(isAnswerCorrect)} items-center justify-center w-full h-full`}
    >
      <View className="w-full px-6 translate-y-12">
        <Text className="text-3xl font-interblack">Deck {deck_id} Learning Page</Text>
        <Text className="text-xl">This is where you'll practice</Text>
        <Text className="mt-12 text-2xl font-intersemibold">{correctEntry?.key}</Text>
        <CardHandler data={activeCards} firstKey={firstKey} />
        {/* <MultipleChoice data={data} /> */}
      </View>
      {hasUserAnswered && (
        <Button size="lg" onPress={handleNextQuestion} className="absolute bottom-12">
          <Text>Next Question {"->"}</Text>
        </Button>
      )}
    </View>
  )
}
