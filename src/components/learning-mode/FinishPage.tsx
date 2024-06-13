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
    <View className="h-full w-full items-center justify-center">
      <Text className="mx-6 mt-16 text-center font-interbolditalic text-3xl xl:text-5xl">
        You've finished this deck!
      </Text>
      <Text className="mt-2 text-4xl">🎉</Text>
      <ScrollView className="mt-6 w-full">
        {data.map((card) => (
          <View
            key={card.key}
            className="relative mx-2 mb-4 flex flex-row overflow-hidden rounded-lg bg-card shadow-md xl:mx-8"
          >
            <Text className="text-xl font-bold">{card.key}</Text>
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
              <Text className="mt-2 text-red-500">
                You missed this question {card.wrongAnswerCount} times
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
      <View className="w-full px-3 xl:max-w-[50vw]">
        <Button
          size="lg"
          onPress={() => router.navigate("/library")}
          className="mb-4 mt-2 w-full bg-orange-500"
        >
          <Text>Return</Text>
        </Button>
      </View>
    </View>
  )
}
