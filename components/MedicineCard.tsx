import { Medicine } from "@/types/medicine";
import { formatDateWithOrdinal } from "@/utils/formatDateWithOrdinal";
import dayjs from "dayjs";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Card, useTheme, Text, Chip } from "react-native-paper";

interface MedicineCardProps {
	medicineDetails: Medicine;
	onUpdate: () => void;
	onPress: () => void;
}

const MedicineCard = ({
	medicineDetails,
	onUpdate,
	onPress,
}: MedicineCardProps) => {
	const {
		id,
		name,
		amount,
		dosage,
		creationDate,
		expiryDate,
		stockThreshold,
	} = medicineDetails;

	const theme = useTheme();
	const daysElapsed = creationDate
		? dayjs().diff(dayjs(creationDate), "day")
		: 0;
	const expectedStock = amount - daysElapsed * dosage;
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
			<Card.Content>
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

			<Card.Actions>
				<Button onPress={onUpdate}>Update</Button>
				<Button onPress={onPress}>View Details</Button>
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
