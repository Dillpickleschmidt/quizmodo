import { CardData } from "./cardData"

export function updateCardTerm(cards: CardData[], index: number, value: string): CardData[] {
  return cards.map((card, i) => (i === index ? { ...card, term: value } : card))
}

export function addCategory(
  cards: CardData[],
  uniqueCategories: string[],
  newCategory: string,
): { cards: CardData[]; uniqueCategories: string[] } {
  const updatedCategories = [...uniqueCategories, newCategory]
  const updatedCards = cards.map((card) => ({
    ...card,
    categories: { ...card.categories, [newCategory]: "" },
  }))
  return { cards: updatedCards, uniqueCategories: updatedCategories }
}

export function updateCardCategory(
  cards: CardData[],
  index: number,
  category: string,
  value: string,
): CardData[] {
  return cards.map((card, i) =>
    i === index ? { ...card, categories: { ...card.categories, [category]: value } } : card,
  )
}

export function removeCategory(
  cards: CardData[],
  uniqueCategories: string[],
  category: string,
): { cards: CardData[]; uniqueCategories: string[] } {
  const updatedCategories = uniqueCategories.filter((c) => c !== category)
  const updatedCards = cards.map((card) => {
    const { [category]: _, ...newCategories } = card.categories
    return { ...card, categories: newCategories }
  })
  return { cards: updatedCards, uniqueCategories: updatedCategories }
}

export function resetCategories(
  cards: CardData[],
  uniqueCategories: string[],
): { cards: CardData[]; uniqueCategories: string[] } {
  const defaultCategory = "Answer"
  const answerCategoryExists = uniqueCategories.includes(defaultCategory)
  const updatedCards = cards.map((card) => {
    const newCategories = answerCategoryExists
      ? { [defaultCategory]: card.categories[defaultCategory] }
      : { [defaultCategory]: "" }
    return { ...card, categories: newCategories }
  })
  return { cards: updatedCards, uniqueCategories: [defaultCategory] }
}
