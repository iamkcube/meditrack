import React from "react";
import { Button, useTheme } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

interface CustomButtonProps {
	title: string;
	onPress: () => void;
	style?: object;
	color?: string; // Optionally accept a custom color
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	style,
	color,
}) => {
	const { colors } = useTheme(); // Access the current theme
	const buttonColor = color || colors.primary; // Use Material You primary color or fallback to provided color

	return (
		<View style={[styles.buttonContainer, style]}>
			<Button
				mode="contained"
				onPress={onPress}
				style={[styles.button, { backgroundColor: buttonColor }]}
				labelStyle={styles.buttonText}
				contentStyle={styles.buttonContent}
			>
				{title}
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		marginBottom: 12,
		// width: "100%",
	},
	button: {
		borderRadius: 12, // Rounded corners for Material UI
		elevation: 4, // Elevation for shadow effect
		paddingVertical: 2,
		paddingHorizontal: 3,
	},
	buttonContent: {
		paddingVertical: 0, // Adjusting button content padding
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default CustomButton;
