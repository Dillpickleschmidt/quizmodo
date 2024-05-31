import { JSONWithCardStyle } from "@/types"

export function handleNextQuestion(
  isAnswerCorrect: boolean,
  activeCards: JSONWithCardStyle,
  inactiveCards: JSONWithCardStyle,
  currentCardIndex: number,
  setCurrentCardIndex: (index: number) => void,
  setIsAnswerCorrect: (isCorrect: boolean) => void,
  setHasUserAnswered: (answered: boolean) => void,
  setActiveCards: (cards: JSONWithCardStyle) => void,
  setInactiveCards: (cards: JSONWithCardStyle) => void,
) {
  setHasUserAnswered(false)

  if (Object.keys(activeCards).length === 0) {
    console.log("No more cards to practice!")
    return
  }

  const currentCardStyle = activeCards[Object.keys(activeCards)[currentCardIndex]].cardStyle

  if (currentCardIndex <= 3) {
    if (isAnswerCorrect) {
      if (currentCardStyle === "multiple-choice") {
        updateCardType(activeCards, currentCardIndex, "write")
      }
    } else {
      updateCardType(activeCards, currentCardIndex, "multiple-choice")
    }
    incrementIndex(currentCardIndex, setCurrentCardIndex)
    return
  }

  if (isAnswerCorrect) {
    if (currentCardStyle === "write") {
      if (Object.keys(inactiveCards).length === 0) {
        cycleCards("done", activeCards, currentCardIndex, setActiveCards)
        return
      }
      removeAndAddNewCard(
        activeCards,
        inactiveCards,
        currentCardIndex,
        setActiveCards,
        setInactiveCards,
      )
    } else if (currentCardStyle === "multiple-choice") {
      cycleCards("write", activeCards, currentCardIndex, setActiveCards)
    } else {
      // Shouldn't need to handle this here, but just in case...
      cycleCards("done", activeCards, currentCardIndex, setActiveCards)
    }
  } else {
    cycleCards("multiple-choice", activeCards, currentCardIndex, setActiveCards)
  }
  console.log("Next question!")
  setIsAnswerCorrect(false)
}

function cycleCards(
  cardType: "write" | "multiple-choice" | "done",
  activeCards: JSONWithCardStyle,
  currentCardIndex: number,
  setActiveCards: (cards: JSONWithCardStyle) => void,
) {
  updateCardType(activeCards, currentCardIndex, cardType)

  const [firstKey, ...remainingKeys] = Object.keys(activeCards)
  const firstCard = { ...activeCards[firstKey] }

  let updatedActiveCards = updateCards(remainingKeys, activeCards)
  updatedActiveCards[firstKey] = firstCard

  let loopIterations = 0

  // Ensure that the current card is not marked as done (keep cycling until we find a card that is not done)
  while (
    updatedActiveCards[Object.keys(updatedActiveCards)[currentCardIndex]].cardStyle === "done" &&
    loopIterations < Object.keys(activeCards).length
  ) {
    const [firstKey, ...remainingKeys] = Object.keys(updatedActiveCards)
    const firstCard = { ...updatedActiveCards[firstKey] }

    updatedActiveCards = updateCards(remainingKeys, updatedActiveCards)
    updatedActiveCards[firstKey] = firstCard
    loopIterations++
    console.log("currentCard: " + updatedActiveCards[Object.keys(activeCards)[currentCardIndex]])
    console.log("Loop iteration: ", loopIterations)
  }

  if (loopIterations === Object.keys(activeCards).length) {
    console.log("No more cards to practice!")
    return
  }

  loopIterations = 0
  setActiveCards(updatedActiveCards)
}

function updateCardType(
  activeCards: JSONWithCardStyle,
  currentCardIndex: number,
  cardType: "write" | "multiple-choice" | "done",
) {
  const currentCard = activeCards[Object.keys(activeCards)[currentCardIndex]]
  currentCard.cardStyle = cardType
}

function incrementIndex(currentCardIndex: number, setCurrentCardIndex: (index: number) => void) {
  const newCardIndex = currentCardIndex + 1
  setCurrentCardIndex(newCardIndex)
}

function removeAndAddNewCard(
  activeCards: JSONWithCardStyle,
  inactiveCards: JSONWithCardStyle,
  currentCardIndex: number,
  setActiveCards: (cards: JSONWithCardStyle) => void,
  setInactiveCards: (cards: JSONWithCardStyle) => void,
) {
  const [firstInactiveKey, ...remainingInactiveKeys] = Object.keys(inactiveCards)
  const updatedActiveCards: JSONWithCardStyle = { ...activeCards }

  const newActiveCards: JSONWithCardStyle = {}
  let index = 0

  for (const key in updatedActiveCards) {
    if (index === currentCardIndex) {
      newActiveCards[firstInactiveKey] = { ...inactiveCards[firstInactiveKey] }
    } else {
      newActiveCards[key] = updatedActiveCards[key]
    }
    index++
  }

  const updatedInactiveCards = updateCards(remainingInactiveKeys, inactiveCards)
  setInactiveCards(updatedInactiveCards)
  setActiveCards(newActiveCards)
  cycleCards("multiple-choice", newActiveCards, currentCardIndex, setActiveCards)
}

function updateCards(keys: string[], source: JSONWithCardStyle): JSONWithCardStyle {
  return keys.reduce((acc, key) => {
    acc[key] = source[key]
    return acc
  }, {} as JSONWithCardStyle)
}
