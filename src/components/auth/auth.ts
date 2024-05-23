import { useState } from "react"
import { Alert } from "react-native"
import { supabase } from "~/lib/supabase/supabase" // Adjust the import path to your supabase client
import { makeRedirectUri } from "expo-auth-session"
import * as QueryParams from "expo-auth-session/build/QueryParams"
import * as WebBrowser from "expo-web-browser"
import * as Linking from "expo-linking"
import { Provider } from "@supabase/supabase-js"

WebBrowser.maybeCompleteAuthSession() // Required for web only
const redirectTo = makeRedirectUri()

type UseAuthFormReturn = {
  loading: boolean
  error: string | null
  signInWithEmail: (email: string, password: string) => Promise<boolean>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  performOAuth: (provider: Provider) => Promise<void>
  sendMagicLink: (email: string) => Promise<void>
  getCurrentUserID: () => Promise<string>
  signOut: () => Promise<void>
}

export function useAuthForm(): UseAuthFormReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function signInWithEmail(email: string, password: string): Promise<boolean> {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      Alert.alert("Error", error.message)
      setError(error.message)
      setLoading(false)
      return false // Indicate failure
    }

    setLoading(false)
    return true // Indicate success
  }

  async function signUpWithEmail(email: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({ email, password })

      if (error) {
        setError(error.message)
        throw new Error(error.message)
      } else if (!session) {
        Alert.alert("Please check your inbox for email verification!")
      }
    } catch (err) {
      setLoading(false)
      throw err // Ensure the error is thrown so that it can be caught by the caller
    }
    setLoading(false)
  }

  async function createSessionFromUrl(url: string) {
    const { params, errorCode } = QueryParams.getQueryParams(url)

    if (errorCode) throw new Error(errorCode)
    const { access_token, refresh_token } = params

    if (!access_token) return

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    })
    if (error) throw error
    return data.session
  }

  // See https://react-native-google-signin.github.io/docs/setting-up/expo
  async function performOAuth(provider: Provider) {
    // NOT WORKING (needs native code)
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    })
    if (error) {
      Alert.alert(error.message)
      setError(error.message)
      setLoading(false)
      return
    }

    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? "", redirectTo)

    if (res.type === "success") {
      const { url } = res
      await createSessionFromUrl(url)
    }
    setLoading(false)
  }

  async function sendMagicLink(email: string) {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    })

    if (error) {
      Alert.alert(error.message)
      setError(error.message)
    } else {
      Alert.alert("Magic link sent! Please check your email.")
    }
    setLoading(false)
  }

  async function getCurrentUserID() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      throw new Error("User not found")
    }
    const user_id = user.id
    return user_id
  }

  async function signOut() {
    let { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error("Error signing out: " + error.message)
    }
    // router.refresh()
    return // Essentially the same as 'Promise.resolve()'
  }

  return {
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    performOAuth,
    sendMagicLink,
    getCurrentUserID,
    signOut,
  }
}
