import { useContext } from "react";
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import { HistoryContext } from "../../utils/HistoryContext";

const History = () => {
	const context = useContext(HistoryContext);
	return (
		<SafeAreaView style={styles.screenContainer}>
			<StatusBar hidden />
			<View style={styles.contentContainer}>
				<Text style={{ fontFamily: FONT.bold, fontSize: 40 }}>
					History
				</Text>

				<FlatList
					showsVerticalScrollIndicator={false}
					data={context?.histArr}
					renderItem={({ item }) => {
						return (
							<View
								style={{
									paddingHorizontal: SIZES.medium,
									paddingVertical: SIZES.medium,
									width: "100%",
									// backgroundColor: `${
									// 	item.remainingAmount >= 0
									// 		? "#F0DBDB"
									// 		: "#CEEDC7"
									// }`,
									backgroundColor: `${
										item.remainingAmount
											? item.remainingAmount >= 0
												? "#f0c7c7"
												: "#c5edbc"
											: "#f0c7c7"
									}`,
									borderRadius: SIZES.small,
								}}
							>
								<Text
									style={{
										fontFamily: FONT.bold,
										fontSize: 18,
									}}
								>
									{item.date}
								</Text>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										marginTop: 6,
										backgroundColor: "transparent",
									}}
								>
									<Text
										style={{
											fontFamily: FONT.regular,
											fontSize: 16,
										}}
									>
										Target: {item.targetAmount} mL
									</Text>
									<Text
										style={{
											fontFamily: FONT.regular,
											fontSize: 16,
										}}
									>
										{item.remainingAmount
											? item.remainingAmount >= 0
												? `Remaining: ${item.remainingAmount} mL`
												: `Extra: ${-item.remainingAmount} mL`
											: `Remaining: 0 mL`}
									</Text>
								</View>
							</View>
						);
					}}
					contentContainerStyle={{ rowGap: SIZES.xxSmall }}
				/>
			</View>
		</SafeAreaView>
	);
};

export default History;

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: COLORS.lightWhite,
		// marginTop: StatusBar.currentHeight,
	},
	contentContainer: {
		flex: 1,
		paddingTop: SIZES.large,
		paddingHorizontal: SIZES.medium,
		backgroundColor: COLORS.lightWhite,
		marginBottom: 84,
		gap: SIZES.medium,
	},
});
