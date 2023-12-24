import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function Test() {
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		// Listeners registered by this method will be called whenever a notification is received while the app is running
		const subscription = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification);
			}
		);

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "space-around",
			}}
		>
			<Text>Your expo push token: {expoPushToken}</Text>
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "white",
				}}
			>
				<Text>
					Title: {notification && notification.request.content.title}{" "}
				</Text>
				<Text>
					Body: {notification && notification.request.content.body}
				</Text>
				<Text>
					Data:{" "}
					{notification &&
						JSON.stringify(notification.request.content.data)}
				</Text>
			</View>
			<Button
				title="Press to schedule a notification"
				onPress={async () => {
					await schedulePushNotification();
				}}
			/>
			<Button
				title="Press to cancel a notification"
				onPress={async () => {
					await cancelPushNotification();
				}}
			/>
		</View>
	);
}

async function schedulePushNotification() {
	Notifications.scheduleNotificationAsync({
		content: {
			title: "Remember to drink water!",
		},
		trigger: {
			seconds: 5,
			repeats: true,
		},
	})
		.then(() => console.log("Scheduled notification successfully"))
		.catch(() => {
			console.log("Could not schedule notification");
		});
}

async function cancelPushNotification() {
	Notifications.cancelAllScheduledNotificationsAsync()
		.then(() => {
			console.log("All scheduled notifications cancelled");
		})
		.catch(() => {
			console.log("An error occurred while cancelling the notifications");
		});
}

async function registerForPushNotificationsAsync() {
	let token;
	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notifications.getDevicePushTokenAsync()).data;
		console.log(token);
	}

	return token;
}
