import { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { useLearningModeContext } from "@/context/LearningModeContext"
import { handleWrittenAnswer, presentWriteOptions } from "./write"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EntryWithCardProperties } from "@/types"

type WriteComponentProps = {
  data: EntryWithCardProperties[]
  shuffleInput?: boolean
}

export default function WriteComponent({ data, shuffleInput = true }: WriteComponentProps) {
  const {
    setCorrectEntry,
    setIsAnswerCorrect,
    setHasUserAnswered,
    enabledAnswerCategories,
    currentCardIndex,
    hasUserAnswered,
    isAnswerCorrect,
  } = useLearningModeContext()

  const correctEntry = useMemo(
    () => presentWriteOptions(data, shuffleInput, currentCardIndex),
    [data, currentCardIndex],
  )
  const [userAnswer, setUserAnswer] = useState<string>("")

  useEffect(() => {
    setCorrectEntry(correctEntry)
    setUserAnswer("")
  }, [correctEntry, setCorrectEntry])

  const handleInput = () => {
    setIsAnswerCorrect(handleWrittenAnswer(userAnswer, correctEntry, enabledAnswerCategories))
    setHasUserAnswered(true)

    // Flatten the enabled answers from all categories for logging
    const enabledAnswers = correctEntry.answerCategories
      .filter((category) => enabledAnswerCategories.includes(category.category))
      .flatMap((category) => category.answers)

    console.log("User answer: ", userAnswer)
    console.log("Correct answer: ", enabledAnswers.join(", "))
  }

  return (
    <View className="mt-4">
      <Text>{!hasUserAnswered && "Type your answer"}</Text>
      <Input
        value={userAnswer}
        onChangeText={(e) => setUserAnswer(e)}
        aria-labelledby="userAnswerInput"
        aria-errormessage="userAnswerInputError"
        editable={!hasUserAnswered}
        className={`${hasUserAnswered && (isAnswerCorrect ? "text-green-500" : "text-red-500")} font-interbold opacity-100 xl:!text-lg`}
      />
      <Button onPress={handleInput} disabled={hasUserAnswered} className="my-2 disabled:opacity-90">
        <Text>Submit</Text>
      </Button>
    </View>
  )
}
