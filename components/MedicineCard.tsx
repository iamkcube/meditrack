import { StyleSheet } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";

interface MedicineCardProps {
	name: string;
	amount: number;
	onPress: () => void;
	onDelete: () => void;
}

const MedicineCard = ({
	name,
	amount,
	onPress,
	onDelete,
}: MedicineCardProps) => {
	const theme = useTheme();
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
				subtitle={amount}
			/>
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
