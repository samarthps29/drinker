import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import {
	Image,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	Vibration,
	View,
} from "react-native";
import InputTemplate from "../../components/InputTemplate";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import { HistoryContext } from "../../utils/HistoryContext";
import { HistoryObject } from "../../utils/TypeDeclaration";

const currDate = dayjs().format("DD-MM-YYYY");

const Home = () => {
	const historyContext = useContext(HistoryContext);
	const [target, setTarget] = useState<number | null>(null);
	const [remaining, setRemaining] = useState<number | null>(null);
	const [drinkAmount, setDrinkAmount] = useState<string>("");
	const [targetAmount, setTargetAmount] = useState<string>("");
	const [shouldSave, setShouldSave] = useState(false);
	const [press, setPress] = useState<boolean>(false);

	// TODO: There is an extra non-operational useEffect call on the initial load
	// TODO: The "updated" variable in saveData in updated asynchrounously
	// but updating it synchronously breaks the code as of now

	const saveData = (clear: boolean = false) => {
		let updated = false;
		if ((target && remaining && target !== 0 && remaining !== 0) || clear) {
			const updatedItem: HistoryObject = {
				date: currDate,
				remainingAmount: clear ? 0 : remaining,
				targetAmount: clear ? 0 : target,
			};

			historyContext?.setHistArr((histArr) =>
				histArr.map((item) => {
					if (item.date === currDate) {
						updated = true;
						return updatedItem;
					} else return item;
				})
			);

			if (!updated)
				historyContext?.setHistArr((histArr) => [
					...histArr,
					updatedItem,
				]);
		}
		setShouldSave(false);
	};

	useEffect(() => {
		if (historyContext?.histArr && historyContext.histArr.length > 0) {
			const filteredArr = historyContext?.histArr.filter(
				(item) => item.date === currDate
			);

			if (filteredArr?.length !== 0) {
				setTarget(filteredArr[0].targetAmount);
				setRemaining(filteredArr[0].remainingAmount);
			}
		}
		(async () => {
			if (historyContext?.histArr.length !== 0)
				await AsyncStorage.setItem(
					"histArr",
					JSON.stringify(historyContext?.histArr)
				);
		})();
	}, [historyContext?.histArr]);

	useEffect(() => {
		if (shouldSave) saveData();
	}, [target, remaining, shouldSave]);

	return (
		<SafeAreaView style={styles.screenContainer}>
			<StatusBar backgroundColor={COLORS.lightWhite} hidden />
			<View style={styles.contentContainer}>
				<View style={styles.imageContainer}>
					<Image
						source={require("../../assets/images/home.png")}
						style={{
							flex: 1,
							height: undefined,
							width: undefined,
							alignSelf: "stretch",
						}}
					/>
				</View>
				<View style={styles.textContainer}>
					<Text
						style={{
							fontFamily: FONT.bold,
							fontSize: 44,
							color: "#1d214c",
						}}
					>
						{target && remaining ? target - remaining : 0} mL
					</Text>

					<Text
						style={{
							fontFamily: FONT.medium,
							fontSize: 18,
							color: "#1d214c",
							marginTop: 2,
						}}
					>
						{remaining
							? remaining >= 0
								? `Remaining: ${remaining} mL`
								: `Extra: ${-remaining} mL`
							: `Remaining: 0 mL`}
					</Text>
				</View>

				<View style={styles.inputContainer}>
					{!press ? (
						<TouchableWithoutFeedback
							delayLongPress={1500}
							onPress={() => setPress((prev) => !prev)}
							onLongPress={() => {
								saveData(true);
								Vibration.vibrate(100);
							}}
						>
							<View
								style={{
									backgroundColor: "#e5effc",
									padding: SIZES.xLarge,
									borderRadius: 100,
									marginVertical: SIZES.xLarge,
								}}
							>
								<Feather name="plus" size={24} color="black" />
							</View>
						</TouchableWithoutFeedback>
					) : target === null || target === 0 ? (
						<InputTemplate
							input={targetAmount}
							btnText="Target"
							unitText="mL"
							handleInputChange={(text: string) => {
								const numericText = text.replace(/[^0-9]/g, "");
								setTargetAmount(numericText);
							}}
							handlePress={() => {
								setTarget(
									parseInt(
										targetAmount === "" ? "0" : targetAmount
									)
								);
								setRemaining(
									parseInt(
										targetAmount === "" ? "0" : targetAmount
									)
								);
								setTargetAmount("");
								setShouldSave(true);
								setPress((prev) => !prev);
							}}
						/>
					) : (
						<InputTemplate
							input={drinkAmount}
							btnText="Drink"
							unitText="mL"
							handleInputChange={(text: string) => {
								const numericText = text.replace(/[^0-9]/g, "");
								setDrinkAmount(numericText);
							}}
							handlePress={() => {
								setRemaining((prev) =>
									prev
										? prev -
										  parseInt(
												drinkAmount === ""
													? "0"
													: drinkAmount
										  )
										: 0
								);
								setDrinkAmount("");
								setShouldSave(true);
								setPress((prev) => !prev);
							}}
						/>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: COLORS.lightWhite,
		// marginTop: StatusBar.currentHeight,
	},
	contentContainer: {
		flex: 1,
		padding: SIZES.medium,
		backgroundColor: COLORS.lightWhite,
		marginBottom: 84, // height of Tab Bar
	},
	imageContainer: {
		borderRadius: SIZES.medium,
		overflow: "hidden",
		height: "45%",
		width: "100%",
		backgroundColor: "transparent",
		marginBottom: "8%",
	},
	textContainer: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "transparent",
		paddingVertical: SIZES.xLarge,
		width: "100%",
		borderRadius: SIZES.medium,
	},
	inputContainer: {
		height: "25%",
		width: "100%",
		backgroundColor: "transparent",
		alignItems: "center",
	},
});
