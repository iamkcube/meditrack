import dayjs from "dayjs";

export function expectedStockCalculator(
	creationDate: string,
	amount: number,
	dosage: number
) {
	const daysElapsed = creationDate
		? dayjs().diff(dayjs(creationDate), "day")
		: 0;
	const expectedStock = amount - daysElapsed * dosage;
	return expectedStock;
}
