import { Text } from "@/components/ui/text"
import React from "react"
import { View } from "react-native"

import { MoonStar } from "@/lib/icons/MoonStar"

export default function Library() {
	return (
		<View className="items-center justify-center w-full h-full">
			<Text className="text-3xl font-interblack">Library</Text>
			<MoonStar className="text-5xl" color="gray" size={48} />
		</View>
	)
}
