import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { Medicine } from "../types/medicine";
import { useMedicineContext } from "@/context/MedicineContext";
import MedicineList from "@/app/medicineList";

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
				style={[styles.header, { color: theme.colors.secondary }]}
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
