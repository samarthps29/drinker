import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

const NotificationService = () => {
	const [_, setExpoPushToken] = useState<string | null>(null);
	const [__, setNotification] = useState<Notifications.Notification | null>(
		null
	);

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		const subscription = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification);
			}
		);

		return () => {
			subscription.remove();
		};
	}, []);
};

const schedulePushNotification = async (timer: number) => {
	Notifications.scheduleNotificationAsync({
		content: {
			title: "Remember to drink water!",
		},
		trigger: {
			seconds: timer,
			repeats: true,
		},
	})
		.then(() => console.log("Scheduled notification successfully"))
		.catch(() => {
			console.log("Could not schedule notification");
		});
};

const cancelPushNotification = async () => {
	Notifications.cancelAllScheduledNotificationsAsync()
		.then(() => {
			console.log("All scheduled notifications cancelled");
		})
		.catch(() => {
			console.log("An error occurred while cancelling the notifications");
		});
};

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
	// checks if it is a real device and not an emulator
	if (Device.isDevice) {
		const existingSettings = await Notifications.getPermissionsAsync();
		let newSettings;
		if (!existingSettings.granted) {
			newSettings = await Notifications.requestPermissionsAsync();
		}
		if (!newSettings?.granted) {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notifications.getDevicePushTokenAsync()).data;
		console.log(token);
	}
	return token;
}

export {
	NotificationService,
	cancelPushNotification,
	schedulePushNotification,
};
