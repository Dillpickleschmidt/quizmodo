import { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import { handleMultipleChoiceSelection, presentMultipleChoiceOptions } from "./multiple-choice"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useLearningModeContext } from "@/context/LearningModeContext"
import { CardObject } from "@/types"

type MultipleChoiceProps = {
  data: CardObject
  shuffleInput?: boolean
}

export default function MultipleChoice({ data, shuffleInput = true }: MultipleChoiceProps) {
  const {
    setCorrectEntry,
    setIsAnswerCorrect,
    hasUserAnswered,
    setHasUserAnswered,
    enabledAnswerCategories,
    currentCardIndex,
    isAnswerCorrect,
  } = useLearningModeContext()

  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null)

  const choices = useMemo(
    () => presentMultipleChoiceOptions(data, shuffleInput, currentCardIndex),
    [data, currentCardIndex],
  )

  useEffect(() => {
    setCorrectEntry(choices.correctOption)
  }, [choices, setCorrectEntry])

  const handleSelection = (selection: string, index: number) => {
    const isCorrect = handleMultipleChoiceSelection(choices, selection)
    setIsAnswerCorrect(isCorrect)
    setHasUserAnswered(true)
    setSelectedButtonIndex(index)
  }

  const correctAnswer = choices.correctOption.answerCategories
    .filter((category) => enabledAnswerCategories.includes(category.category))
    .flatMap((category) => category.answers)

  return (
    <View className="mt-4">
      <Text className={`${hasUserAnswered && "text-white"}`}>Multiple Choice</Text>
      {choices.options.map((option, index) => {
        // Flatten the enabled answers from all categories
        const enabledAnswers = option.answerCategories
          .filter((category) => enabledAnswerCategories.includes(category.category))
          .flatMap((category) => category.answers)

        // Pick the first answer from the enabled answers array (each answer in the array is equally valid)
        const firstAnswerIndex = enabledAnswers[0]

        const isCorrect = correctAnswer.includes(firstAnswerIndex)
        const isSelected = selectedButtonIndex === index

        return (
          <Button
            key={index}
            onPress={() => handleSelection(firstAnswerIndex, index)}
            disabled={hasUserAnswered}
            className={`${
              hasUserAnswered
                ? isCorrect
                  ? "border-r-8 justify-center disabled:opacity-100 bg-white border-green-400"
                  : isSelected
                    ? "border-r-8 justify-center disabled:opacity-100 bg-white border-red-400"
                    : "disabled:opacity-60 bg-white"
                : "disabled:opacity-60"
            } my-2 xl:h-16`}
          >
            <Text
              className={`${
                hasUserAnswered
                  ? isCorrect
                    ? "text-[#46d246] font-interblack !text-xl"
                    : isSelected
                      ? "text-red-500 font-interblack"
                      : ""
                  : ""
              }`}
            >
              {enabledAnswers.join(", ")}
            </Text>
          </Button>
        )
      })}
    </View>
  )
}
