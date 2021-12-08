/** @format */

import { createContext, useEffect, useState } from "react";
import { AuthContextState, IComment, IMovie } from "./Types";
import { auth } from "../firebase";
import Swal from "sweetalert2";

const contextDefaultValue: AuthContextState = {
	currentUser: "",
	myMovies: "",
	myComments: "",
	movieComments: "",
	searchInput: "",
	movieData: [],
	register: () => {},
	login: () => {},
	logout: () => {},
	getFilteredMovies: () => {},
	handleSearch: () => {},
	searchMovie: () => {},
	handleFavorite: () => {},
	handleVote: () => {},
	handleWatchList: () => {},
	countComments: () => {},
	messages: [],
	getComments: () => {},
	favMovies: [],
	watchMovie: [],
};

export const AuthContext = createContext(contextDefaultValue);

type AuthContextProviderProps = {
	children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthContextProviderProps) => {
	// state data
	const [currentUser, setCurrentUser] = useState<any | null>();
	const [movieData, setMovieData] = useState<IMovie["movie"]>([]);
	const [favMovies, setFavMovies] = useState<IMovie["movie"]>([]);
	const [watchMovie, setWatchMovie] = useState<IMovie["movie"]>([]);
	const [searchInput, setSearchInput] = useState<any | null>();
	const [myMovies, setMyMovies] = useState<number>();
	const [myComments, setMyComments] = useState<number>();
	const [movieComments, setMovieComments] = useState<string>();
	const [messages, setmessages] = useState<IComment["commentList"]>([]);

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

	// Retrieve all Favorite Movies
	const getFavMovies = () => {
		fetch(`http://localhost:8000/movieList?favorite=true`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setFavMovies(data);
			});
	};

	// Retrieve all Movies
	const getWatchMovies = () => {
		fetch(`http://localhost:8000/movieList?watch=true`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setWatchMovie(data);
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

	// Handle favorite
	const handleFavorite = (movieId: number, favStat: boolean) => {
		let favorite = false;
		if (favStat) {
			favorite = false;
		} else {
			favorite = true;
		}
		const fav = { favorite };
		fetch(`http://localhost:8000/movieList/` + movieId, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(fav),
		}).then(() => {
			//action done
			Swal.fire({
				title: "Favorited Movie",
				icon: "success",
				timer: 2000,
				showConfirmButton: false,
			}).then(function () {
				getMovies();
				getFavMovies();
				getWatchMovies();
			});
		});
	};

	// Handle user votes
	const handleVote = (movieId: number, vote: number) => {
		const vot = 1;
		const votes = vote + vot;
		const voter = { votes };
		fetch(`http://localhost:8000/movieList/` + movieId, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(voter),
		}).then(() => {
			//action done
			Swal.fire({
				title: "Voted Movie",
				text: "Thanks For Voting The Movie",
				icon: "success",
				timer: 2000,
				showConfirmButton: false,
			}).then(function () {
				getMovies();
				getFavMovies();
				getWatchMovies();
			});
		});
	};

	// Handle watch
	const handleWatchList = (movieId: number, likeStat: boolean) => {
		let watch = false;
		if (likeStat) {
			watch = false;
		} else {
			watch = true;
		}
		const watcher = { watch };
		fetch(`http://localhost:8000/movieList/` + movieId, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(watcher),
		}).then(() => {
			//action done
			Swal.fire({
				title: "Watch Listed Movie",
				text: "Movie added to Watch List",
				icon: "success",
				timer: 2000,
				showConfirmButton: false,
			}).then(function () {
				getMovies();
				getFavMovies();
				getWatchMovies();
			});
		});
	};

	// Count all Movie Comments
	const countComments = (movie_id: string | undefined) => {
		fetch(`http://localhost:8000/Comments?movie_id=${movie_id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMovieComments(data.length);
			});
	};

	// Count all Movie Comments
	const getComments = (movie_id: string | undefined) => {
		fetch(`http://localhost:8000/Comments?movie_id=${movie_id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setmessages(data);
			});
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
		getFavMovies();
		getWatchMovies();
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
		handleFavorite,
		handleVote,
		handleWatchList,
		countComments,
		movieComments,
		messages,
		getComments,
		favMovies,
		getFavMovies,
		watchMovie,
		getWatchMovies
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
