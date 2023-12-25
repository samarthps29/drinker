import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { createContext, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

const schedulePushNotification = async (timer: number) => {
	Notifications.scheduleNotificationAsync({
		content: {
			title: "WATER !!!",
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

export const NotificationContext = createContext<{
	schedulePushNotification: (timer: number) => Promise<void>;
	cancelPushNotification: () => Promise<void>;
	registerForPushNotificationsAsync: () => Promise<void>;
} | null>(null);

export const NotificationProvider = ({ children }: React.PropsWithChildren) => {
	// not needed rn
	const [_, setNotification] = useState<Notifications.Notification | null>(
		null
	);

	useEffect(() => {
		const subscription = Notifications.addNotificationReceivedListener(
			(notification) => {
				// console.log(notification);
				setNotification(notification);
			}
		);

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<NotificationContext.Provider
			value={{
				schedulePushNotification,
				cancelPushNotification,
				registerForPushNotificationsAsync,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};
