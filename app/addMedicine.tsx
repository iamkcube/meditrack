import MedicineForm from "@/components/MedicineForm";
import { useMedicineContext } from "@/context/MedicineContext";
import { Medicine } from "@/types/medicine";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useTheme, Text } from "react-native-paper";

export default function AddMedicine() {
	const { addMedicine } = useMedicineContext();
	const router = useRouter();
	const theme = useTheme();

	const handleAddMedicine = (newMedicine: Medicine) => {
		addMedicine(newMedicine);
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
				Add Medicine
			</Text>
			<MedicineForm onSubmit={handleAddMedicine} />
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
		backgroundColor: "#ffffff",
		padding: 16,
	},
});
