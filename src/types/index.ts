// export type VocabEntry = {
//   answers: string[]
//   mnemonics?: string[]
//   notes?: string[]
// }
// export type VocabData = Record<string, VocabEntry>

export type UniversalJSONData = Record<string, any>

// export type JSONWithAnswers = Record<string, { answers: string[]; [key: string]: any }>

export type AnswerCategory = {
  category: string
  answers: string[]
}
export type Entry = {
  answerCategories: AnswerCategory[]
  notes?: string[]
  [key: string]: any // Allow for additional properties
}
export type JSONWithAnswerCategories = Record<string, Entry>

export type EntryWithCardProperties = Entry & {
  cardStyle: string
  wrongAnswerCount: number
}
export type CardObject = Record<string, EntryWithCardProperties>
