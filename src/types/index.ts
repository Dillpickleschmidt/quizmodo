export type VocabEntry = {
  answers: string[]
  mnemonics?: string[]
  notes?: string[]
}
export type VocabData = {
  data: Record<string, VocabEntry>
}
