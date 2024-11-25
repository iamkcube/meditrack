import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";

export const STOCK_CHECK_TASK = "STOCK_CHECK_TASK";

export class NotificationService {
	static async initialize() {
		const { status } = await Notifications.requestPermissionsAsync();
		if (status !== "granted") {
			console.warn("Notification permissions not granted");
			return false;
		}

		await Notifications.setNotificationChannelAsync("stock-alerts", {
			name: "Stock Alerts",
			importance: Notifications.AndroidImportance.HIGH,
			vibrationPattern: [0, 250, 250, 250],
		});

		return true;
	}

	static async setupBackgroundTask() {
		try {
			await BackgroundFetch.registerTaskAsync(STOCK_CHECK_TASK, {
				minimumInterval: 60 * 60,
				stopOnTerminate: false,
				startOnBoot: true,
			});
		} catch (err) {
			console.error("Task Registration failed:", err);
		}
	}

	static async sendStockAlert(medicineName: string, remainingStock: number) {
		const notificationId = `stock-${medicineName}-${Date.now()}`;

		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Low Stock Alert",
				body: `${medicineName} is running low! Remaining stock: ${remainingStock}`,
				data: { medicineName, remainingStock },
			},
			identifier: notificationId,
			trigger: null,
		});
	}
}
