import { View, ScrollView } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { AnswerCategory, CardObject } from "@/types"

type RecentlySeenCardsProps = {
  recentlySeenCards: CardObject | null
  setRecentlySeenCards: (cards: CardObject | null) => void
}

export default function ReviewPage({
  recentlySeenCards,
  setRecentlySeenCards,
}: RecentlySeenCardsProps) {
  if (recentlySeenCards && Object.keys(recentlySeenCards).length === 7) {
    return (
      <View className="w-full h-full justify-center items-center">
        <Text className="font-intersemibolditalic text-3xl text-center text-orange-500 mt-12 mx-6">
          See the terms you practiced!
        </Text>
        <ScrollView className="w-full mt-6">
          {Object.entries(recentlySeenCards).map(([key, card]) => (
            <View
              key={key}
              className="relative mb-4 mx-2 bg-card rounded-lg shadow-md flex flex-row overflow-hidden"
            >
              <View className="flex-1 py-4 pl-4 pr-6">
                <Text
                  className={`${card.wrongAnswerCount > 0 ? "text-[#ff5757]" : ""} font-interbold text-xl`}
                >
                  Term: {key}
                </Text>
                {card.answerCategories.map((categoryObj: AnswerCategory, index: number) => (
                  <View key={index} className="mt-2">
                    <Text className="font-interbold">{categoryObj.category}:</Text>
                    {categoryObj.answers.map((answer: string, idx: number) => (
                      <Text key={idx} className="ml-4">
                        {answer}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
              <View
                className={`absolute right-0 h-full ${card.wrongAnswerCount > 0 ? "bg-red-500 w-4" : "bg-emerald-500/50 w-2"}`}
              ></View>
            </View>
          ))}
        </ScrollView>
        <View className="w-full px-3">
          <Button
            size="lg"
            onPress={() => setRecentlySeenCards(null)}
            className="w-full mt-2 mb-4 bg-orange-500"
          >
            <Text>Continue</Text>
          </Button>
        </View>
      </View>
    )
  }

  return null
}
