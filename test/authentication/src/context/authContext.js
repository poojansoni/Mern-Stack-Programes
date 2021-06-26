import React, { useReducer } from "react";
import * as ActionTypes from "./ActionTypes";
import trackApi from "../api/trackerApi";

const AuthContext = React.createContext();

const authReducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.SIGN_IN:
		case ActionTypes.SIGN_UP:
			return {
				...state,
				userId: action.payload.userId,
				token: action.payload.token,
				errorMessage: "",
				isAuthenticating: false,
			};
		case ActionTypes.SIGN_OUT:
			return {
				...state,
				userId: "",
				token: null,
			};

		case ActionTypes.SET_ERROR_MESSAGE:
			return {
				...state,
				errorMessage: action.payload.errorMessage,
				isAuthenticating: false,
			};

		case ActionTypes.CLEAR_ERROR_MESSAGE:
			return {
				...state,
				errorMessage: "",
			};

		case ActionTypes.IS_AUTHENTICATING:
			return {
				...state,
				isAuthenticating: true,
			};

		default:
			return state;
	}
};

export const AuthProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		userId: "",
		token: null,
		errorMessage: "",
		isAuthenticating: false,
	});

	console.log("OUR STATE:", authState);

	const signUp = async (email, password) => {
		dispatch({ type: ActionTypes.IS_AUTHENTICATING });
		try {
			const response = await trackApi.post("/signup", { email, password });
			dispatch({
				type: ActionTypes.SIGN_UP,
				payload: { token: response.data.token, userId: email },
			});
		} catch (error) {
			console.log("ERROR IN SIGNUP:", error);
			dispatch({
				type: ActionTypes.SET_ERROR_MESSAGE,
				payload: { errorMessage: "Something went wrong!" },
			});
			throw new Error("Something went wrong");
		}
	};

	return (
		<AuthContext.Provider value={{ data: authState, signUp }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
