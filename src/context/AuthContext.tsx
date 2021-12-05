/** @format */

import { createContext, useState } from "react";
import { AuthContextState, IRegister } from "./Types";

const contextDefaultValue: AuthContextState = {
	currentUser: "",
	register: () => {},
};

export const AuthContext = createContext(contextDefaultValue);

type AuthContextProviderProps = {
	children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthContextProviderProps) => {
	const [currentUser, setCurrentUser] = useState<string | null>("");

	// Create Account
	const register = async (user: IRegister) => {
		console.log(user);
	};

	const value = {
		currentUser,
		register,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
