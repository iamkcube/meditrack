import MedicineCard from "@/components/MedicineCard";
import { useMedicineContext } from "@/context/MedicineContext";
import { Medicine } from "@/types/medicine";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function MedicineList() {
	const { medicines } = useMedicineContext();
	const router = useRouter();
	const theme = useTheme();

	const renderMedicineItem = ({ item }: { item: Medicine }) => (
		<MedicineCard
			medicineDetails={item}
			onRestock={() => router.push(`/restockMedicine?id=${item.id}`)}
			onPress={() => router.push(`/medicineDetail?id=${item.id}`)} // Correct query param
		/>
	);

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.colors.background },
			]}
		>
			<FlatList
				data={medicines}
				renderItem={renderMedicineItem}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={
					<Text
						style={{
							color: theme.colors.onBackground,
							textAlign: "center",
						}}
					>
						No medicines added yet.
					</Text>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 16,
	},
});
