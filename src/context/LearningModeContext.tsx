import { VocabEntry } from "@/types"
import { createContext, useContext, useState } from "react"

type LearningModeContextProps = {
  children: React.ReactNode
}

type LearningModeContext = {
  correctKey: string
  setCorrectKey: React.Dispatch<React.SetStateAction<string>>
  isAnswerCorrect: boolean
  setIsAnswerCorrect: React.Dispatch<React.SetStateAction<boolean>>
  hasUserAnswered: boolean
  setHasUserAnswered: React.Dispatch<React.SetStateAction<boolean>>
  correctEntry?: VocabEntry & { key: string }
  setCorrectEntry: React.Dispatch<React.SetStateAction<(VocabEntry & { key: string }) | undefined>>
}

const LearningModeContext = createContext<LearningModeContext | null>(null)

export function LearningModeContextProvider({ children }: LearningModeContextProps) {
  const [correctKey, setCorrectKey] = useState("")
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [hasUserAnswered, setHasUserAnswered] = useState(false)
  const [correctEntry, setCorrectEntry] = useState<VocabEntry & { key: string }>()

  return (
    <LearningModeContext.Provider
      value={{
        correctKey,
        setCorrectKey,
        isAnswerCorrect,
        setIsAnswerCorrect,
        hasUserAnswered,
        setHasUserAnswered,
        correctEntry,
        setCorrectEntry,
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
