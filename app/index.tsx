import MedicineList from "@/app/medicineList";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export default function Home() {
	const router = useRouter();
	const theme = useTheme();

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.colors.background },
			]}
		>
			<Text
				variant="headlineSmall"
				style={[styles.header, { color: theme.colors.onBackground }]}
			>
				Medicine Inventory
			</Text>

			<MedicineList />

			<Button
				mode="contained"
				dark
				onPress={() => router.push("/addMedicine")}
				style={styles.addButton}
			>
				Add Medicine
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	medicineCard: {
		padding: 16,
		marginBottom: 8,
		borderWidth: 1,
		borderRadius: 4,
	},
	addButton: {
		marginTop: 16,
		fontWeight: "bold",
	},
});
