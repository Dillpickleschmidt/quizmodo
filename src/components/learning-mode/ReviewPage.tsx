import { View, ScrollView } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { AnswerCategory, CardObject } from "@/types"

type RecentlySeenCardsProps = {
  recentlySeenCards: CardObject | null
  setRecentlySeenCards: (cards: CardObject | null) => void
}

export default function RecentlySeenCards({
  recentlySeenCards,
  setRecentlySeenCards,
}: RecentlySeenCardsProps) {
  if (recentlySeenCards && Object.keys(recentlySeenCards).length === 7) {
    return (
      <View className="w-full h-full justify-center items-center">
        <Text className="font-intersemibold text-3xl text-center mt-12 mx-6">
          See the terms you practiced!
        </Text>
        <ScrollView className="w-full mt-6">
          {Object.entries(recentlySeenCards).map(([key, card]) => (
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
            </View>
          ))}
        </ScrollView>
        <View className="w-full px-3">
          <Button size="lg" onPress={() => setRecentlySeenCards(null)} className="w-full mt-2 mb-4">
            <Text>Continue</Text>
          </Button>
        </View>
      </View>
    )
  }

  return null
}
