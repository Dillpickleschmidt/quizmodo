import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"

export default function App() {
	return (
		<View className="items-center justify-center flex-1 text-red-500">
			<Text className="text-3xl">It works!</Text>
			<StatusBar style="auto" />
			<Link href="/profile">Go to Profile</Link>
		</View>
	)
}
