import { CardObject, EntryWithCardProperties } from "@/types"

export function handleNextQuestion(
  isAnswerCorrect: boolean,
  activeCards: CardObject,
  inactiveCards: CardObject,
  currentCardIndex: number,
  setCurrentCardIndex: (index: number) => void,
  setHasUserAnswered: (answered: boolean) => void,
  setActiveCards: (cards: CardObject) => void,
  setInactiveCards: (cards: CardObject) => void,
  setIsFinished: (finished: boolean) => void,
  recentlySeenCards: CardObject | null,
  setRecentlySeenCards: (cards: CardObject | null) => void,
  unslicedData: CardObject,
) {
  setHasUserAnswered(false)

  if (Object.keys(activeCards).length === 0) {
    console.error("There are 0 cards to practice")
    return
  }

  const currentKey = Object.keys(activeCards)[currentCardIndex]
  const currentCard = activeCards[currentKey]
  const currentCardStyle = currentCard.cardStyle

  if (!isAnswerCorrect) {
    // Update the wrong answer count for the unsliced data and recently seen cards
    updateWrongAnswerCount(recentlySeenCards, unslicedData, currentKey)
  }

  // Add the current card to the recently seen cards
  addToRecentlySeenCards(recentlySeenCards, setRecentlySeenCards, currentCard, currentKey)

  // Immediately clear the wrong answer count for the current card
  currentCard.wrongAnswerCount = 0

  if (currentCardIndex <= 3) {
    handleInitialPhase(
      isAnswerCorrect,
      currentCardStyle,
      activeCards,
      currentCardIndex,
      setCurrentCardIndex,
    )
  } else {
    handleMainPhase(
      isAnswerCorrect,
      currentCardStyle,
      activeCards,
      inactiveCards,
      currentCardIndex,
      setActiveCards,
      setInactiveCards,
      setIsFinished,
    )
  }
}

function updateWrongAnswerCount(
  recentlySeenCards: CardObject | null,
  unslicedData: CardObject,
  currentKey: string,
) {
  // Ensure wrongAnswerCount is initialized as a number in unslicedData
  unslicedData[currentKey].wrongAnswerCount = unslicedData[currentKey].wrongAnswerCount || 0
  unslicedData[currentKey].wrongAnswerCount++

  // Ensure wrongAnswerCount is initialized as a number in recentlySeenCards
  if (recentlySeenCards && recentlySeenCards[currentKey]) {
    recentlySeenCards[currentKey].wrongAnswerCount =
      recentlySeenCards[currentKey].wrongAnswerCount || 0
    recentlySeenCards[currentKey].wrongAnswerCount++
  }
}

function addToRecentlySeenCards(
  recentlySeenCards: CardObject | null,
  setRecentlySeenCards: (cards: CardObject | null) => void,
  currentCard: EntryWithCardProperties,
  currentKey: string,
) {
  // Create a new card object to avoid direct mutation
  const newCard = { ...currentCard }

  // Create a new recently seen cards object with the updated card
  const newRecentlySeenCards: CardObject = {
    ...recentlySeenCards,
    [currentKey]: newCard,
  } as CardObject

  setRecentlySeenCards(newRecentlySeenCards)
}

function handleInitialPhase(
  isAnswerCorrect: boolean,
  currentCardStyle: string,
  activeCards: CardObject,
  currentCardIndex: number,
  setCurrentCardIndex: (index: number) => void,
) {
  if (isAnswerCorrect) {
    if (currentCardStyle === "multiple-choice") {
      updateCardType(activeCards, currentCardIndex, "write")
    }
  } else {
    updateCardType(activeCards, currentCardIndex, "multiple-choice")
  }
  incrementIndex(currentCardIndex, setCurrentCardIndex)
}

function handleMainPhase(
  isAnswerCorrect: boolean,
  currentCardStyle: string,
  activeCards: CardObject,
  inactiveCards: CardObject,
  currentCardIndex: number,
  setActiveCards: (cards: CardObject) => void,
  setInactiveCards: (cards: CardObject) => void,
  setIsFinished: (finished: boolean) => void,
) {
  if (isAnswerCorrect) {
    if (currentCardStyle === "write") {
      if (Object.keys(inactiveCards).length === 0) {
        cycleCards("done", activeCards, currentCardIndex, setActiveCards, setIsFinished)
        return
      }
      removeAndAddNewCard(
        activeCards,
        inactiveCards,
        currentCardIndex,
        setActiveCards,
        setInactiveCards,
      )
    } else {
      cycleCards("write", activeCards, currentCardIndex, setActiveCards)
    }
  } else {
    cycleCards("multiple-choice", activeCards, currentCardIndex, setActiveCards)
  }
}

function cycleCards(
  cardType: "write" | "multiple-choice" | "done",
  activeCards: CardObject,
  currentCardIndex: number,
  setActiveCards: (cards: CardObject) => void,
  setIsFinished?: (finished: boolean) => void,
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
    // console.log("currentCard: " + updatedActiveCards[Object.keys(activeCards)[currentCardIndex]])
    // console.log("Loop iteration: ", loopIterations)
  }

  if (loopIterations === Object.keys(activeCards).length) {
    console.log("No more cards to practice!")
    setIsFinished?.(true)
    return
  }
  setActiveCards(updatedActiveCards)
}

function updateCardType(
  activeCards: CardObject,
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
  activeCards: CardObject,
  inactiveCards: CardObject,
  currentCardIndex: number,
  setActiveCards: (cards: CardObject) => void,
  setInactiveCards: (cards: CardObject) => void,
) {
  const [firstInactiveKey, ...remainingInactiveKeys] = Object.keys(inactiveCards)
  const updatedActiveCards: CardObject = { ...activeCards }

  const newActiveCards: CardObject = {}
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

function updateCards(keys: string[], source: CardObject): CardObject {
  return keys.reduce((acc, key) => {
    acc[key] = source[key]
    return acc
  }, {} as CardObject)
}
