import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { UniversalJSONData, VocabData, VocabEntry } from "@/types"
import MultipleChoice from "./multiple-choice/MultipleChoice"
import WriteComponent from "./write/WriteComponent"
import { useMemo } from "react"

type CardHandlerProps = {
  data: UniversalJSONData
  firstKey: string
}

export default function CardHandler({ data, firstKey }: CardHandlerProps) {
  return (
    <>
      {firstKey ? (
        data[firstKey].cardStyle === "multiple-choice" ? (
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
