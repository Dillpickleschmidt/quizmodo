import { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { useLearningModeContext } from "@/context/LearningModeContext"
import { handleWrittenAnswer, presentWriteOptions } from "./write"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type WriteComponentProps = {
  data: Record<string, any>
}

export default function WriteComponent({ data }: WriteComponentProps) {
  const { setCorrectEntry, setIsAnswerCorrect, setHasUserAnswered } = useLearningModeContext()

  const correctEntry = useMemo(() => presentWriteOptions(data), [data])
  const [userAnswer, setUserAnswer] = useState<string>("")

  useEffect(() => {
    setCorrectEntry(correctEntry)
  }, [correctEntry])

  const handleInput = (userAnswer: string) => {
    setIsAnswerCorrect(handleWrittenAnswer(userAnswer, correctEntry))
    setHasUserAnswered(true)
    console.log("User answer: ", userAnswer)
    console.log(
      "Correct answer: ",
      correctEntry.answers.map((answer: string) => answer.toLowerCase()),
    )
  }

  return (
    <View className="mt-4">
      <Text>Type your answer</Text>
      <Input
        value={userAnswer}
        onChangeText={(e) => setUserAnswer(e)}
        aria-labelledbyledBy="userAnswerInput"
        aria-errormessage="userAnswerInputError"
      />
      <Button onPress={() => handleInput(userAnswer)} className="my-2">
        <Text>Submit</Text>
      </Button>
    </View>
  )
}
