/*
This file contains the logic for handling the user's input for the write mode.
*/

import { Entry, JSONWithAnswerCategories } from "@/types"

export function presentWriteOptions(data: JSONWithAnswerCategories, shuffleInput = true) {
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

export function handleWrittenAnswer(userAnswer: string, correctOption: Entry & { key: string }) {
  // Flatten the enabled answers from all categories
  const enabledAnswers = correctOption.answerCategories
    .filter((category) => category.enabled)
    .flatMap((category) => category.answers)

  // Check if the user's answer matches any of the enabled answers
  const normalizedUserAnswer = userAnswer.trim().toLowerCase()
  return enabledAnswers.map((answer) => answer.trim().toLowerCase()).includes(normalizedUserAnswer)
}
