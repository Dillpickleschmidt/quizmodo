import { EntryWithCardProperties } from "@/types"

export function handleNextQuestion(
  isAnswerCorrect: boolean,
  activeCards: EntryWithCardProperties[],
  inactiveCards: EntryWithCardProperties[],
  currentCardIndex: number,
  setCurrentCardIndex: (index: number) => void,
  setHasUserAnswered: (answered: boolean) => void,
  setActiveCards: (cards: EntryWithCardProperties[]) => void,
  setInactiveCards: (cards: EntryWithCardProperties[]) => void,
  setIsFinished: (finished: boolean) => void,
  recentlySeenCards: EntryWithCardProperties[] | null,
  setRecentlySeenCards: (cards: EntryWithCardProperties[] | null) => void,
  unslicedData: EntryWithCardProperties[],
) {
  setHasUserAnswered(false)

  if (Object.keys(activeCards).length === 0) {
    console.error("There are 0 cards to practice")
    return
  }

  const currentCard = { ...activeCards[currentCardIndex] } // Deep copy of the current card
  const currentCardStyle = currentCard.cardStyle

  if (!isAnswerCorrect) {
    // Update the wrong answer count for the unsliced data and the current card
    updateWrongAnswerCount(unslicedData, activeCards, currentCardIndex)
    currentCard.wrongAnswerCount++
  } else {
    currentCard.wrongAnswerCount = 0
  }

  // Add the current card to the recently seen cards
  addToRecentlySeenCards(recentlySeenCards, setRecentlySeenCards, currentCard, currentCardIndex)

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
  unslicedData: EntryWithCardProperties[],
  activeCards: EntryWithCardProperties[],
  currentCardIndex: number,
) {
  const activeCardKey = activeCards[currentCardIndex].key
  const matchingEntry = unslicedData.find((card) => card.key === activeCardKey)

  if (matchingEntry) {
    matchingEntry.wrongAnswerCount++
    console.log(`Wrong answer count for ${matchingEntry.key}: ${matchingEntry.wrongAnswerCount}`)
  }
}

function addToRecentlySeenCards(
  recentlySeenCards: EntryWithCardProperties[] | null,
  setRecentlySeenCards: (cards: EntryWithCardProperties[] | null) => void,
  currentCard: EntryWithCardProperties,
  currentCardIndex: number,
) {
  // Create a deep copy of the current card
  const currentCardCopy = { ...currentCard }

  // If recentlySeenCards is null, initialize it as an empty array
  const newRecentlySeenCards = recentlySeenCards ? [...recentlySeenCards] : []

  newRecentlySeenCards.push(currentCardCopy)
  // console.log(
  //   "Recently seen cards: ",
  //   newRecentlySeenCards.map((card) => card.key),
  // )

  setRecentlySeenCards(newRecentlySeenCards)
}

function handleInitialPhase(
  isAnswerCorrect: boolean,
  currentCardStyle: string,
  activeCards: EntryWithCardProperties[],
  currentCardIndex: number,
  setCurrentCardIndex: (index: number) => void,
) {
  if (isAnswerCorrect) {
    if (currentCardStyle === "multiple-choice") {
      activeCards[currentCardIndex].cardStyle = "write"
    }
  } else {
    activeCards[currentCardIndex].cardStyle = "multiple-choice"
  }
  incrementIndex(currentCardIndex, setCurrentCardIndex)
}

function handleMainPhase(
  isAnswerCorrect: boolean,
  currentCardStyle: string,
  activeCards: EntryWithCardProperties[],
  inactiveCards: EntryWithCardProperties[],
  currentCardIndex: number,
  setActiveCards: (cards: EntryWithCardProperties[]) => void,
  setInactiveCards: (cards: EntryWithCardProperties[]) => void,
  setIsFinished: (finished: boolean) => void,
) {
  if (isAnswerCorrect) {
    if (currentCardStyle === "write") {
      if (inactiveCards.length === 0) {
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
  activeCards: EntryWithCardProperties[],
  currentCardIndex: number,
  setActiveCards: (cards: EntryWithCardProperties[]) => void,
  setIsFinished?: (finished: boolean) => void,
) {
  activeCards[currentCardIndex].cardStyle = cardType

  // Cycle the array by moving the first card to the end
  let updatedActiveCards = [...activeCards.slice(1, activeCards.length), ...activeCards.slice(0, 1)]

  let loopIterations = 0

  // Ensure that the current card is not marked as done (keep cycling until we find a card that is not done)
  while (updatedActiveCards[currentCardIndex].cardStyle === "done") {
    updatedActiveCards.push(updatedActiveCards.shift()!)
    loopIterations++
    console.log("loopIterations", loopIterations)

    if (loopIterations === updatedActiveCards.length) {
      console.log("No more cards to practice!")
      setIsFinished?.(true)
      return
    }
  }

  setActiveCards(updatedActiveCards)
}

function incrementIndex(currentCardIndex: number, setCurrentCardIndex: (index: number) => void) {
  const newCardIndex = currentCardIndex + 1
  setCurrentCardIndex(newCardIndex)
}

function removeAndAddNewCard(
  activeCards: EntryWithCardProperties[],
  inactiveCards: EntryWithCardProperties[],
  currentCardIndex: number,
  setActiveCards: (cards: EntryWithCardProperties[]) => void,
  setInactiveCards: (cards: EntryWithCardProperties[]) => void,
) {
  if (inactiveCards.length === 0) {
    console.error("No inactive cards available to add.")
    return
  }

  // Remove the first card from inactiveCards
  const [newCard, ...remainingInactiveCards] = inactiveCards

  // Create a copy of the active cards and replace the current card with the new card
  const updatedActiveCards = [...activeCards]
  updatedActiveCards[currentCardIndex] = newCard

  // Update inactive cards by removing the first card
  setInactiveCards(remainingInactiveCards)
  setActiveCards(updatedActiveCards)

  // Cycle cards to ensure correct order
  cycleCards("multiple-choice", updatedActiveCards, currentCardIndex, setActiveCards)
}

function updateCards(
  indices: number[],
  source: EntryWithCardProperties[],
): EntryWithCardProperties[] {
  return indices.map((index) => source[index])
}
