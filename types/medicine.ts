// /types/medicine.ts
export interface Medicine {
	id: number;
	name: string;
	amount: number;
	expiryDate?: string; // Optional property for expiry tracking
	stockThreshold?: number; // Optional low-stock alert threshold
}
