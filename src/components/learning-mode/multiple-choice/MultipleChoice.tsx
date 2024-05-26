import { useEffect, useMemo } from "react"
import { View } from "react-native"
import data from "@/test-data/test-data.json"
import { handleMultipleChoiceSelection, presentMultipleChoiceOptions } from "./multiple-choice"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useLearningModeContext } from "@/context/LearningModeContext"

export default function MultipleChoice() {
  const { setCorrectKey, setIsAnswerCorrect, setHasUserAnswered } = useLearningModeContext()

  const choices = useMemo(() => presentMultipleChoiceOptions(data), [data])

  useEffect(() => {
    setCorrectKey(choices.correctKey)
  }, [choices.correctKey, setCorrectKey])

  const handleSelection = (selection: string) => {
    setIsAnswerCorrect(handleMultipleChoiceSelection(choices, selection))
    setHasUserAnswered(true)
  }

  return (
    <View className="mt-4">
      <Text>Multiple Choice</Text>
      {choices.options.map((option, index) => (
        <Button key={index} onPress={() => handleSelection(option.answers[0])} className="my-2">
          <Text>{option.answers.join(", ")}</Text>
        </Button>
      ))}
    </View>
  )
}
