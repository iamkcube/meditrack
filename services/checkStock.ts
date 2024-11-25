import { NotificationService } from "@/services/notificationHandler";
import { Medicine } from "@/types/medicine";
import { expectedStockCalculator } from "@/utils/expectedStockCalculator";

export class StockCalculatorService {
	static async checkStockLevels(medicines: Medicine[]) {
		for (const medicine of medicines) {
			const remainingStock = expectedStockCalculator(medicine);

			if (
				medicine.stockThreshold !== undefined &&
				remainingStock <= medicine.stockThreshold
			) {
				await NotificationService.sendStockAlert(
					medicine.name,
					remainingStock
				);
			}
		}
	}
}
