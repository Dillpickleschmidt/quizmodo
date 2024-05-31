import { useEffect, useMemo } from "react"
import { View } from "react-native"
import { handleMultipleChoiceSelection, presentMultipleChoiceOptions } from "./multiple-choice"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useLearningModeContext } from "@/context/LearningModeContext"
import { JSONWithAnswerCategories } from "@/types"

type MultipleChoiceProps = {
  data: JSONWithAnswerCategories
  shuffleInput?: boolean
}

export default function MultipleChoice({ data, shuffleInput = true }: MultipleChoiceProps) {
  const {
    setCorrectEntry,
    setIsAnswerCorrect,
    setHasUserAnswered,
    enabledAnswerCategories,
    currentCardIndex,
  } = useLearningModeContext()

  const choices = useMemo(
    () => presentMultipleChoiceOptions(data, shuffleInput, currentCardIndex),
    [data, currentCardIndex],
  )

  useEffect(() => {
    setCorrectEntry(choices.correctOption)
  }, [choices, setCorrectEntry])

  const handleSelection = (selection: string) => {
    setIsAnswerCorrect(handleMultipleChoiceSelection(choices, selection))
    setHasUserAnswered(true)
  }

  return (
    <View className="mt-4">
      <Text>Multiple Choice</Text>
      {choices.options.map((option, index) => {
        // Flatten the enabled answers from all categories
        const enabledAnswers = option.answerCategories
          .filter((category) => enabledAnswerCategories.includes(category.category))
          .flatMap((category) => category.answers)

        // Pick the first answer from the enabled answers array (each answer in the array is equally valid)
        const firstAnswer = enabledAnswers[0]

        return (
          <Button key={index} onPress={() => handleSelection(firstAnswer)} className="my-2">
            <Text>{enabledAnswers.join(", ")}</Text>
          </Button>
        )
      })}
    </View>
  )
}
