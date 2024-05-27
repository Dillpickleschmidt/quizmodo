import { createContext, useContext, useState } from "react"

type LearningModeContextProps = {
  children: React.ReactNode
}

type LearningModeContext = {
  isAnswerCorrect: boolean
  setIsAnswerCorrect: React.Dispatch<React.SetStateAction<boolean>>
  hasUserAnswered: boolean
  setHasUserAnswered: React.Dispatch<React.SetStateAction<boolean>>
  correctEntry?: any
  setCorrectEntry: React.Dispatch<React.SetStateAction<any>>
}

const LearningModeContext = createContext<LearningModeContext | null>(null)

export function LearningModeContextProvider({ children }: LearningModeContextProps) {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [hasUserAnswered, setHasUserAnswered] = useState(false)
  const [correctEntry, setCorrectEntry] = useState()

  return (
    <LearningModeContext.Provider
      value={{
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