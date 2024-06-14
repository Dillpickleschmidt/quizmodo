import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Entry } from "@/types"

type StudyListProps = {
  data: Entry[]
}

export default function StudyList({ data }: StudyListProps) {
  const [quizData, setQuizData] = useState<Entry[]>([])

  useEffect(() => {
    // Sort data based on the order property before setting it
    const sortedData = data.sort((a, b) => a.order - b.order)
    setQuizData(sortedData) // Directly set the sorted data from JSON
  }, [data])

  return (
    <>
      {quizData.map((entry, index) => (
        <View key={index} className="my-2 rounded-xl bg-card p-6">
          <Text className="font-interbold text-2xl !text-orange-500 text-primary">{entry.key}</Text>
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
        </View>
      ))}
    </>
  )
}
