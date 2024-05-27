/*
This file contains the logic for handling the user's input for the write mode.
*/

import { VocabData, VocabEntry } from "@/types"

type VocabDataRaw = VocabData["data"]

export function presentWriteOptions(data: VocabDataRaw, shuffleInput = true) {
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
    answers: selectedEntry.answers,
    mnemonics: selectedEntry.mnemonics,
    notes: selectedEntry.notes,
  }

  return correctOption
}

export function handleWrittenAnswer(userAnswer: string, correctOption: VocabEntry) {
  if (
    correctOption.answers.map((answer) => answer.toLowerCase()).includes(userAnswer.toLowerCase())
  ) {
    return true
  } else {
    return false
  }
}
