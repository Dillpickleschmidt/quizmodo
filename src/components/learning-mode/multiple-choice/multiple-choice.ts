/*
This file contains the logic for generating multiple choice options and handling the user's selection.
*/

import { CardObject, Entry } from "@/types"

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
export function presentMultipleChoiceOptions(
  data: CardObject,
  shuffleInput = true,
  currentCardIndex: number,
) {
  let entries = Object.entries(data) // [1, 2, 3, 4, 5...]

  if (entries.length < 4) {
    throw new Error("Not enough entries to select 4 options")
  }

  if (shuffleInput) {
    // Shuffle the entries array
    entries = entries.sort(() => 0.5 - Math.random())
  }
  // Extract the entry at the current card index
  const correctKeyArr = entries.splice(currentCardIndex, 1)[0]
  // ex: say currentCardIndex = 1 (0-based index), entries = [1, 2, 3, 4, 5...]
  // --> [2], [1, 3, 4, 5...]

  // Shuffle the remaining entries array
  const remainingShuffledEntries = entries.sort(() => 0.5 - Math.random()) // [2], [3, 5, 7, 1...]

  // Select the first 3 remaining entries after shuffling
  const select3Entries = remainingShuffledEntries.slice(0, 3) // [2], [3, 5, 7]

  // Combine the correct key with the selected entries
  const selectedEntries = [correctKeyArr, ...select3Entries] // [2, 3, 5, 7]

  // Shuffle the selected entries
  const shuffledSelectedEntries = selectedEntries.sort(() => 0.5 - Math.random()) // [3, 2, 7, 5]

  // Map the selected entries to a more usable format
  const options = shuffledSelectedEntries.map(([key, entry]) => ({
    key,
    ...entry,
  }))
  // Get the correct key from the correctKeyArr
  const correctOption = options.find((option) => option.key === correctKeyArr[0])!

  return {
    options,
    correctOption,
  }
}

type MultipleChoices = {
  options: (Entry & { key: string })[]
  correctOption: Entry & { key: string }
}

/**
 * Check if the user's answer is correct based on enabled categories.
 * @param multipleChoices The multiple choice options and correct option.
 * @param userAnswer The user's answer to check.
 * @returns True if the answer is correct, false otherwise.
 */
export function handleMultipleChoiceSelection(
  multipleChoices: MultipleChoices,
  userAnswer: string,
): boolean {
  const { correctOption } = multipleChoices

  if (!correctOption || !correctOption.answerCategories) {
    throw new Error("Correct option or answer categories not found")
  }

  // Flatten the enabled answers from all categories
  const answers = correctOption.answerCategories.flatMap((category) => category.answers)

  console.log("enabledAnswers: ", answers)

  // Check if the user's answer matches any of the enabled answers
  return answers.includes(userAnswer)
}
