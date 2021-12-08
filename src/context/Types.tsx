/** @format */

export interface IRegister {
	email: string;
	password: string;
}
export interface IMovie {
	movie: {
		cover: string;
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
export interface IComment {
	commentList: {
		comment: string;
		author: string;
		movie_id: number;
		id: number;
	}[];
}

export type TMovie = {
	cover: string;
	title: string;
	genre: string;
	year: string;
	description: string;
	publisher: string;
	votes: number;
	favorite: boolean;
	watch: boolean;
	id: number;
};
export type TComment = {
	comment: string;
	author: string;
	movie_id: number;
	id: number;
};

export interface ILogin {
	email: string;
	password: string;
}

export type AuthContextState = {
	currentUser: any | null;
	movieData: IMovie["movie"];
	myMovies: any | null;
	myComments: any | null;
	searchInput: any | null;
	register: (email: string, password: string) => void;
	login: (email: string, password: string) => void;
	logout: () => void;
	getFilteredMovies: (e: any) => void;
	handleSearch: (e: any) => void;
	searchMovie: () => void;
	handleFavorite: (movieId: number, favStat: boolean) => void;
	handleVote: (movieId: number, vote: number) => void;
	handleWatchList: (movieId: number, likeStat: boolean) => void;
};
