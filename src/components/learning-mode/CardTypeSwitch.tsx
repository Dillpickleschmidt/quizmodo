import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { EntryWithCardProperties } from "@/types"
import MultipleChoice from "./multiple-choice/MultipleChoice"
import WriteComponent from "./write/WriteComponent"
import { useMemo } from "react"
import { useLearningModeContext } from "@/context/LearningModeContext"

type CardTypeSwitchProps = {
  data: EntryWithCardProperties[]
}

export default function CardTypeSwitch({ data }: CardTypeSwitchProps) {
  const { currentCardIndex, correctEntry, hasUserAnswered } = useLearningModeContext()

  const currentCard = useMemo(() => data[currentCardIndex], [data, currentCardIndex])

  const currentCardStyle = currentCard?.cardStyle

  function renderComponent() {
    switch (currentCardStyle) {
      case "multiple-choice":
        return <MultipleChoice data={data} shuffleInput={false} />
      case "write":
        return <WriteComponent data={data} shuffleInput={false} />
      default:
        return (
          <View>
            <Text>No questions</Text>
          </View>
        )
    }
  }

  return (
    <View className="w-full xl:max-w-[50vw]">
      <Text className={`mt-12 font-interblack text-3xl ${hasUserAnswered && "text-white"}`}>
        {correctEntry?.key}
      </Text>
      {renderComponent()}
    </View>
  )
}
