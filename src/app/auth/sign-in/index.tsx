import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { Input } from "~/components/ui/input"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"

import { Eye } from "@/lib/icons/Eye"
import { EyeOff } from "@/lib/icons/EyeOff"
import { CustomIcon } from "@/components/homeRoute/CustomIcon"
import { Button } from "@/components/ui/button"
import { Link, router } from "expo-router"
import { useAuthForm } from "@/components/auth/auth"

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setshowPassword] = useState(false)

  const { loading, signInWithEmail } = useAuthForm()

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      // Add custom alert dialog here for missing email or password]
      return
    }
    const success = await signInWithEmail(form.email, form.password)
    if (success) {
      // Assuming the user is logged in successfully if no error is thrown
      router.replace("/library")
    }
  }

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View className="h-full w-full items-center justify-center">
        <View className="my-6 min-h-[95vh] w-full max-w-[600px] justify-center px-4">
          <View className="my-20 w-full items-center">
            <Text className="font-intersemibold text-2xl">Log in to Quizmodo</Text>
          </View>
          <View className="gap-y-2 px-4">
            {/* <Label nativeID="email" className="!text-sm">
              Email
            </Label> */}
            <Input
              placeholder="email@example.com"
              value={form.email}
              onChangeText={(e) => {
                setForm({ ...form, email: e })
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              aria-labelledbyledBy="email"
              aria-errormessage="emailError"
              className="min-h-16 rounded-xl px-4 focus:border-emerald-500 xl:!text-lg"
            />
          </View>
          <View className="mt-10 gap-y-2 px-4">
            {/* <Label nativeID="email" className="!text-sm">
              Password
            </Label> */}
            <Input
              placeholder="password"
              value={form.password}
              onChangeText={(e) => {
                setForm({ ...form, password: e })
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              aria-labelledbyledBy="password"
              aria-errormessage="passwordError"
              className="min-h-16 rounded-xl px-4 focus:border-orange-500 xl:!text-lg"
            />
            <View className="w-full items-end px-4 opacity-50">
              <TouchableOpacity
                onPress={() => setshowPassword(!showPassword)}
                className="-mt-[4.5rem] max-h-16 w-16 pt-6"
              >
                {showPassword ? (
                  <CustomIcon icon={<Eye />} color="text-primary" size={24} />
                ) : (
                  <CustomIcon icon={<EyeOff />} color="text-primary" size={24} />
                )}
              </TouchableOpacity>
            </View>
            <Button
              onPress={handleSubmit}
              isLoading={loading}
              className="mt-2 min-h-14 rounded-lg bg-orange-500"
            >
              <Text className="-mt-[0.125rem] font-intersemibold !text-lg">Log in</Text>
            </Button>
            <View className="mt-5 flex-row items-center justify-center gap-2">
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.replace("/auth/sign-up")}>
                <Text className="font-interbolditalic text-lg">Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
