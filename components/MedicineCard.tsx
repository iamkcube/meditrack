import { Medicine } from "@/types/medicine";
import { expectedStockCalculator } from "@/utils/expectedStockCalculator";
import { formatDateWithOrdinal } from "@/utils/formatDateWithOrdinal";
import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, Text, useTheme } from "react-native-paper";

interface MedicineCardProps {
	medicineDetails: Medicine;
	onRestock: () => void;
	onPress: () => void;
}

const MedicineCard = ({
	medicineDetails,
	onRestock,
	onPress,
}: MedicineCardProps) => {
	const { name, amount, dosage, creationDate, stockThreshold } =
		medicineDetails;

	const theme = useTheme();
	const expectedStock = expectedStockCalculator(creationDate, amount, dosage);
	const isBelowThreshold =
		stockThreshold != null && expectedStock <= stockThreshold;

	return (
		<Card
			style={[styles.card]}
			onPress={onPress}
		>
			<Card.Title
				title={name}
				titleStyle={{ fontSize: 20 }}
			/>
			<Card.Content style={styles.cardContent}>
				<View style={styles.chip}>
					<Chip
						compact
						elevated
					>
						{expectedStock} left
					</Chip>
				</View>

				<Text
					variant="bodyMedium"
					style={{ color: theme.colors.onSurface }}
				>
					Created on: {formatDateWithOrdinal(creationDate)}
				</Text>
				<Text
					variant="bodyMedium"
					style={{ color: theme.colors.onSurface }}
				>
					Dosage: {dosage} per day
				</Text>
				{isBelowThreshold && (
					<Text style={{ color: theme.colors.error }}>
						Warning: Stock below threshold!
					</Text>
				)}
			</Card.Content>

			<Card.Actions style={styles.cardAction}>
				<Button
					onPress={onRestock}
					mode="outlined"
				>
					Restock
				</Button>
				{/* <Button
					onPress={onPress}
					mode="contained"
				>
					View Details
				</Button> */}
			</Card.Actions>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginBottom: 16,
		padding: 4,
	},
	chip: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		marginBlockEnd: 4,
	},
	cardContent: {
		gap: 2,
	},
	cardAction: {
		marginBlockStart: 4,
	},
});

export default MedicineCard;
