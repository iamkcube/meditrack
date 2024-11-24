import { Medicine } from "@/types/medicine";
import dayjs from "dayjs";
import { StyleSheet } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";
import { Text } from "react-native";

interface MedicineCardProps {
	medicineDetails: Medicine;
	onPress: () => void;
	onDelete: () => void;
}

const MedicineCard = ({
	medicineDetails,
	onPress,
	onDelete,
}: MedicineCardProps) => {
	const { name, amount, dosage, creationDate, expiryDate, stockThreshold } =
		medicineDetails;

	const theme = useTheme();
	const daysElapsed = creationDate
		? dayjs().diff(dayjs(creationDate), "day")
		: 0;
	const expectedStock = amount - daysElapsed * dosage;
	const isBelowThreshold =
		stockThreshold != null && expectedStock <= stockThreshold;

	return (
		<Card
			style={[
				styles.card,
				{
					backgroundColor: theme.colors.secondaryContainer,
					borderColor: theme.colors.outline,
				},
			]}
			onPress={onPress}
		>
			<Card.Title
				title={name}
				subtitle={`Stock: ${expectedStock}`}
			/>
			<Card.Content>
				<Text style={{ color: theme.colors.onSurface }}>
					Dosage: {dosage} per day
				</Text>
				{isBelowThreshold && (
					<Text style={{ color: theme.colors.error }}>
						Warning: Stock below threshold!
					</Text>
				)}
			</Card.Content>

			<Card.Actions>
				<Button onPress={onPress}>View Details</Button>
				<Button
					onPress={onDelete}
					mode="contained"
					dark={theme.dark}
					buttonColor="red"
				>
					Delete
				</Button>
			</Card.Actions>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginBottom: 16,
		padding: 4,
	},
});

export default MedicineCard;
