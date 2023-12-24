import { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS, FONT, SIZES } from "../constants/theme";
import { NotificationContext } from "../utils/NotificationContext";
import InputTemplate from "./InputTemplate";

const Timer = () => {
	const notificationContext = useContext(NotificationContext);
	const [timerValue, setTimerValue] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const defaultTimerValue = 3600;

	useEffect(() => {
		if (message !== "") {
			setTimeout(() => setMessage(""), 5000);
		}
	}, [message]);

	return (
		<View style={{ flex: 1 }}>
			{message === "" ? (
				<View
					style={{
						flex: 1,
						width: "100%",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Pressable
						style={{ marginBottom: -SIZES.small }}
						onPress={async () => {
							await notificationContext?.cancelPushNotification();
							setMessage(`Reminders turned off.`);
						}}
					>
						<Text
							style={{
								fontFamily: FONT.regular,
								fontSize: 24,
								// textDecorationLine: "line-through",
								opacity: 0.7,
								color: COLORS.gray,
							}}
						>
							stop reminders
						</Text>
					</Pressable>
					<InputTemplate
						input={timerValue}
						btnText="Set Timer"
						unitText="sec"
						handleInputChange={(text: string) => {
							const numericText = text.replace(/[^0-9]/g, "");
							setTimerValue(numericText);
						}}
						handlePress={async () => {
							await notificationContext?.registerForPushNotificationsAsync();
							await notificationContext?.cancelPushNotification();
							await notificationContext?.schedulePushNotification(
								parseInt(timerValue) === 0
									? defaultTimerValue
									: parseInt(timerValue)
							);
							setMessage(
								`You will be reminded after every ${
									timerValue === ""
										? defaultTimerValue
										: timerValue
								} seconds.`
							);
							setTimerValue("");
						}}
					/>
				</View>
			) : (
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							fontFamily: FONT.medium,
							paddingHorizontal: SIZES.large,
							fontSize: 18,
							textAlign: "center",
						}}
					>
						{message}
					</Text>
				</View>
			)}
		</View>
	);
};

export default Timer;
