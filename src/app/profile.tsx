import { Link } from "expo-router"
import React from "react"
import { Text, View } from "react-native"

export default function Profile() {
	return (
		<View className="items-center justify-center w-full h-full">
			<Text className="text-primary">Profile</Text>
			<View className="items-center w-48 p-4 mt-5 bg-background rounded-xl">
				<Link href="/" className="text-xl text-primary">
					Go Home
				</Link>
			</View>
		</View>
	)
}
