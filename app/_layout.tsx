import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider, DefaultTheme, MD3DarkTheme } from "react-native-paper";
import { Slot } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { MedicineProvider } from "@/context/MedicineContext";
import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);

export default function Layout() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const colorScheme = useColorScheme(); // Automatically handles light/dark mode

	// Watch for theme changes
	useEffect(() => {
		setIsDarkMode(colorScheme === "dark");
	}, [colorScheme]);

	// Define the Material You color themes
	const theme = isDarkMode
		? {
				...MD3DarkTheme,
				colors: {
					...MD3DarkTheme.colors,
					primary: "#BB86FC", // Purple color for dark mode
					accent: "#03DAC6", // Teal accent
				},
		  }
		: {
				...DefaultTheme,
				colors: {
					...DefaultTheme.colors,
					primary: "#6200EE", // Purple color for light mode
					accent: "#03DAC6", // Teal accent
				},
		  };

	useEffect(() => {
		StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
		StatusBar.setBackgroundColor(isDarkMode ? "#121212" : "#ffffff");
	}, [isDarkMode]);

	return (
		<SafeAreaProvider>
			<PaperProvider theme={theme}>
				<MedicineProvider>
					<Slot />
				</MedicineProvider>
			</PaperProvider>
		</SafeAreaProvider>
	);
}
