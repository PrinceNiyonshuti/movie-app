/** @format */

export interface IRegister {
	name: string;
	username: string;
	email: string;
	password: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export type AuthContextState = {
	token: string | null;
	register: (user: IRegister) => void;
	login: (user: ILogin) => void;
};
