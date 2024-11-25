import { Medicine } from "@/types/medicine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import React, { createContext, useContext, useEffect, useState } from "react";
import { expectedStockCalculator } from "@/utils/expectedStockCalculator";

const STOCK_CHECK_TASK = "STOCK_CHECK_TASK";

// Define the task
TaskManager.defineTask(STOCK_CHECK_TASK, async () => {
	try {
		const storedMedicines = await AsyncStorage.getItem("medicines");
		if (storedMedicines) {
			const medicines = JSON.parse(storedMedicines);
			await checkStockLevels(medicines);
		}
		return BackgroundFetch.BackgroundFetchResult.NewData;
	} catch (error) {
		console.error("Background task failed:", error);
		return BackgroundFetch.BackgroundFetchResult.Failed;
	}
});

interface MedicineContextProps {
	medicines: Medicine[];
	addMedicine: (medicine: Medicine) => void;
	updateMedicine: (updatedMedicine: Medicine) => void;
	removeMedicine: (id: number) => void;
}

const MedicineContext = createContext<MedicineContextProps | undefined>(
	undefined
);

// Function to check stock and send notifications
const checkStockLevels = async (medicines: Medicine[]) => {
	for (const medicine of medicines) {
		const remainingStock = expectedStockCalculator(medicine);

		if (
			medicine.stockThreshold !== undefined &&
			remainingStock <= medicine.stockThreshold
		) {
			await sendNotification(medicine.name, remainingStock);
		}
	}
};

// Function to send notifications
const sendNotification = async (
	medicineName: string,
	remainingStock: number
) => {
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
};

// Setup background task
const setupBackgroundTask = async () => {
	try {
		await BackgroundFetch.registerTaskAsync(STOCK_CHECK_TASK, {
			minimumInterval: 60 * 60, // 1 hour in seconds
			stopOnTerminate: false, // Task continues after app is closed
			startOnBoot: true, // Task starts when device restarts
		});
	} catch (err) {
		console.error("Task Registration failed:", err);
	}
};

export const MedicineProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [medicines, setMedicines] = useState<Medicine[]>([]);

	// Initialize notifications and background task
	useEffect(() => {
		const initialize = async () => {
			// Request notification permissions
			const { status } = await Notifications.requestPermissionsAsync();
			if (status !== "granted") {
				console.warn("Notification permissions not granted");
			}

			// Configure notifications
			await Notifications.setNotificationChannelAsync("stock-alerts", {
				name: "Stock Alerts",
				importance: Notifications.AndroidImportance.HIGH,
				vibrationPattern: [0, 250, 250, 250],
			});

			// Setup background task
			await setupBackgroundTask();
		};

		initialize();
	}, []);

	// Load medicines from AsyncStorage when the app starts
	useEffect(() => {
		const loadMedicines = async () => {
			try {
				const storedMedicines = await AsyncStorage.getItem("medicines");
				if (storedMedicines) {
					setMedicines(JSON.parse(storedMedicines));
				}
			} catch (error) {
				console.error(
					"Failed to load medicines from AsyncStorage",
					error
				);
			}
		};

		loadMedicines();
	}, []);

	// Save medicines to AsyncStorage whenever the list changes
	useEffect(() => {
		const saveMedicines = async () => {
			try {
				await AsyncStorage.setItem(
					"medicines",
					JSON.stringify(medicines)
				);
				// Trigger an immediate stock check when medicines change
				await checkStockLevels(medicines);
			} catch (error) {
				console.error(
					"Failed to save medicines to AsyncStorage",
					error
				);
			}
		};

		saveMedicines();
	}, [medicines]);

	const addMedicine = (medicine: Medicine) => {
		setMedicines((prevMedicines) => [...prevMedicines, medicine]);
	};

	const updateMedicine = (updatedMedicine: Medicine) => {
		setMedicines((prevMedicines) =>
			prevMedicines.map((medicine) =>
				medicine.id === updatedMedicine.id ? updatedMedicine : medicine
			)
		);
	};

	const removeMedicine = (id: number) => {
		setMedicines((prevMedicines) =>
			prevMedicines.filter((medicine) => medicine.id !== id)
		);
	};

	return (
		<MedicineContext.Provider
			value={{ medicines, addMedicine, updateMedicine, removeMedicine }}
		>
			{children}
		</MedicineContext.Provider>
	);
};

export const useMedicineContext = (): MedicineContextProps => {
	const context = useContext(MedicineContext);
	if (!context) {
		throw new Error(
			"useMedicineContext must be used within a MedicineProvider"
		);
	}
	return context;
};
