import { Text } from "@/components/ui/text"
import React from "react"
import { Image, Pressable, View } from "react-native"
import { Tabs, Redirect } from "expo-router"
import { Button } from "@/components/ui/button"
import AddDialog from "@/components/homeRoute/AddDialog"
import { TabIcon, CustomIcon } from "@/components/homeRoute/CustomIcon"
import { useColorScheme } from "nativewind"
import { NAV_THEME } from "~/lib/constants"

// The icon components
import { FolderOpen } from "@/lib/icons/FolderOpen"
import { Settings } from "@/lib/icons/Settings"
import Ionicons from "@/lib/icons/IonIcons"

export default function TabsLayout() {
  const { colorScheme } = useColorScheme()
  const backgroundColor = colorScheme ? NAV_THEME[colorScheme].background : undefined

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: backgroundColor,
            borderTopWidth: 0,
            height: 67.5,
          },
        }}
      >
        <Tabs.Screen name="library" options={TabIcon("Library", <FolderOpen />)} />
        {/* Unique screen that actually loads a dialog instead */}
        <Tabs.Screen
          name="create"
          options={{
            tabBarButton: () => (
              <View className="h-[5.5rem] min-w-[30%] items-center justify-center">
                <AddDialog>
                  {/* padding to expand touchable area */}
                  <Pressable className="p-4">
                    <CustomIcon
                      icon={<Ionicons name="add-circle" />}
                      size={44}
                      color="text-emerald-500"
                    />
                  </Pressable>
                </AddDialog>
              </View>
            ),
          }}
        />
        <Tabs.Screen name="settings" options={TabIcon("Settings", <Settings />)} />
      </Tabs>
    </>
  )
}
