import { UniversalJSONData } from "@/types"

export default function useDeckSplit(data: UniversalJSONData) {
  // Convert the data object into an array of key-value pairs
  const dataEntries = Object.entries(data)

  // Add a new property 'cardStyle' to each entry's value
  const updatedEntries = dataEntries.map(([key, value]) => [
    key,
    {
      ...value,
      cardStyle: "multiple-choice",
    },
  ])

  // Slice the first 10 entries from the data
  const slicedEntries = updatedEntries.slice(0, 10)
  // Slice the remaining entries from the data
  const remainingEntries = updatedEntries.slice(10)

  // Convert the updated entries back to an object
  const slicedData = Object.fromEntries(slicedEntries) as UniversalJSONData

  const remainingData = Object.fromEntries(remainingEntries) as UniversalJSONData

  // Get the first key from the sliced data
  const firstKey = Object.keys(slicedData)[0]

  return { slicedData, remainingData, firstKey }
}
