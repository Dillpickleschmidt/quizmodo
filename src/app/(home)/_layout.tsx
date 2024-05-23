import { Text } from "@/components/ui/text"
import React from "react"
import { Image, Pressable, View } from "react-native"
import { Tabs, Redirect } from "expo-router"
import { Button } from "@/components/ui/button"
import AddDialog from "@/components/homeRoute/AddDialog"
import { TabIcon, CustomIcon } from "@/components/homeRoute/CustomIcon"

// The icon components
import { FolderOpen } from "@/lib/icons/FolderOpen"
import { Settings } from "@/lib/icons/Settings"
import Ionicons from "@/lib/icons/IonIcons"

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen name="library" options={TabIcon("Library", <FolderOpen />)} />
        {/* Unique screen that actually loads a dialog instead */}
        <Tabs.Screen
          name="add"
          options={{
            tabBarButton: () => (
              <AddDialog>
                <Pressable className="mt-[0.35rem] rounded-full">
                  <CustomIcon
                    icon={<Ionicons name="add-circle-outline" />}
                    size={40}
                    color="text-emerald-500"
                    className="min-w-[25%]"
                  />
                </Pressable>
              </AddDialog>
            ),
          }}
        />
        <Tabs.Screen name="settings" options={TabIcon("Settings", <Settings />)} />
      </Tabs>
    </>
  )
}
