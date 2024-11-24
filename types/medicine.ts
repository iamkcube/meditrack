export interface Medicine {
	id: number;
	name: string;
	amount: number;
	dosage: number; // Daily dosage amount
	stockThreshold?: number; // Optional low-stock alert threshold
	creationDate?: string; // Optional property for tracking the start date (ISO string)
	expiryDate?: string; // Optional property for expiry tracking
}
