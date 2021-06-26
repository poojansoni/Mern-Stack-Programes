import React, { useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import AuthContext from "../context/authContext";

import AuthForm from "../components/AuthForm";

const SignUpScreen = ({ navigation }) => {
	const { signUp } = useContext(AuthContext);

	const onSignupHandler = async (email, password) => {
		try {
			await signUp(email, password);
			navigation.navigate("MainFlow");
		} catch (error) {
			console.log("SIGNUP SCREEN ERROR:", error);
		}
	};

	return (
		<View style={styles.container}>
			<AuthForm buttonTitle="Sign Up" onPress={onSignupHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		// alignItems: "center",
	},
});

export default SignUpScreen;
