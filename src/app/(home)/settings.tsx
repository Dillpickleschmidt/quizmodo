import { Text } from "@/components/ui/text"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import { useColorScheme } from "nativewind"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { NAV_THEME } from "~/lib/constants"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuthForm } from "@/components/auth/auth"
import { useGlobalContext } from "@/context/GlobalContext"
import { router } from "expo-router"

// Icons
import { CustomIcon } from "@/components/homeRoute/CustomIcon"
import { MoonStar } from "@/lib/icons/MoonStar"
import { Sun } from "@/lib/icons/Sun"
import { LogOut } from "@/lib/icons/LogOut"

export default function Settings() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const [checked, setChecked] = React.useState(false)

  const primaryColor = colorScheme ? NAV_THEME[colorScheme].primary : undefined
  const { signOut } = useAuthForm()
  const { setUser, setIsLoggedIn } = useGlobalContext()

  async function logout() {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace("/auth/sign-in")
  }

  return (
    <SafeAreaView className="h-full bg-background">
      <View className="items-center justify-center w-full px-4 mt-6">
        <TouchableOpacity className="items-end w-full mb-10" onPress={logout}>
          <CustomIcon icon={<LogOut />} color="text-red-500" size={24} />
        </TouchableOpacity>
      </View>
      <View className="items-center justify-center w-full h-[80vh]">
        {colorScheme === "dark" ? (
          <MoonStar color={primaryColor} size={36} />
        ) : (
          <Sun color={primaryColor} size={36} />
        )}
        <View className="my-6">
          <Switch
            checked={checked}
            onCheckedChange={() => {
              setChecked((prev) => !prev)
              toggleColorScheme()
            }}
            nativeID="toggle-theme"
          />
        </View>
        <Label
          nativeID="toggle-theme"
          onPress={() => {
            setChecked((prev) => !prev)
            toggleColorScheme()
          }}
          className="!text-xs"
        >
          Toggle Theme
        </Label>
      </View>
    </SafeAreaView>
  )
}
