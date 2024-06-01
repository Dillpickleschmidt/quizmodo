import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { CardObject } from "@/types"
import MultipleChoice from "./multiple-choice/MultipleChoice"
import WriteComponent from "./write/WriteComponent"
import { useMemo } from "react"
import { useLearningModeContext } from "@/context/LearningModeContext"

type CardTypeSwitchProps = {
  data: CardObject
}

export default function CardTypeSwitch({ data }: CardTypeSwitchProps) {
  const { currentCardIndex, correctEntry, hasUserAnswered } = useLearningModeContext()

  const currentKey = useMemo(() => Object.keys(data)[currentCardIndex], [data, currentCardIndex])

  const currentCardStyle = data[currentKey]?.cardStyle

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
    <View className="xl:max-w-[50vw] w-full">
      <Text className={`mt-12 text-3xl font-interblack ${hasUserAnswered && "text-white"}`}>
        {correctEntry?.key}
      </Text>
      {renderComponent()}
    </View>
  )
}
