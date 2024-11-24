import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, HelperText, useTheme } from "react-native-paper";
import { Medicine } from "../types/medicine";

interface Props {
	onSubmit: (medicine: Medicine) => void;
}

export default function MedicineForm({ onSubmit }: Props) {
	const theme = useTheme();

	const [name, setName] = useState("");
	const [amount, setAmount] = useState<number | null>(null);
	const [expiryDate, setExpiryDate] = useState("");
	const [stockThreshold, setStockThreshold] = useState<number | null>(null);

	const handleSubmit = () => {
		if (!name || amount === null) {
			// Handle validation error
			return;
		}

		const newMedicine: Medicine = {
			id: Date.now(), // Unique ID
			name,
			amount,
			expiryDate: expiryDate || undefined, // Ensure optional properties are explicitly undefined when empty
			stockThreshold: stockThreshold || undefined,
		};

		onSubmit(newMedicine);
	};

	return (
		<View style={styles.container}>
			<TextInput
				label="Medicine Name"
				value={name}
				onChangeText={setName}
				style={styles.input}
				mode="outlined"
			/>
			<HelperText
				type="error"
				visible={!name}
			>
				Medicine name is required.
			</HelperText>

			<TextInput
				label="Amount in Stock"
				value={amount !== null ? amount.toString() : ""}
				onChangeText={(text) => setAmount(Number(text))}
				keyboardType="numeric"
				style={styles.input}
				mode="outlined"
			/>
			<HelperText
				type="error"
				visible={amount === null}
			>
				Amount is required.
			</HelperText>

			<TextInput
				label="Expiry Date (Optional)"
				value={expiryDate}
				onChangeText={setExpiryDate}
				style={styles.input}
				mode="outlined"
			/>

			<TextInput
				label="Low Stock Threshold (Optional)"
				value={stockThreshold !== null ? stockThreshold.toString() : ""}
				onChangeText={(text) => setStockThreshold(Number(text))}
				keyboardType="numeric"
				style={styles.input}
				mode="outlined"
			/>

			<Button
				mode="contained"
				onPress={handleSubmit}
				dark
				style={[
					styles.submitButton,
					// { backgroundColor: theme.colors.secondaryContainer },
				]}
			>
				Add Medicine
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	input: {
		marginBottom: 12,
	},
	submitButton: {
		marginTop: 16,
	},
});
