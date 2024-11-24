import { useMedicineContext } from "@/context/MedicineContext";
import { Medicine } from "@/types/medicine";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	Button,
	HelperText,
	Text,
	TextInput,
	useTheme,
} from "react-native-paper";

export default function RestockMedicine() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const { medicines, updateMedicine } = useMedicineContext();
	const [medicineToEdit, setMedicineToEdit] = useState<Medicine | null>(null);
	const theme = useTheme();

	const [amount, setAmount] = useState<number | null>(null);

	useEffect(() => {
		if (id) {
			const foundMedicine = medicines.find(
				(med) => med.id === Number(id)
			);
			setMedicineToEdit(foundMedicine || null);
		}
	}, [id, medicines]);

	const handleRestock = () => {
		if (!amount || !medicineToEdit) {
			alert("Please enter a valid stock amount.");
			return;
		}

		updateMedicine({
			...medicineToEdit,
			amount: medicineToEdit?.amount + amount,
			updatedDate: dayjs().toISOString(),
		});
		router.push("/");
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
				Restock {medicineToEdit?.name}
			</Text>
			{medicineToEdit ? (
				<View>
					<TextInput
						label="Add Restock Amount"
						onChangeText={(text) => setAmount(Number(text))}
						keyboardType="numeric"
						style={styles.input}
						mode="outlined"
					/>
					<HelperText
						type="error"
						visible={amount == null || amount == undefined}
					>
						Amount is required.
					</HelperText>
					<Button
						mode="contained"
						dark={theme.dark}
						onPress={handleRestock}
						style={styles.button}
					>
						Restock
					</Button>
				</View>
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
		justifyContent: "space-between",
	},
	input: {
		marginBottom: 12,
	},
	button: {
		marginTop: 16,
	},
});
