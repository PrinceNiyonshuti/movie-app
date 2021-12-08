/** @format */

import { createContext, useEffect, useState } from "react";
import { AuthContextState, IMovie } from "./Types";
import { auth } from "../firebase";

const contextDefaultValue: AuthContextState = {
	currentUser: "",
	myMovies: "",
	myComments: "",
	searchInput: "",
	movieData: [],
	register: () => {},
	login: () => {},
	logout: () => {},
	getFilteredMovies: () => {},
	handleSearch: () => {},
	searchMovie: () => {},
};

export const AuthContext = createContext(contextDefaultValue);

type AuthContextProviderProps = {
	children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthContextProviderProps) => {
	// state data
	const [currentUser, setCurrentUser] = useState<any | null>();
	const [movieData, setMovieData] = useState<IMovie["movie"]>([]);
	const [searchInput, setSearchInput] = useState<any | null>();
	const [myMovies, setMyMovies] = useState<number>();
	const [myComments, setMyComments] = useState<number>();

	// Create Account
	const register = async (email: string, password: string) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	// Sign Into Your Account
	const login = async (email: string, password: string) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	// Sign Out
	const logout = () => {
		return auth.signOut();
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	// Retrieve all Movies
	const getMovies = () => {
		fetch(`http://localhost:8000/movieList?_sort=id&_order=DESC`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMovieData(data);
			});
	};

	// Filter Movies
	const getFilteredMovies = (e: React.SyntheticEvent<EventTarget>) => {
		let search = (e.target as HTMLSelectElement).value;
		if (search === "all") {
			getMovies();
		} else {
			fetch(`http://localhost:8000/movieList?genre=${search}`)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setMovieData(data);
				});
		}
	};

	// get input search data
	const handleSearch = (e: React.SyntheticEvent<EventTarget>) => {
		setSearchInput((e.target as HTMLInputElement).value);
	};

	// Search Movies
	const searchMovie = () => {
		if (searchInput === "all") {
			getMovies();
		} else {
			fetch(`http://localhost:8000/movieList/?title_like=${searchInput}`)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setMovieData(data);
				});
		}
		// alert(searchInput);
	};

	// Count all User Movies
	const countMyMovies = () => {
		if (currentUser) {
			fetch(`http://localhost:8000/movieList?publisher=${currentUser.email}`)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setMyMovies(data.length);
				});
		} else {
			setMyMovies(0);
		}
	};

	// Count all User Comments
	const countMyComments = () => {
		fetch(`http://localhost:8000/Comments`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMyComments(data.length);
			});
	};

	useEffect(() => {
		getMovies();
		countMyMovies();
		countMyComments();
	}, []);

	const value = {
		currentUser,
		movieData,
		myMovies,
		myComments,
		register,
		login,
		logout,
		getFilteredMovies,
		searchInput,
		handleSearch,
		searchMovie,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
