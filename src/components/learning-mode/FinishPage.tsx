import { View, ScrollView } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { AnswerCategory, EntryWithCardProperties } from "@/types"
import { router } from "expo-router"

type FinishPageProps = {
  data: EntryWithCardProperties[]
}

export default function FinishPage({ data }: FinishPageProps) {
  return (
    <View className="w-full h-full justify-center items-center">
      <Text className="font-interbolditalic xl:text-5xl text-3xl text-center mt-16 mx-6">
        You've finished this deck!
      </Text>
      <Text className="text-4xl mt-2">🎉</Text>
      <ScrollView className="w-full mt-6">
        {data.map((card) => (
          <View
            key={card.key}
            className="relative mb-4 xl:mx-8 mx-2 bg-card rounded-lg shadow-md flex flex-row overflow-hidden"
          >
            <Text className="font-bold text-xl">{card.key}</Text>
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
      <View className="xl:max-w-[50vw] w-full px-3">
        <Button
          size="lg"
          onPress={() => router.navigate("/library")}
          className="w-full mt-2 mb-4 bg-orange-500"
        >
          <Text>Return</Text>
        </Button>
      </View>
    </View>
  )
}
