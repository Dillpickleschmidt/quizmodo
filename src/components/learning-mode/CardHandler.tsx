import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { JSONWithCardStyle } from "@/types"
import MultipleChoice from "./multiple-choice/MultipleChoice"
import WriteComponent from "./write/WriteComponent"
import { useMemo } from "react"
import { useLearningModeContext } from "@/context/LearningModeContext"

type CardHandlerProps = {
  data: JSONWithCardStyle
}

export default function CardHandler({ data }: CardHandlerProps) {
  const { currentCardIndex } = useLearningModeContext()

  // get data from the curentCardIndex'th index entry from the active set
  const currentKey = useMemo(() => Object.keys(data)[currentCardIndex], [data, currentCardIndex])

  return (
    <>
      {currentKey ? (
        data[currentKey].cardStyle === "multiple-choice" ? (
          <MultipleChoice data={data} shuffleInput={false} />
        ) : (
          <WriteComponent data={data} shuffleInput={false} />
        )
      ) : (
        <View>
          <Text>You're done!</Text>
        </View>
      )}
    </>
  )
}
