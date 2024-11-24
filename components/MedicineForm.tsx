import { Medicine } from "@/types/medicine";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SingleChange } from "react-native-paper-dates/lib/typescript/Date/Calendar";

interface Props {
	onSubmit: (medicine: Medicine) => void;
	defaultValues?: Partial<Medicine>;
}

export default function MedicineForm({ onSubmit, defaultValues }: Props) {

	const [name, setName] = useState(defaultValues?.name || "");
	const [amount, setAmount] = useState<number | null>(
		defaultValues?.amount || null
	);
	const [dosage, setDosage] = useState<number>(defaultValues?.dosage || 1);
	const [creationDate, setCreationDate] = useState<string | null>(
		defaultValues?.creationDate || null
	);
	const [expiryDate, setExpiryDate] = useState<string | null>(
		defaultValues?.expiryDate || null
	);
	const [stockThreshold, setStockThreshold] = useState<number | null>(
		defaultValues?.stockThreshold || null
	);
	const [creationDatePickerVisible, setCreationDatePickerVisible] =
		useState(false);
	const [expiryDatePickerVisible, setExpiryDatePickerVisible] =
		useState(false);

	const handleSubmit = () => {
		if (!name || !amount || !dosage) {
			alert("Please fill all required fields.");
			return;
		}

		const newMedicine: Medicine = {
			id: defaultValues?.id || Date.now(), // Keep ID if editing
			name,
			amount,
			dosage,
			stockThreshold: stockThreshold || undefined,
			creationDate: creationDate || dayjs().toISOString(),
			updatedDate: dayjs().toISOString(),
			expiryDate: expiryDate || undefined,
		};

		onSubmit(newMedicine);
	};

	const onDismissCreationDate = useCallback(() => {
		setCreationDatePickerVisible(false);
	}, [setCreationDatePickerVisible]);

	const onConfirmCreationDate: SingleChange = useCallback(
		(params) => {
			if (params.date) {
				setCreationDate(params.date.toISOString());
			}
			setCreationDatePickerVisible(false);
		},
		[setCreationDatePickerVisible, setCreationDate]
	);

	const onDismissExpiryDate = useCallback(() => {
		setExpiryDatePickerVisible(false);
	}, [setExpiryDatePickerVisible]);

	const onConfirmExpiryDate: SingleChange = useCallback(
		(params) => {
			if (params.date) {
				setExpiryDate(params.date.toISOString());
			}
			setExpiryDatePickerVisible(false);
		},
		[setExpiryDatePickerVisible, setExpiryDate]
	);

	return (
		<View style={styles.container}>
			<View>
				<TextInput
					label="Medicine Name"
					value={name}
					onChangeText={setName}
					style={styles.input}
					mode="outlined"
				/>
				<HelperText
					type="error"
					visible={name === null || name === undefined}
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
					label="Dosage"
					value={dosage.toString()}
					onChangeText={(text) => setDosage(Number(text))}
					keyboardType="numeric"
					style={styles.input}
					mode="outlined"
				/>
				<HelperText
					type="error"
					visible={dosage === null}
				>
					Dosage is required.
				</HelperText>
				<TextInput
					label="Creation Date (Optional)"
					value={
						creationDate
							? dayjs(creationDate).format("DD-MM-YYYY")
							: ""
					}
					onFocus={() => setCreationDatePickerVisible(true)} // Open date picker
					style={styles.input}
					mode="outlined"
				/>
				<DatePickerModal
					locale="en"
					mode="single"
					visible={creationDatePickerVisible}
					onDismiss={onDismissCreationDate}
					date={creationDate ? new Date(creationDate) : new Date()}
					onConfirm={onConfirmCreationDate}
					animationType="fade"
				/>
				<TextInput
					label="Expiry Date (Optional)"
					value={
						expiryDate ? dayjs(expiryDate).format("DD-MM-YYYY") : ""
					}
					onFocus={() => setExpiryDatePickerVisible(true)} // Open date picker
					style={styles.input}
					mode="outlined"
				/>
				<DatePickerModal
					locale="en"
					mode="single"
					visible={expiryDatePickerVisible}
					onDismiss={onDismissExpiryDate}
					date={expiryDate ? new Date(expiryDate) : new Date()}
					onConfirm={onConfirmExpiryDate}
					animationType="fade"
				/>
				<TextInput
					label="Low Stock Threshold (Optional)"
					value={
						stockThreshold !== null ? stockThreshold.toString() : ""
					}
					onChangeText={(text) => setStockThreshold(Number(text))}
					keyboardType="numeric"
					style={styles.input}
					mode="outlined"
				/>
			</View>

			<View>
				<Button
					mode="contained"
					onPress={handleSubmit}
					style={styles.submitButton}
				>
					{defaultValues ? "Update Medicine" : "Add Medicine"}
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBlockStart: 16,
		flex: 1,
		justifyContent: "space-between",
	},
	input: {
		marginBottom: 12,
	},
	submitButton: {
		marginTop: 16,
	},
});
