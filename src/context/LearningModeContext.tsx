import { createContext, useContext, useState } from "react"

type LearningModeContextProps = {
  children: React.ReactNode
}

type LearningModeContext = {
  correctKey: string
  setCorrectKey: React.Dispatch<React.SetStateAction<string>>
  isSelectionCorrect: boolean
  setIsSelectionCorrect: React.Dispatch<React.SetStateAction<boolean>>
  hasUserAnswered: boolean
  setHasUserAnswered: React.Dispatch<React.SetStateAction<boolean>>
}

const LearningModeContext = createContext<LearningModeContext | null>(null)

export function LearningModeContextProvider({ children }: LearningModeContextProps) {
  const [correctKey, setCorrectKey] = useState("")
  const [isSelectionCorrect, setIsSelectionCorrect] = useState(false)
  const [hasUserAnswered, setHasUserAnswered] = useState(false)

  return (
    <LearningModeContext.Provider
      value={{
        correctKey,
        setCorrectKey,
        isSelectionCorrect,
        setIsSelectionCorrect,
        hasUserAnswered,
        setHasUserAnswered,
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
