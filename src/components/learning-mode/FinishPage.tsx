import { View, ScrollView } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { CardObject, AnswerCategory } from "@/types"
import { router } from "expo-router"

type FinishPageProps = {
  data: CardObject
}

export default function FinishPage({ data }: FinishPageProps) {
  return (
    <View className="w-full h-full justify-center items-center">
      <Text className="font-interbolditalic text-3xl text-center mt-12 mx-6">
        You've finished this deck!
      </Text>
      <Text className="text-4xl mt-2">🎉</Text>
      <ScrollView className="w-full mt-6">
        {Object.entries(data).map(([key, card]) => (
          <View key={key} className="mb-4 p-4 bg-card mx-2 rounded-lg">
            <Text className="font-bold text-xl">Term: {key}</Text>
            {card.answerCategories.map((categoryObj: AnswerCategory, index: number) => (
              <View key={index} className="mt-2">
                <Text className="font-bold">{categoryObj.category}:</Text>
                {categoryObj.answers.map((answer: string, idx: number) => (
                  <Text key={idx} className="ml-4">
                    {answer}
                  </Text>
                ))}
              </View>
            ))}
            {card.wrongAnswerCount > 0 && (
              <Text className="text-red-500 mt-2">
                You missed this question {card.wrongAnswerCount} times
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
      <View className="w-full px-3">
        <Button size="lg" onPress={() => router.navigate("/library")} className="mt-6">
          <Text>Return</Text>
        </Button>
      </View>
    </View>
  )
}
