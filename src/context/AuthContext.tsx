/** @format */

import { createContext, useEffect, useState } from "react";
import { AuthContextState } from "./Types";
import { auth } from "../firebase";

const contextDefaultValue: AuthContextState = {
	currentUser: "",
	register: () => {},
	login: () => {},
};

export const AuthContext = createContext(contextDefaultValue);

type AuthContextProviderProps = {
	children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthContextProviderProps) => {
	const [currentUser, setCurrentUser] = useState<any | null>();

	// Create Account
	const register = async (email: string, password: string) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	// Sign Into Your Account
	const login = async (email: string, password: string) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		register,
		login,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
