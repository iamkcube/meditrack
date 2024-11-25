import AsyncStorage from "@react-native-async-storage/async-storage";
import { Medicine } from "@/types/medicine";

export class StorageService {
	static async saveMedicines(medicines: Medicine[]) {
		try {
			await AsyncStorage.setItem("medicines", JSON.stringify(medicines));
		} catch (error) {
			console.error("Failed to save medicines to AsyncStorage", error);
			throw error;
		}
	}

	static async loadMedicines(): Promise<Medicine[]> {
		try {
			const storedMedicines = await AsyncStorage.getItem("medicines");
			return storedMedicines ? JSON.parse(storedMedicines) : [];
		} catch (error) {
			console.error("Failed to load medicines from AsyncStorage", error);
			throw error;
		}
	}
}
