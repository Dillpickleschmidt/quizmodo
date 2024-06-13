export type UniversalJSONData = Record<string, any>

export type AnswerCategory = {
  category: string
  answers: string[]
}
export type Entry = {
  key: string
  answerCategories: AnswerCategory[]
  mnemonic?: string
  [key: string]: any // Allow for additional properties
}

export type EntryWithCardProperties = Entry & {
  cardStyle: string
  wrongAnswerCount: number
}
