import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"
import React from "react"

// Just a type definition for TypeScript
type TabIconProps = {
  icon: React.ReactNode
  color: string // Requires a tailwind color class
  size: number
  tabIcon?: boolean
  focused?: boolean
  text?: string
  className?: string
}
// Uses above type definition
export function CustomIcon({
  icon,
  size,
  color,
  tabIcon = false,
  text,
  focused,
  className,
}: TabIconProps) {
  let _className: string
  if (tabIcon) {
    _className = focused ? `${color} font-intersemibold` : "text-primary/50 font-interregular" // Conditional colors
  } else {
    _className = color
  }

  // Clones the icon component (passed as a prop) so we can add the color class to it
  const coloredIcon = React.cloneElement(icon as React.ReactElement, {
    className: _className,
    size: size,
  })
  return (
    <View className="items-center justify-center gap-1">
      {coloredIcon}
      {/* The cn function conditionally combines multiple class names into a single string, with the second argument taking precedence */}
      <Text className={cn(_className, className)}>{text}</Text>
    </View>
  )
}

export function TabIcon(title: string, iconComponent: React.ReactNode) {
  const options = {
    title: title,
    headerShown: false,
    tabBarIcon: ({ focused }: { focused: boolean }) => (
      <CustomIcon
        color="text-emerald-500"
        icon={iconComponent}
        size={26}
        tabIcon
        text={title}
        focused={focused}
        className="w-24 text-center text-xs"
      />
    ),
  }
  return options
}
