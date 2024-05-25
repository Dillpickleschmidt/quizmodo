import { View } from "react-native"
import React, { useEffect } from "react"
import data from "@/test-data/test-data.json"
import {
  handleMultipleChoiceSelection,
  presentMultipleChoiceOptions,
  MultipleChoices,
} from "./multiple-choice"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useLearningModeContext } from "@/context/LearningModeContext"

export default function MultipleChoice() {
  const { setCorrectKey } = useLearningModeContext()
  const choices = presentMultipleChoiceOptions(data)
  setCorrectKey(choices.correctKey)

  const handleButtonPress = (selection: string) => {
    console.log("User selected: " + selection)
    const isCorrect = handleMultipleChoiceSelection(choices, selection)
    console.log("Selection is correct: " + isCorrect)
  }

  return (
    <View className="mt-4 -mb-24">
      <Text>Multiple Choice</Text>
      {choices.options.map((option, index) => (
        // Display the answers as buttons
        // Choose the first answer [0] from the array arbitrarily since they're all correct anyway
        <Button key={index} onPress={() => handleButtonPress(option.answers[0])} className="my-2">
          <Text>{option.answers.join(", ")}</Text>
        </Button>
      ))}
    </View>
  )
}
