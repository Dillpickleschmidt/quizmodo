import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useTheme, type ParamListBase, type TabNavigationState } from "@react-navigation/native"
import { withLayoutContext } from "expo-router"
import { Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const { Navigator } = createMaterialTopTabNavigator()

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator)

export default function MaterialTopTabsLayout() {
  const { colors } = useTheme()
  const screenWidth = Dimensions.get("window").width
  const sidePadding = 16 // Define your desired padding here
  const tabCount = 2 // Number of tabs
  const tabWidth = (screenWidth - 2 * sidePadding) / tabCount

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <MaterialTopTabs
        initialRouteName="index"
        screenOptions={{
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: "capitalize",
            fontWeight: "bold",
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.text,
            width: tabWidth, // Ensure the indicator width matches the tab width
            left: sidePadding, // Align the indicator with the tabs
          },
          tabBarScrollEnabled: false, // Disable scrolling to make the tabs fill the width
          tabBarItemStyle: { width: tabWidth },
          tabBarStyle: {
            backgroundColor: colors.background,
            paddingHorizontal: sidePadding, // Apply side padding
          },
          tabBarContentContainerStyle: {
            justifyContent: "center", // Center the tabs within the container
          },
        }}
      >
        <MaterialTopTabs.Screen
          name="index"
          options={{
            title: "Sets",
          }}
        />
        <MaterialTopTabs.Screen
          name="folders"
          options={{
            title: "Folders",
          }}
        />
      </MaterialTopTabs>
    </SafeAreaView>
  )
}
