import { Pressable, Text, TextInput, View } from "react-native";
import { FONT, SIZES } from "../constants/theme";

const InputTemplate = ({
	input,
	btnText,
	unitText,
	handleInputChange,
	handlePress,
}: {
	input: string;
	btnText: string;
	unitText: string;
	handleInputChange: (text: string) => void;
	handlePress: () => void;
}) => {
	return (
		<View
			style={{
				marginVertical: SIZES.xLarge,
				alignItems: "center",
				backgroundColor: "transparent",
			}}
		>
			<View
				style={{
					flexDirection: "row",
					width: "90%",
					gap: SIZES.small,
					backgroundColor: "transparent",
					alignItems: "center",
				}}
			>
				<TextInput
					style={{
						flexGrow: 1,
						backgroundColor: "#e5effc",
						padding: SIZES.medium,
						borderRadius: SIZES.medium,
						fontFamily: FONT.regular,
						fontSize: 18,
					}}
					value={input}
					onChangeText={handleInputChange}
					inputMode="numeric"
					keyboardType="numeric"
				/>
				<View
					style={{
						position: "absolute",
						right: "7%",
						backgroundColor: "transparent",
					}}
				>
					<Text
						style={{
							fontFamily: FONT.medium,
							fontSize: 18,
							color: "#1d214c",
							zIndex: 20,
						}}
					>
						{unitText}
					</Text>
				</View>
			</View>
			<Pressable
				style={{
					width: "100%",
					alignItems: "center",
					marginTop: SIZES.medium,
				}}
				onPress={handlePress}
			>
				<View
					style={{
						backgroundColor: "#384887",
						paddingVertical: SIZES.small,
						paddingHorizontal: SIZES.medium,
						borderRadius: SIZES.medium,
					}}
				>
					<Text
						style={{
							fontFamily: FONT.bold,
							color: "white",
							fontSize: 16,
							textAlign: "center",
						}}
					>
						{btnText}
					</Text>
				</View>
			</Pressable>
		</View>
	);
};

export default InputTemplate;
