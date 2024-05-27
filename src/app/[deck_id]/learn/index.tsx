import { useEffect } from "react"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { useLocalSearchParams } from "expo-router"
import MultipleChoice from "@/components/learning-mode/multiple-choice/MultipleChoice"
import { useLearningModeContext } from "@/context/LearningModeContext"
import WriteComponent from "@/components/learning-mode/write/WriteComponent"
import data from "@/test-data/test-data.json"

export default function LearningPage() {
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>()
  const { correctEntry, isAnswerCorrect, setIsAnswerCorrect, hasUserAnswered, setHasUserAnswered } =
    useLearningModeContext()

  useEffect(() => {
    console.log("Now practicing deck " + deck_id)
  }, [deck_id])

  const setResponseClassName = (isCorrect: boolean) => {
    return hasUserAnswered ? (isCorrect ? "bg-green-500" : "bg-red-500") : ""
  }

  function handleNextQuestion() {
    console.log("Next question!")
    setHasUserAnswered(false)
    setIsAnswerCorrect(false)
  }

  return (
    <View
      className={`${setResponseClassName(isAnswerCorrect)} items-center justify-center w-full h-full`}
    >
      <View className="w-full px-6 translate-y-12">
        <Text className="text-3xl font-interblack">Deck {deck_id} Learning Page</Text>
        <Text className="text-xl">This is where you'll practice</Text>
        <Text className="mt-12 text-2xl font-intersemibold">{correctEntry?.key}</Text>
        <MultipleChoice data={data} />
        <Text className="mt-12 text-2xl font-intersemibold">{correctEntry?.key}</Text>
        {/* <WriteComponent data={data} /> */}
      </View>
      {hasUserAnswered && (
        <Button size="lg" onPress={handleNextQuestion} className="absolute bottom-12">
          <Text>Next Question {"->"}</Text>
        </Button>
      )}
    </View>
  )
}
