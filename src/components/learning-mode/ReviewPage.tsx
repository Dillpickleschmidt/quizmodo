import { View, ScrollView } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { AnswerCategory, EntryWithCardProperties } from "@/types"

type RecentlySeenCardsProps = {
  recentlySeenCards: EntryWithCardProperties[] | null
  setRecentlySeenCards: (cards: EntryWithCardProperties[] | null) => void
}

export default function ReviewPage({
  recentlySeenCards,
  setRecentlySeenCards,
}: RecentlySeenCardsProps) {
  if (recentlySeenCards && recentlySeenCards.length === 7) {
    return (
      <View className="w-full h-full justify-center items-center">
        <Text className="font-intersemibolditalic xl:text-5xl text-3xl text-center text-orange-500 mt-16 mx-6">
          See the terms you practiced!
        </Text>
        <ScrollView className="w-full mt-6">
          {recentlySeenCards.map((card) => (
            <View
              key={card.key}
              className="relative mb-4 xl:mx-8 mx-2 bg-card rounded-lg shadow-md flex flex-row overflow-hidden"
            >
              <View className="flex-1 py-4 pl-4 pr-6">
                <Text
                  className={`${card.wrongAnswerCount > 0 ? "text-[#ff5757]" : ""} font-interbold text-xl`}
                >
                  {card.key}
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
        <View className="xl:max-w-[50vw] w-full px-3">
          <Button
            size="lg"
            onPress={() => {
              console.log("Clearing recently seen cards")
              setRecentlySeenCards(null)
            }}
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
