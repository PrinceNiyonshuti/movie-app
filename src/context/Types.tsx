/** @format */

export interface IRegister {
	email: string;
	password: string;
}

export interface IMovie {
	movie: {
		title: string;
		genre: string;
		year: string;
		description: string;
		publisher: string;
		votes: number;
		favorite: boolean;
		watch: boolean;
		id: number;
	}[];
}

export interface ILogin {
	email: string;
	password: string;
}

export type AuthContextState = {
	currentUser: string | null;
	register: (user: IRegister) => void;
};
