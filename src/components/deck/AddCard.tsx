import { View } from "react-native"
import React from "react"
import { Text } from "../ui/text"
import { Input } from "../ui/input"

type AddCardProps = {
  term: string
  categories: { [key: string]: string }
  onTermChange: (text: string) => void
  onCategoryChange: (category: string, text: string) => void
}

export default function AddCard({
  term,
  categories,
  onTermChange,
  onCategoryChange,
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
        {Object.keys(categories).map((category) => (
          <View key={category}>
            <Input
              className="bg-transparent border-x-0 border-t-0 border-b border-primary py-2 mx-6 px-2 !text-xl font-intermedium"
              value={categories[category]}
              onChangeText={(text) => onCategoryChange(category, text)}
            />
            <Text className="ml-6 py-4 font-interblack text-sm">{category}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
