import { Text } from "@/components/ui/text"
import { Link } from "expo-router"
import { View } from "react-native"

export default function App() {
  return (
    <View className="items-center justify-center flex-1 w-full h-full ">
      <Link href="/library">
        <Text className="text-emerald-500">Go to Library</Text>
      </Link>
    </View>
  )
}
