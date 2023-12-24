import { Tabs } from "expo-router";
import { Text, StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarHideOnKeyboard: true,
				headerShown: false,
				tabBarStyle: {
					borderTopWidth: 0,
					shadowOpacity: 0,
					elevation: 0,
					backgroundColor: COLORS.lightWhite,
					position: "absolute",
					height: 60,
					marginBottom: SIZES.xLarge,
					left: 110,
					right: 110,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarLabel: ({ focused }) => {
						return (
							<Text
								style={[
									styles.tabBarLabel,
									{ color: focused ? "black" : COLORS.gray },
								]}
							>
								Drinking
							</Text>
						);
					},
					tabBarIcon: () => null,
				}}
			/>
			<Tabs.Screen
				name="History"
				options={{
					tabBarLabel: ({ focused }) => {
						return (
							<Text
								style={[
									styles.tabBarLabel,
									{ color: focused ? "black" : COLORS.gray },
								]}
							>
								History
							</Text>
						);
					},

					tabBarIcon: () => null,
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBarLabel: {
		fontFamily: FONT.regular,
		fontSize: 16,
		marginBottom: 18,
	},
});
