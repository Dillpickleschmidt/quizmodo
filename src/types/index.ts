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
  enabled: boolean
}
export type Entry = {
  answerCategories: AnswerCategory[]
  notes?: string[]
  [key: string]: any // Allow for additional properties
}
export type JSONWithAnswerCategories = Record<string, Entry>

type EntryWithCardStyle = Entry & {
  cardStyle: string
}
export type JSONWithCardStyle = Record<string, EntryWithCardStyle>
