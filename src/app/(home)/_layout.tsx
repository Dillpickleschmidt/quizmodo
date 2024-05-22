import { Text } from "@/components/ui/text"
import React from "react"
import { Image, View } from "react-native"
import { Tabs, Redirect } from "expo-router"
import { Button } from "@/components/ui/button"
import AddDialog from "@/components/homeRoute/AddDialog"
import TabButton from "@/components/homeRoute/TabButton"

// The icon components
import { FolderOpen } from "@/lib/icons/FolderOpen"
import { Settings } from "@/lib/icons/Settings"

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen name="library" options={TabButton("Library", <FolderOpen />)} />
        {/* Unique screen that actually loads a dialog instead */}
        <Tabs.Screen
          name="add"
          options={{
            tabBarButton: () => (
              <AddDialog>
                <Button>
                  <Text>Add</Text>
                </Button>
              </AddDialog>
            ),
          }}
        />
        <Tabs.Screen name="settings" options={TabButton("Settings", <Settings />)} />
      </Tabs>
    </>
  )
}
