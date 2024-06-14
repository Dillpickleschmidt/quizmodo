import { View, Animated } from "react-native"
import React, { useEffect, useRef } from "react"
import { Text } from "../ui/text"
import { Input } from "../ui/input"
import { GripVertical } from "@/lib/icons/GripVertical"
import { CustomIcon } from "../homeRoute/CustomIcon"

type AddCardProps = {
  term: string
  mnemonic: string
  categories: { [key: string]: string }
  onTermChange: (text: string) => void
  onCategoryChange: (category: string, text: string) => void
  isActive?: boolean
}

export default function AddCard({
  term,
  mnemonic,
  categories,
  onTermChange,
  onCategoryChange,
  isActive,
}: AddCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: isActive ? 0.93 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [isActive])

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
      className="my-2 w-full rounded-xl border border-card-foreground bg-card shadow-lg"
    >
      <View className="pb-1 pt-6">
        <View className="flex flex-row">
          {/* Term */}
          <View className="flex-grow">
            <Input
              className="mx-6 border-x-0 border-t-0 border-card-foreground bg-transparent px-2 py-3 font-intermedium !text-xl"
              value={term}
              onChangeText={onTermChange}
            />
            <Text className="ml-6 pb-3 pt-2 font-interblack text-sm">Term</Text>
          </View>
          <View className="mr-6 mt-8">
            <CustomIcon icon={<GripVertical />} size={28} color="text-card-foreground" />
          </View>
        </View>
        {Object.keys(categories).map((category) => (
          <View key={category}>
            {/* Answers */}
            <Input
              className="mx-6 border-x-0 border-t-0 border-card-foreground bg-transparent px-2 py-3 font-intermedium !text-xl"
              value={categories[category]}
              onChangeText={(text) => onCategoryChange(category, text)}
            />
            <Text className="ml-6 pb-4 pt-2 font-interblack text-sm">{category}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  )
}
