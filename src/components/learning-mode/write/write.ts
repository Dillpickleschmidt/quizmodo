/*
This file contains the logic for handling the user's input for the write mode.
*/

import { EntryWithCardProperties } from "@/types"

export function presentWriteOptions(
  data: EntryWithCardProperties[],
  shuffleInput = true,
  currentCardIndex: number,
): EntryWithCardProperties {
  let entries = data

  if (entries.length < 1) {
    throw new Error("Entries are empty, cannot pick a correct key.")
  }

  if (shuffleInput) {
    entries = entries.sort(() => 0.5 - Math.random())
  }

  // Extract the entry at the specified index
  const correctEntry = entries[currentCardIndex]

  return correctEntry
}

/**
 * Check if the user's written answer is correct based on enabled categories.
 * @param userAnswer The user's answer to check.
 * @param correctOption The correct entry with answers.
 * @param enabledAnswerCategories The categories to check answers against.
 * @returns True if the answer is correct, false otherwise.
 */
export function handleWrittenAnswer(
  userAnswer: string,
  correctOption: EntryWithCardProperties,
  enabledAnswerCategories: string[],
): boolean {
  // Flatten the enabled answers from all categories
  const enabledAnswers = correctOption.answerCategories
    .filter((category) => enabledAnswerCategories.includes(category.category))
    .flatMap((category) => category.answers)

  // Check if the user's answer matches any of the enabled answers
  const normalizedUserAnswer = userAnswer.trim().toLowerCase()
  return enabledAnswers.map((answer) => answer.trim().toLowerCase()).includes(normalizedUserAnswer)
}
