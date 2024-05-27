import { useEffect, useMemo } from "react"
import { View } from "react-native"
import { handleMultipleChoiceSelection, presentMultipleChoiceOptions } from "./multiple-choice"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useLearningModeContext } from "@/context/LearningModeContext"
import { JSONWithAnswers } from "@/types"

type MultipleChoiceProps = {
  data: JSONWithAnswers
  shuffleInput?: boolean
}

export default function MultipleChoice({ data, shuffleInput = true }: MultipleChoiceProps) {
  const { setCorrectEntry, setIsAnswerCorrect, setHasUserAnswered } = useLearningModeContext()

  const choices = useMemo(() => presentMultipleChoiceOptions(data, shuffleInput), [data])

  useEffect(() => {
    setCorrectEntry(choices.correctOption)
  }, [choices.correctOption, setCorrectEntry])

  const handleSelection = (selection: string) => {
    setIsAnswerCorrect(handleMultipleChoiceSelection(choices, selection))
    setHasUserAnswered(true)
  }

  return (
    <View className="mt-4">
      <Text>Multiple Choice</Text>
      {choices.options.map((option, index) => (
        // Pick the first answer from the answers array (each answer in the array is equally valid)
        <Button key={index} onPress={() => handleSelection(option.answers[0])} className="my-2">
          <Text>{option.answers.join(", ")}</Text>
        </Button>
      ))}
    </View>
  )
}
