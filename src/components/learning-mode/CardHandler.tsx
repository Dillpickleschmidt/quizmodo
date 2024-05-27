import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { UniversalJSONData, VocabData, VocabEntry } from "@/types"
import MultipleChoice from "./multiple-choice/MultipleChoice"
import WriteComponent from "./write/WriteComponent"
import { useMemo } from "react"

type CardHandlerProps = {
  data: UniversalJSONData
}

export default function CardHandler({ data }: CardHandlerProps) {
  // Convert the data object into an array of key-value pairs
  const dataEntries = useMemo(() => Object.entries(data), [data])

  // Add a new property 'cardStyle' to each entry's value
  const updatedEntries = useMemo(
    () =>
      dataEntries.map(([key, value]) => [
        key,
        {
          ...value,
          cardStyle: "multiple-choice",
        },
      ]),
    [dataEntries],
  )

  // Slice the first 10 entries from the data
  const slicedEntries = useMemo(() => updatedEntries.slice(0, 10), [dataEntries])
  // Slice the remaining entries from the data
  const remainingEntries = useMemo(() => updatedEntries.slice(10), [dataEntries])

  // Convert the updated entries back to an object
  const slicedData = useMemo(
    () => Object.fromEntries(slicedEntries),
    [slicedEntries],
  ) as UniversalJSONData

  const remainingData = useMemo(
    () => Object.fromEntries(remainingEntries),
    [remainingEntries],
  ) as UniversalJSONData

  // Get the first key from the sliced data
  const firstKey = useMemo(() => Object.keys(slicedData)[0], [slicedData])

  console.log("firstKey: ", firstKey)
  console.log("slicedData length: ", slicedEntries.length)
  console.log("remainingData length: ", remainingEntries.length)

  return (
    <>
      {firstKey ? (
        slicedData[firstKey].cardStyle === "multiple-choice" ? (
          <MultipleChoice data={slicedData} shuffleInput={false} />
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
