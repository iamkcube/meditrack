import dayjs from "dayjs";

export function formatDateWithOrdinal(date: string) {
	const day = dayjs(date).format("D");
	const ordinalSuffix = ["th", "st", "nd", "rd"][Number(day) % 10] || "th";
	const formattedDate = dayjs(date).format(`D[${ordinalSuffix}] MMMM YYYY`);
	return formattedDate;
}
