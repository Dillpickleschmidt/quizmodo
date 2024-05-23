import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { Input } from "~/components/ui/input"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { useAuthForm } from "@/components/auth/auth"

import { Eye } from "@/lib/icons/Eye"
import { EyeOff } from "@/lib/icons/EyeOff"
import { CustomIcon } from "@/components/homeRoute/CustomIcon"
import { Button } from "@/components/ui/button"
import { Link, router } from "expo-router"

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setshowPassword] = useState(false)
  const { loading, signUpWithEmail } = useAuthForm()

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      // Add custom alert dialog here
    }
    try {
      signUpWithEmail(form.email, form.password)
      router.replace("/library")
    } catch (error) {
      // Add custom alert dialog here
    }
  }

  return (
    <SafeAreaView className="h-full bg-background">
      <ScrollView>
        <View className="justify-center w-full min-h-[95vh] px-4 my-6">
          <View className="items-center w-full my-20">
            <Text className="text-2xl font-intersemibold">Sign up for Learn Stack!</Text>
          </View>
          <View className="px-4 gap-y-2">
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
              className="px-4 min-h-16 rounded-xl focus:border-emerald-500"
            />
          </View>
          <View className="px-4 mt-10 gap-y-2">
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
              className="px-4 min-h-16 rounded-xl focus:border-orange-500"
            />
            <View className="items-end w-full px-4 opacity-50">
              <TouchableOpacity
                onPress={() => setshowPassword(!showPassword)}
                className="w-16 pt-6 max-h-16 -mt-[4.5rem]"
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
              className="mt-2 rounded-lg bg-emerald-500 min-h-14"
            >
              <Text className="-mt-[0.125rem] font-intersemibold !text-lg">Sign up</Text>
            </Button>
            <View className="flex-row items-center justify-center gap-2 mt-5">
              <Text>Already have an account?</Text>
              <Link href="/sign-in">
                <Text className="text-lg font-interbolditalic">Sign in</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
