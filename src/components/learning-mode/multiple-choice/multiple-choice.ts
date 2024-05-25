/*
This file contains the logic for generating multiple choice options and handling the user's selection.
*/

import { VocabData } from "@/types"

type VocabDataRaw = VocabData["data"]

/*
This function takes in a raw vocab data object and returns an object with multiple choice options.
@param data: The raw vocab data object.
@param shuffleInput: A boolean to determine if the input should be shuffled. Default is false.
@return An object with multiple choice options and the correct key.

- By default, the function will shuffle the input data and select the first 4 entries as options.
The correct key is randomly selected from the input data.
- Alternatively, the function can be called with shuffleInput set to false. In that case, the
first entry will be the correct key and the remaining entries will be shuffled to select 3 options.
This is useful for cycling through the data in order.
*/
export function presentMultipleChoiceOptions(data: VocabDataRaw, shuffleInput = true) {
  let entries = Object.entries(data)

  if (entries.length < 4) {
    throw new Error("Not enough entries to select 4 options")
  }

  if (shuffleInput) {
    // Shuffle the entries array
    entries = entries.sort(() => 0.5 - Math.random())
  }
  // Destructuring the 'entries' array to assign the first element to 'correctKeyArr' and the remaining elements to 'remainingEntries'
  const [correctKeyArr, ...remainingEntries] = entries // ex: [1], [2, 3, 4, 5...]

  // Shuffle the remaining entries array
  const remainingShuffledEntries = remainingEntries.sort(() => 0.5 - Math.random()) // [1], [3, 5, 7, 2...]

  // Select the first 3 remaining entries after shuffling
  const select3Entries = remainingShuffledEntries.slice(0, 3) // [1], [3, 5, 7]

  // Combine the correct key with the selected entries
  const selectedEntries = [correctKeyArr, ...select3Entries] // [1, 3, 5, 7]

  // Shuffle the selected entries
  const shuffledSelectedEntries = selectedEntries.sort(() => 0.5 - Math.random()) // [3, 1, 7, 5]

  // Map the selected entries to a more usable format
  const options = shuffledSelectedEntries.map(([key, entry]) => ({
    key,
    answers: entry.answers,
    mnemonics: entry.mnemonics,
    notes: entry.notes,
  }))
  // Get the correct key from the correctKeyArr
  const correctKey = correctKeyArr[0] // 1

  return {
    options,
    correctKey,
  }
}

export type MultipleChoices = {
  options: {
    key: string
    answers?: string[]
    mnemonics?: string[]
    notes?: string[]
  }[]
  correctKey: string
}

export function handleMultipleChoiceSelection(
  multipleChoices: MultipleChoices,
  userAnswer: string,
): boolean {
  const { options, correctKey } = multipleChoices

  // Find the correct option based on the correctKey
  const correctOption = options.find((option) => option.key === correctKey)

  if (!correctOption || !correctOption.answers) {
    throw new Error("Correct option or answer not found")
  }

  // Check if the userAnswer matches any of the correct answers
  return correctOption.answers.includes(userAnswer)
}
