import { Text } from "@/components/ui/text"
import React from "react"
import { View } from "react-native"
import { useColorScheme } from "nativewind"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { NAV_THEME } from "~/lib/constants"

import { MoonStar } from "@/lib/icons/MoonStar"
import { Sun } from "@/lib/icons/Sun"

export default function Settings() {
	const { colorScheme, toggleColorScheme } = useColorScheme()
	const [checked, setChecked] = React.useState(false)

	const primaryColor = colorScheme ? NAV_THEME[colorScheme].primary : undefined

	return (
		<View className="items-center justify-center w-full h-full">
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
	)
}
