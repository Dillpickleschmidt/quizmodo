import { useAuthForm } from "@/components/auth/auth"
import { createContext, useContext, useState, useEffect } from "react"

type GlobalContextProps = {
  children: React.ReactNode
}

type GlobalContext = {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  user: string | null
  setUser: React.Dispatch<React.SetStateAction<string | null>>
  isLoading: boolean
}

const GlobalContext = createContext<GlobalContext | null>(null)

export function GlobalContextProvider({ children }: GlobalContextProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { getCurrentUserID } = useAuthForm()

  useEffect(() => {
    getCurrentUserID()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          setUser(res)
        } else {
          setIsLoading(false)
          setUser(null)
        }
      })
      .catch((error) => {
        // This will happen if the user is not logged in
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error("useNavbarContext must be used within a useNavbarContextProvider")
  }
  return context
}
