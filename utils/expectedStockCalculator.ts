import { Medicine } from "@/types/medicine";
import dayjs from "dayjs";

export function expectedStockCalculator(medicine: Medicine) {
	const daysElapsed = medicine.creationDate
		? dayjs().diff(dayjs(medicine.creationDate), "day")
		: 0;
	const expectedStock = medicine.amount - daysElapsed * medicine.dosage;
	return expectedStock;
}
