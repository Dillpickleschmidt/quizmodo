import { Text } from "@/components/ui/text"
import React from "react"
import { Image, View } from "react-native"
import { Tabs, Redirect } from "expo-router"
import { Button } from "@/components/ui/button"
import AddDialog from "@/components/AddDialog"
import { cn } from "@/lib/utils"

// The icon components
import { MoonStar } from "@/lib/icons/MoonStar"
import { Sun } from "@/lib/icons/Sun"

// Just a type definition for TypeScript
type TabIconProps = {
	icon: React.ReactNode
	color: string // Requires a tailwind color class
	focused?: boolean
	text?: string
	className?: string
}
// Uses above type definition
function TabIcon({ icon, color, text, focused, className }: TabIconProps) {
	const colorClass = focused ? `${color} font-intersemibold` : "text-gray-500 font-interregular" // Conditional colors

	// Clones the icon component (passed as a prop) so we can add the color class to it
	const coloredIcon = React.cloneElement(icon as React.ReactElement, {
		className: colorClass,
	})
	return (
		<View className="items-center justify-center gap-[0.375rem]">
			{coloredIcon}
			{/* The cn function conditionally combines multiple class names into a single string, with the second argument taking precedence */}
			<Text className={cn(colorClass, className)}>{text}</Text>
		</View>
	)
}

export default function TabsLayout() {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
				}}
			>
				<Tabs.Screen
					name="library"
					options={{
						title: "Library",
						headerShown: false,
						tabBarIcon: ({ focused }) => (
							<TabIcon
								color="text-emerald-500"
								icon={<MoonStar size={28} />}
								text="Library"
								focused={focused}
								className="text-xs"
							/>
						),
					}}
				/>
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
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						headerShown: false,
						tabBarIcon: ({ focused }) => (
							<TabIcon
								color="text-emerald-500"
								icon={<Sun size={28} />}
								text="Settings"
								focused={focused}
								className="text-xs"
							/>
						),
					}}
				/>
			</Tabs>
		</>
	)
}
