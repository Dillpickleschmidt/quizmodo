import { JSONWithCardStyle, JSONWithAnswerCategories } from "@/types"

export default function useDeckSplit(data: JSONWithAnswerCategories) {
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
  const slicedData = Object.fromEntries(slicedEntries) as JSONWithCardStyle

  const remainingData = Object.fromEntries(remainingEntries) as JSONWithCardStyle

  return { slicedData, remainingData }
}
