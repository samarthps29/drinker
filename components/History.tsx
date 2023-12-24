import dayjs from "dayjs";
import { FlatList, View, Text } from "react-native";
import { FONT, SIZES } from "../constants/theme";
import { HistoryObject } from "../utils/TypeDeclaration";

const History = ({ dataArr }: { dataArr: HistoryObject[] }) => {
	return (
		<View>
			{dataArr?.length === 0 ? (
				<View
					style={{
						backgroundColor: "transparent",
						width: "100%",
						alignItems: "center",
						justifyContent: "center",
						flex: 1,
					}}
				>
					<Text style={{ fontFamily: FONT.medium, fontSize: 16 }}>
						Nothing Here
					</Text>
				</View>
			) : (
				<FlatList
					showsVerticalScrollIndicator={false}
					data={dataArr}
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
									// TODO: move these colors to constants
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
									{dayjs(item.date, "DD-MM-YYYY").format(
										"DD MMM YYYY"
									)}
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
			)}
		</View>
	);
};

export default History;
