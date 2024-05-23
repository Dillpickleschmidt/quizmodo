import "~/app/global.css"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { Theme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import * as React from "react"
import { Platform, View } from "react-native"
import { NAV_THEME } from "~/lib/constants"
import { useColorScheme } from "~/lib/useColorScheme"
import { PortalHost } from "~/components/primitives/portal"

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)

  const [fontsLoaded] = useFonts({
    "Inter-BoldItalic": require("@/assets/fonts/Inter-BoldItalic.ttf"),
    "Inter-Black": require("@/assets/fonts/Inter-Black.ttf"),
    "Inter-BlackItalic": require("@/assets/fonts/Inter-BlackItalic.ttf"),
    "Inter-ExtraBold": require("@/assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraBoldItalic": require("@/assets/fonts/Inter-ExtraBoldItalic.ttf"),
    "Inter-ExtraLight": require("@/assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Italic": require("@/assets/fonts/Inter-Italic.ttf"),
    "Inter-LightItalic": require("@/assets/fonts/Inter-LightItalic.ttf"),
    "Inter-MediumItalic": require("@/assets/fonts/Inter-MediumItalic.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-ThinItalic": require("@/assets/fonts/Inter-ThinItalic.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraLightItalic": require("@/assets/fonts/Inter-ExtraLightItalic.ttf"),
    "Inter-Light": require("@/assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBoldItalic": require("@/assets/fonts/Inter-SemiBoldItalic.ttf"),
    "Inter-Thin": require("@/assets/fonts/Inter-Thin.ttf"),
  })

  React.useEffect(() => {
    ;(async () => {
      const theme = await AsyncStorage.getItem("theme")
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background")
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme)
        setIsColorSchemeLoaded(true)
        return
      }
      const colorTheme = theme === "dark" ? "dark" : "light"
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme)

        setIsColorSchemeLoaded(true)
        return
      }
      setIsColorSchemeLoaded(true)
    })().finally(() => {
      SplashScreen.hideAsync()
    })
  }, [])

  if (!isColorSchemeLoaded || !fontsLoaded) {
    return null
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      {/* <StatusBar style={isDarkColorScheme ? "light" : "dark"} /> */}
      <Stack screenOptions={{ headerShown: false }} />
      <PortalHost />
    </ThemeProvider>
  )
}
