import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Text, TextClassContext } from "@/components/ui/text"
import { useColorScheme } from "nativewind"
import { View } from "react-native"

export default function App() {
	const { toggleColorScheme } = useColorScheme()

	return (
		<View className="items-center justify-center flex-1 w-full h-full">
			<Card className="items-center justify-center h-96 w-96">
				{/* Put a color here to change all children text colors */}
				<TextClassContext.Provider value="">
					<Text className="p-2 text-2xl">Hello World</Text>
					{/* fyi Button seems to block text color inheritance */}
					<Button size="lg" onPress={toggleColorScheme} className="dark:bg-emerald-400">
						<Text>Toggle Theme</Text>
					</Button>
				</TextClassContext.Provider>
			</Card>
		</View>
	)
}
