import { VocabData } from "@/types"

type VocabDataRaw = VocabData["data"]

export function presentMultipleChoiceOptions(data: VocabDataRaw) {
  const entries = Object.entries(data)

  if (entries.length < 4) {
    throw new Error("Not enough entries to select 4 options")
  }

  // Shuffle the entries array
  const shuffledEntries = entries.sort(() => 0.5 - Math.random())

  // Select the first 4 entries after shuffling
  const selectedEntries = shuffledEntries.slice(0, 4)

  // Pick a random entry from the selected entries as the correct answer
  const correctIndex = Math.floor(Math.random() * 4)
  const correctKey = selectedEntries[correctIndex][0]

  // Map the selected entries to a more usable format
  const options = selectedEntries.map(([key, entry]) => ({
    key,
    answers: entry.answers,
    mnemonics: entry.mnemonics,
    notes: entry.notes,
  }))

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
