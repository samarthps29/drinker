import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
	Pressable,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import { HistoryContext } from "../../utils/HistoryContext";
import History from "../../components/History";
import Timer from "../../components/Timer";

const Two = () => {
	const context = useContext(HistoryContext);
	const router = useRouter();
	const [option, setOption] = useState(true);
	dayjs.extend(customParseFormat);

	return (
		<SafeAreaView style={styles.screenContainer}>
			<StatusBar hidden />
			<View style={styles.contentContainer}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "baseline",
						justifyContent: "space-between",
					}}
				>
					<Pressable onPress={() => setOption(true)}>
						<Text
							style={{
								fontFamily: FONT.bold,
								fontSize: option ? 40 : 20,
							}}
						>
							History
						</Text>
					</Pressable>

					<Pressable
						onPress={() => {
							setOption(false);
						}}
					>
						<Text
							style={{
								fontFamily: FONT.medium,
								fontSize: !option ? 40 : 20,
							}}
						>
							Timer
						</Text>
					</Pressable>
				</View>
				{option ? (
					<History dataArr={context?.histArr || []} />
				) : (
					<Timer />
				)}
			</View>
		</SafeAreaView>
	);
};

export default Two;

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
