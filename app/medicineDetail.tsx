import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, useTheme, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useMedicineContext } from "@/context/MedicineContext";
import { Medicine } from "@/types/medicine";

export default function MedicineDetail() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const { medicines } = useMedicineContext();
	const theme = useTheme();

	// Fetch medicine details based on ID
	const [medicine, setMedicine] = useState<Medicine | null>(null);

	useEffect(() => {
		if (id) {
			const selectedMedicine = medicines.find(
				(med) => med.id === parseInt(id)
			);
			if (selectedMedicine) {
				setMedicine(selectedMedicine);
			} else {
				Alert.alert(
					"Medicine not found",
					"The selected medicine does not exist."
				);
			}
		}
	}, [id, medicines]);

	if (!medicine) {
		return (
			<View
				style={[
					styles.container,
					{ backgroundColor: theme.colors.background },
				]}
			>
				<Text
					style={[
						styles.header,
						{ color: theme.colors.onBackground },
					]}
				>
					Medicine Not Found
				</Text>
				<Button onPress={() => router.back()}>Go Back</Button>
			</View>
		);
	}

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.colors.background },
			]}
		>
			<Text style={[styles.header, { color: theme.colors.onBackground }]}>
				Medicine Detail
			</Text>

			<Card
				style={[styles.card, { backgroundColor: theme.colors.surface }]}
			>
				<Card.Title
					title={medicine.name}
					subtitle={`Amount: ${medicine.amount}`}
				/>
				<Card.Content>
					{medicine.expiryDate && (
						<Text style={{ color: theme.colors.onBackground }}>
							Expiry Date: {medicine.expiryDate}
						</Text>
					)}
					{medicine.stockThreshold && (
						<Text style={{ color: theme.colors.onBackground }}>
							Low Stock Threshold: {medicine.stockThreshold} units
						</Text>
					)}
				</Card.Content>
				<Card.Actions>
					<Button onPress={() => router.back()}>Go Back</Button>
				</Card.Actions>
			</Card>
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
	card: {
		marginBottom: 16,
	},
});
