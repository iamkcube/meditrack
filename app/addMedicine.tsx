import MedicineForm from "@/components/MedicineForm";
import { useMedicineContext } from "@/context/MedicineContext";
import { Medicine } from "@/types/medicine";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function AddMedicine() {
	const { addMedicine } = useMedicineContext();
	const router = useRouter();
	const theme = useTheme();

	const handleAddMedicine = (newMedicine: Medicine) => {
		addMedicine(newMedicine);
		router.push("/"); // Navigate back to the home screen
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
			<MedicineForm onSubmit={handleAddMedicine} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
});
