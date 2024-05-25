import { createContext, useContext, useState } from "react"

type LearningModeContextProps = {
  children: React.ReactNode
}

type LearningModeContext = {
  correctKey: string
  setCorrectKey: React.Dispatch<React.SetStateAction<string>>
}

const LearningModeContext = createContext<LearningModeContext | null>(null)

export function LearningModeContextProvider({ children }: LearningModeContextProps) {
  const [correctKey, setCorrectKey] = useState("")

  return (
    <LearningModeContext.Provider value={{ correctKey, setCorrectKey }}>
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
