import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import AuthContext from "../context/authContext";

const AuthForm = (props) => {
	const { buttonTitle, onPress } = props;
	const { data } = useContext(AuthContext);
	const { isAuthenticating, errorMessage } = data;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onChangeEmailHandler = (newEmail) => {
		// validation
		setEmail(newEmail);
	};

	const onChangePasswordHandler = (newPassword) => {
		// validation
		setPassword(newPassword);
	};

	return (
		<View style={styles.container}>
			<Input
				label="Email"
				placeholder="email"
				autoCapitalize="none"
				autoCorrect={false}
				value={email}
				onChangeText={onChangeEmailHandler}
				errorMessage={errorMessage}
			/>
			<Input
				label="Password"
				placeholder="password"
				autoCorrect={false}
				autoCapitalize="none"
				secureTextEntry
				value={password}
				onChangeText={onChangePasswordHandler}
			/>
			<Button
				title={buttonTitle}
				onPress={() => {
					onPress(email, password);
				}}
				disabled={email.length === 0 || password.length === 0}
				raised
				loading={isAuthenticating}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		borderColor: "red",
		borderWidth: 1,
		padding: 10,
	},
});

export default AuthForm;
