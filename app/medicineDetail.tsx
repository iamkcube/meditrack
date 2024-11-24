import { useMedicineContext } from "@/context/MedicineContext";
import { Medicine } from "@/types/medicine";
import { expectedStockCalculator } from "@/utils/expectedStockCalculator";
import { formatDateWithOrdinal } from "@/utils/formatDateWithOrdinal";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
	Button,
	Card,
	useTheme,
	Text,
	Divider,
	Chip,
} from "react-native-paper";

export default function MedicineDetail() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const { medicines, removeMedicine } = useMedicineContext();
	const theme = useTheme();

	// const [isLoading, setIsLoading] = useState(true);
	// const [medicine, setMedicine] = useState<Medicine | null>(() => {
	// 	if (!id) return null;
	// 	return medicines.find((med) => med.id === parseInt(id)) || null;
	// });
	const medicine: Medicine | null = !id
		? null
		: medicines.find((med) => med.id === parseInt(id)) || null;

	const onDelete = () => {
		removeMedicine(Number(id));
		router.push("/");
	};
	const onUpdate = () => {
		router.push(`/updateMedicine?id=${id}`);
	};

	// useEffect(() => {
	// 	if (id) {
	// 		const selectedMedicine = medicines.find(
	// 			(med) => med.id === parseInt(id)
	// 		);
	// 		if (selectedMedicine) {
	// 			setMedicine(selectedMedicine);
	// 		} else {
	// 			Alert.alert(
	// 				"Medicine not found",
	// 				"The selected medicine does not exist."
	// 			);
	// 		}
	// 		setIsLoading(false);
	// 	}
	// }, [id]);

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
					Medicine Details Not Found
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
			<View style={styles.contentBox}>
				<Text
					style={[
						styles.header,
						{ color: theme.colors.onBackground },
					]}
				>
					Medicine Detail
				</Text>
				<Text variant="headlineMedium">{medicine.name}</Text>
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "flex-start",
						marginBlockEnd: 4,
					}}
				>
					<Chip
						compact
						elevated
					>
						{expectedStockCalculator(
							medicine.creationDate,
							medicine.amount,
							medicine.dosage
						)}{" "}
						left
					</Chip>
				</View>
				<Divider bold />
				<Text variant="titleMedium">{`Total Amount: ${medicine.amount}`}</Text>
				<Text>
					Created on {formatDateWithOrdinal(medicine.creationDate)}
				</Text>
				<Text>
					Updated on {formatDateWithOrdinal(medicine.updatedDate)}
				</Text>
				<Divider />

				{medicine.expiryDate && (
					<>
						<Text>
							Expiry Date:{" "}
							{formatDateWithOrdinal(medicine.expiryDate)}
						</Text>
						<Text>
							{dayjs(medicine.expiryDate).diff(dayjs(), "days")}{" "}
							days to expire
						</Text>
						<Divider />
					</>
				)}
				{medicine.stockThreshold && (
					<Text>
						Low Stock Threshold: {medicine.stockThreshold}{" "}
						{medicine.stockThreshold === 1 ? "tablet" : "tablets"}
					</Text>
				)}

				{/* <Button onPress={() => router.back()}>Go Back</Button> */}
			</View>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.button}
					dark={theme.dark}
					mode="contained"
					onPress={onUpdate}
				>
					Update
				</Button>
				<Button
					style={styles.button}
					onPress={onDelete}
					mode="contained"
					dark={theme.dark}
					buttonColor={theme.colors.errorContainer}
				>
					Delete
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		justifyContent: "space-between",
	},
	contentBox: {
		display: "flex",
		gap: 8,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	card: {
		marginBottom: 16,
	},
	button: {
		flex: 1,
		// paddingBlock: 8,
		// borderRadius: 8,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		gap: 8,
		// paddingBlock: 8,
		// borderRadius: 8,
	},
});
