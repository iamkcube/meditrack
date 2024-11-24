import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider, DefaultTheme, MD3DarkTheme } from "react-native-paper";
import { Slot } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
import { StatusBar, useColorScheme } from "react-native";
import { MedicineProvider } from "@/context/MedicineContext";
import { en, registerTranslation } from "react-native-paper-dates";
import { darkTheme, lightTheme } from "@/theme/theme";
import { useFonts } from "expo-font";
registerTranslation("en", en);

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function Layout() {
	// const [loaded] = useFonts({
	// 	SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	// });
	const colorScheme = useColorScheme(); // Automatically handles light/dark mode

	const theme = colorScheme === "dark" ? darkTheme : lightTheme;

	// useEffect(() => {
	// 	if (loaded) {
	// 		SplashScreen.hideAsync();
	// 	}
	// }, [loaded]);

	StatusBar.setBarStyle(
		colorScheme === "dark" ? "light-content" : "dark-content"
	);
	StatusBar.setBackgroundColor(theme.colors.background);

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
