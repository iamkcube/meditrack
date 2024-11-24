export interface Medicine {
	id: number;
	name: string;
	amount: number;
	dosage: number; // Daily dosage amount
	creationDate: string; // Optional property for tracking the start date (ISO string)
	expiryDate?: string; // Optional property for expiry tracking
	stockThreshold?: number; // Optional low-stock alert threshold
}
