import { tableSchema } from "@nozbe/watermelondb";

// Define the schema for the medicines table
export const medicineSchema = tableSchema({
	name: "medicines",
	columns: [
		{ name: "name", type: "string" },
		{ name: "type", type: "string" },
		{ name: "stock", type: "number" },
	],
});
