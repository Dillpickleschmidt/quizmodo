import { View } from "react-native"
import React from "react"
import { Text } from "../ui/text"
import { Input } from "../ui/input"

type AddCardProps = {
  term: string
  definition: string
  onTermChange: (text: string) => void
  onDefinitionChange: (text: string) => void
}

export default function AddCard({
  term,
  definition,
  onTermChange,
  onDefinitionChange,
}: AddCardProps) {
  return (
    <View className="w-full rounded-xl bg-card border border-dashed border-card-foreground my-2 shadow-lg">
      <View className="pt-7 pb-1">
        <Input
          className="bg-transparent border-x-0 border-t-0 border-b border-primary py-2 mx-6 px-2 !text-xl font-intermedium"
          value={term}
          onChangeText={onTermChange}
        />
        <Text className="ml-6 py-4 font-interblack text-sm">Term</Text>
        <Input
          className="bg-transparent border-x-0 border-t-0 border-b border-primary py-2 mx-6 px-2 !text-xl font-intermedium"
          value={definition}
          onChangeText={onDefinitionChange}
        />
        <Text className="ml-6 py-4 font-interblack text-sm">Definition</Text>
      </View>
    </View>
  )
}
