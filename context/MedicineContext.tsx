import React, { createContext, useContext, useState, useEffect } from "react";
import { Medicine } from "@/types/medicine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import * as Notifications from "expo-notifications"; // Import for notifications

// Define the MedicineContext
interface MedicineContextProps {
	medicines: Medicine[];
	addMedicine: (medicine: Medicine) => void;
	updateMedicine: (updatedMedicine: Medicine) => void;
	removeMedicine: (id: number) => void;
}

const MedicineContext = createContext<MedicineContextProps | undefined>(
	undefined
);

// MedicineContext Provider
export const MedicineProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [medicines, setMedicines] = useState<Medicine[]>([]);

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
			} catch (error) {
				console.error(
					"Failed to save medicines to AsyncStorage",
					error
				);
			}
		};

		saveMedicines();
	}, [medicines]);

	// Function to calculate remaining stock
	const calculateRemainingStock = (medicine: Medicine): number => {
		const creationDate = dayjs(medicine.creationDate);
		const today = dayjs();
		const daysElapsed = today.diff(creationDate, "day");
		return medicine.amount - daysElapsed * medicine.dosage;
	};

	// Function to check stock and send notifications
	const checkStockLevels = () => {
		medicines.forEach((medicine) => {
			const remainingStock = calculateRemainingStock(medicine);

			if (
				medicine.stockThreshold !== undefined &&
				remainingStock <= medicine.stockThreshold
			) {
				sendNotification(medicine.name, remainingStock);
			}
		});
	};

	// Function to send notifications
	const sendNotification = async (
		medicineName: string,
		remainingStock: number
	) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Low Stock Alert",
				body: `${medicineName} is running low! Remaining stock: ${remainingStock}`,
			},
			trigger: null,
		});
	};

	// Periodic stock check
	useEffect(() => {
		const interval = setInterval(checkStockLevels, 24 * 60 * 60 * 1000); // Check every day

		return () => clearInterval(interval);
	}, [medicines]);

	// Add a new medicine
	const addMedicine = (medicine: Medicine) => {
		setMedicines((prevMedicines) => [...prevMedicines, medicine]);
	};

	// Update an existing medicine
	const updateMedicine = (updatedMedicine: Medicine) => {
		setMedicines((prevMedicines) =>
			prevMedicines.map((medicine) =>
				medicine.id === updatedMedicine.id ? updatedMedicine : medicine
			)
		);
	};

	// Remove a medicine by ID
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

// Custom hook to use the MedicineContext
export const useMedicineContext = (): MedicineContextProps => {
	const context = useContext(MedicineContext);
	if (!context) {
		throw new Error(
			"useMedicineContext must be used within a MedicineProvider"
		);
	}
	return context;
};
