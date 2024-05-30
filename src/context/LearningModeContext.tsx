import { createContext, useContext, useState } from "react"
import { Entry } from "@/types"

type LearningModeContextProps = {
  children: React.ReactNode
}

type LearningModeContext = {
  isAnswerCorrect: boolean
  setIsAnswerCorrect: React.Dispatch<React.SetStateAction<boolean>>
  hasUserAnswered: boolean
  setHasUserAnswered: React.Dispatch<React.SetStateAction<boolean>>
  correctEntry?: Entry & { key: string }
  setCorrectEntry: React.Dispatch<React.SetStateAction<(Entry & { key: string }) | undefined>>
  enabledAnswerCategories: string[]
  setEnabledAnswerCategories: React.Dispatch<React.SetStateAction<string[]>>
  currentCardIndex: number
  setCurrentCardIndex: React.Dispatch<React.SetStateAction<number>>
}

const LearningModeContext = createContext<LearningModeContext | null>(null)

export function LearningModeContextProvider({ children }: LearningModeContextProps) {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [hasUserAnswered, setHasUserAnswered] = useState(false)
  const [correctEntry, setCorrectEntry] = useState<(Entry & { key: string }) | undefined>()
  const [enabledAnswerCategories, setEnabledAnswerCategories] = useState<string[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  return (
    <LearningModeContext.Provider
      value={{
        isAnswerCorrect,
        setIsAnswerCorrect,
        hasUserAnswered,
        setHasUserAnswered,
        correctEntry,
        setCorrectEntry,
        enabledAnswerCategories,
        setEnabledAnswerCategories,
        currentCardIndex,
        setCurrentCardIndex,
      }}
    >
      {children}
    </LearningModeContext.Provider>
  )
}

export function useLearningModeContext() {
  const context = useContext(LearningModeContext)
  if (!context) {
    throw new Error("useLearningModeContext must be used within a LearningModeContextProvider")
  }
  return context
}
