export type UniversalJSONData = Record<string, any>

export type AnswerCategory = Omit<
  Database["public"]["Tables"]["answer_categories"]["Row"],
  "answer_category_id" | "entry_id"
>
export type Entry = Omit<Database["public"]["Tables"]["entries"]["Row"], "deck_id" | "entry_id"> & {
  answerCategories: AnswerCategory[]
}
//   & {
//   [key: string]: any // Allow for additional properties
// }

export type EntryWithCardProperties = Entry & {
  cardStyle: string
  wrongAnswerCount: number
}
