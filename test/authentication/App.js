import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { AuthProvider } from "./src/context/authContext";

import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";

const AuthNavigator = createStackNavigator({
	SignUp: SignUpScreen,
	SignIn: SignInScreen,
});

const MainNavigator = createAppContainer(
	createSwitchNavigator({
		AuthFlow: AuthNavigator,
		MainFlow: HomeScreen,
	}),
);

const App = () => {
	return (
		<AuthProvider>
			<MainNavigator />
		</AuthProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default App;
