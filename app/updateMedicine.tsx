import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useMedicineContext } from "@/context/MedicineContext";
import { Medicine } from "@/types/medicine";
import MedicineForm from "@/components/MedicineForm";

interface Props {
	medicineToUpdate: Medicine; // Medicine to be updated, passed as a prop
	onClose: () => void; // Close the modal or navigate back
}

export default function UpdateMedicine({ medicineToUpdate, onClose }: Props) {
	const { updateMedicine } = useMedicineContext();

	const handleUpdate = (updatedFields: Partial<Medicine>) => {
		// Merge existing medicine details with updated fields
		const updatedMedicine = {
			...medicineToUpdate,
			...updatedFields,
			amount: (updatedFields.amount ?? 0) + medicineToUpdate.amount, // Add restocked amount
		};

		updateMedicine(updatedMedicine);
		onClose();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Restock Medicine</Text>
			<MedicineForm
				onSubmit={(updatedFields: Partial<Medicine>) => {
					handleUpdate(updatedFields);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 16,
	},
});
