import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { UniversalJSONData } from "@/types"
import MultipleChoice from "./multiple-choice/MultipleChoice"
import WriteComponent from "./write/WriteComponent"
import { useMemo } from "react"

type CardHandlerProps = {
  data: UniversalJSONData
}

export default function CardHandler({ data }: CardHandlerProps) {
  // get data from first entry in active set
  const firstKey = useMemo(() => Object.keys(data)[0], [data])

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
