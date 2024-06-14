import { View, Animated, Pressable } from "react-native"
import React, { useEffect, useRef } from "react"
import { Text } from "../ui/text"
import { Input } from "../ui/input"
import { Grip } from "@/lib/icons/Grip"
import { Trash2 } from "@/lib/icons/Trash2"
import { CustomIcon } from "../homeRoute/CustomIcon"
import SwipeableItem, { useSwipeableItemParams } from "react-native-swipeable-item"

type CardProps = {
  term: string
  mnemonic: string
  categories: { [key: string]: string }
  onTermChange: (text: string) => void
  onCategoryChange: (category: string, text: string) => void
  onDelete: () => void
  isActive?: boolean
  drag: () => void
}

const UnderlayLeft = ({ onDelete }: { onDelete: () => void }) => {
  const { close } = useSwipeableItemParams<CardProps>()
  return (
    <View className="ml-4 flex-1 items-end justify-center rounded-xl border border-background bg-orange-400 pr-7">
      <Pressable
        onPress={() => {
          onDelete()
          close()
        }}
      >
        <CustomIcon icon={<Trash2 />} size={28} color="text-primary-foreground" />
      </Pressable>
    </View>
  )
}

export default function Card({
  term,
  mnemonic,
  categories,
  onTermChange,
  onCategoryChange,
  onDelete,
  isActive,
  drag,
}: CardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: isActive ? 0.93 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [isActive])

  return (
    <View className="my-2 mr-4 overflow-hidden pl-4">
      <SwipeableItem
        item={{ term, mnemonic, categories, onTermChange, onCategoryChange, onDelete }}
        renderUnderlayLeft={() => <UnderlayLeft onDelete={onDelete} />}
        snapPointsLeft={[75]}
        activationThreshold={5}
      >
        <Pressable onLongPress={drag} delayLongPress={150} className="w-full items-center">
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
            }}
            className={`w-full rounded-xl border border-card-foreground bg-card shadow-lg ${isActive && "opacity-85"}`}
          >
            <View className="pb-1 pt-6">
              <View className="flex flex-row justify-between">
                {/* Term */}
                <View className="flex-grow">
                  <Input
                    className="mx-6 border-x-0 border-t-0 border-card-foreground bg-transparent px-2 py-3 font-intermedium !text-xl"
                    value={term}
                    onChangeText={onTermChange}
                    hitSlop={{ left: 50, right: 50, top: 10, bottom: 10 }} // Adjust as necessary
                  />
                  <Text className="ml-6 pb-3 pt-2 font-interblack text-sm">Term</Text>
                </View>
                <View className="mr-6 mt-8 flex w-12 flex-row justify-center">
                  <CustomIcon icon={<Grip />} size={28} color="text-card-foreground" />
                </View>
              </View>
              {Object.keys(categories).map((category) => (
                <View key={category}>
                  {/* Answers */}
                  <Input
                    className="mx-6 border-x-0 border-t-0 border-card-foreground bg-transparent px-2 py-3 font-intermedium !text-xl"
                    value={categories[category]}
                    onChangeText={(text) => onCategoryChange(category, text)}
                    hitSlop={{ left: 50, right: 50, top: 10, bottom: 10 }} // Adjust as necessary
                  />
                  <Text className="ml-6 pb-4 pt-2 font-interblack text-sm">{category}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </Pressable>
      </SwipeableItem>
    </View>
  )
}
