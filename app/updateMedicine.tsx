// pages/updateMedicine.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import MedicineForm from "@/components/MedicineForm";
import { Medicine } from "@/types/medicine";
import { useMedicineContext } from "@/context/MedicineContext";
import { useSearchParams } from "expo-router/build/hooks";
import { useTheme, Text } from "react-native-paper";

export default function UpdateMedicine() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const theme = useTheme();

	const { medicines, updateMedicine } = useMedicineContext();
	const [medicineToEdit, setMedicineToEdit] = useState<Medicine | null>(null);

	useEffect(() => {
		if (id) {
			const foundMedicine = medicines.find(
				(med) => med.id === Number(id)
			);
			setMedicineToEdit(foundMedicine || null);
		}
	}, [id, medicines]);

	const handleSubmit = (updatedFields: Partial<Medicine>) => {
		if (medicineToEdit) {
			updateMedicine({ ...medicineToEdit, ...updatedFields });
			router.push("/"); // Redirect to the home page
		}
	};

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.colors.background,
				},
			]}
		>
			<Text
				variant="headlineSmall"
				style={[styles.header, { color: theme.colors.onBackground }]}
			>
				Update {medicineToEdit?.name}
			</Text>
			{medicineToEdit ? (
				<MedicineForm
					onSubmit={handleSubmit}
					defaultValues={medicineToEdit}
				/>
			) : (
				<Text>Loading...</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	container: {
		flex: 1,
		padding: 16,
	},
});
