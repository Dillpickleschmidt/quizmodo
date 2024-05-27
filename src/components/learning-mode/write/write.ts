/*
This file contains the logic for handling the user's input for the write mode.
*/

import { UniversalJSONData } from "@/types"

export function presentWriteOptions(data: UniversalJSONData, shuffleInput = true) {
  let entries = Object.entries(data)

  if (entries.length < 1) {
    throw new Error("Entries is empty, cannot pick a correct key.")
  }

  if (shuffleInput) {
    entries = entries.sort(() => 0.5 - Math.random())
  }

  // Destructuring the 'entries' array to assign the first element to 'correctKeyArr'
  const [correctKeyArr] = entries

  // Get the selected key and entry from the correctKeyArr
  const selectedEntry = correctKeyArr[1]
  const correctKey = correctKeyArr[0]

  const correctOption = {
    key: correctKey,
    ...selectedEntry,
  }

  return correctOption
}

export function handleWrittenAnswer(userAnswer: string, correctOption: any) {
  if (
    correctOption.answers
      .map((answer: string) => answer.toLowerCase())
      .includes(userAnswer.toLowerCase())
  ) {
    return true
  } else {
    return false
  }
}
