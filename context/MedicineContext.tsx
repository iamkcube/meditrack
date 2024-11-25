import { Medicine } from "@/types/medicine";
import React, { createContext, useContext, useEffect, useState } from "react";
import { StorageService } from "@/services/storage";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import {
	STOCK_CHECK_TASK,
	NotificationService,
} from "@/services/notificationHandler";
import { StockCalculatorService } from "@/services/checkStock";

// Define the task
TaskManager.defineTask(STOCK_CHECK_TASK, async () => {
	try {
		const medicines = await StorageService.loadMedicines();
		await StockCalculatorService.checkStockLevels(medicines);
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

export const MedicineProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [medicines, setMedicines] = useState<Medicine[]>([]);

	// Initialize services
	useEffect(() => {
		const initialize = async () => {
			await NotificationService.initialize();
			await NotificationService.setupBackgroundTask();
		};

		initialize();
	}, []);

	// Load medicines
	useEffect(() => {
		const loadMedicines = async () => {
			try {
				const loadedMedicines = await StorageService.loadMedicines();
				setMedicines(loadedMedicines);
			} catch (error) {
				console.error("Failed to load medicines", error);
			}
		};

		loadMedicines();
	}, []);

	// Save medicines and check stock
	useEffect(() => {
		const updateMedicines = async () => {
			try {
				await StorageService.saveMedicines(medicines);
				await StockCalculatorService.checkStockLevels(medicines);
			} catch (error) {
				console.error("Failed to update medicines", error);
			}
		};

		updateMedicines();
	}, [medicines]);

	const addMedicine = (medicine: Medicine) => {
		setMedicines((prev) => [...prev, medicine]);
	};

	const updateMedicine = (updatedMedicine: Medicine) => {
		setMedicines((prev) =>
			prev.map((medicine) =>
				medicine.id === updatedMedicine.id ? updatedMedicine : medicine
			)
		);
	};

	const removeMedicine = (id: number) => {
		setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
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
