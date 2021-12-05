/** @format */

export interface IRegister {
	email: string;
	password: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export type AuthContextState = {
	currentUser: string | null;
	register: (user: IRegister) => void;
};
