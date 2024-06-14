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
      <ScrollView className="mt-6 w-full px-4">
        {data.map((entry, index) => (
          <View key={index} className="my-2 rounded-xl bg-card p-6 shadow-md">
            <Text className="font-interbold text-2xl !text-orange-500 text-primary">
              {entry.key}
            </Text>
            {entry.answerCategories.map((category, i) => (
              <View key={i}>
                <Text className="my-2 font-interitalic text-muted-foreground">
                  {category.category}:
                </Text>
                {category.answers.map((answer: string, j: number) => (
                  <Text key={j} className="font-interbold text-xl text-primary">
                    {answer}
                  </Text>
                ))}
              </View>
            ))}
            <View className="">
              <Text className="my-2 font-interitalic text-muted-foreground">Mnemonic:</Text>
              {entry.mnemonic && <Text className="">{entry.mnemonic}</Text>}
            </View>
            {entry.wrongAnswerCount > 0 && (
              <Text className="text-red-500">
                You missed this question {entry.wrongAnswerCount} times
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
