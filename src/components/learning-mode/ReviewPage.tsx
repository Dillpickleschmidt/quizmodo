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
    // Create a Map to filter out duplicate keys and keep only the last occurrence
    const uniqueCards = Array.from(
      new Map(recentlySeenCards.map((card) => [card.key, card])).values(),
    )

    return (
      <View className="h-full w-full items-center justify-center">
        <Text className="mx-6 mt-16 text-center font-intersemibolditalic text-3xl text-orange-500 xl:text-5xl">
          See the terms you practiced!
        </Text>
        <ScrollView className="mt-6 w-full">
          {uniqueCards.map((card) => (
            <View
              key={card.key}
              className="relative mx-2 mb-4 flex flex-row overflow-hidden rounded-lg bg-card shadow-md xl:mx-8"
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
                className={`absolute right-0 h-full ${card.wrongAnswerCount > 0 ? "w-4 bg-red-500" : "w-2 bg-emerald-500/50"}`}
              ></View>
            </View>
          ))}
        </ScrollView>
        <View className="w-full px-3 xl:max-w-[50vw]">
          <Button
            size="lg"
            onPress={() => {
              console.log("Clearing recently seen cards")
              setRecentlySeenCards(null)
            }}
            className="mb-4 mt-2 w-full bg-orange-500"
          >
            <Text>Continue</Text>
          </Button>
        </View>
      </View>
    )
  }

  return null
}
