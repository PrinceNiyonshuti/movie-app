/** @format */

import { Link } from "react-router-dom";
import { IMovie } from "../context/Types";

const Movies = (props: IMovie) => {
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
		});
	};

	// Handle Likes
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
		});
	};
	return (
		<div className="flex flex-wrap -mx-2 ">
			{props.movie.map((movie) => (
				<div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
					<Link
						to=""
						className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
						<div className="relative pb-48 overflow-hidden">
							<img
								className="absolute inset-0 h-full w-full object-cover"
								src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
								alt=""
							/>
						</div>
						<div className="p-4">
							<span className="inline-block px-2 py-1 leading-none bg-blue-300 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
								{movie.genre}
							</span>
							{movie.favorite ? (
								<svg
									onDoubleClick={() => handleFavorite(movie.id, movie.favorite)}
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 float-right"
									viewBox="0 0 24 24"
									fill="black">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
									/>
								</svg>
							) : (
								<svg
									onDoubleClick={() => handleFavorite(movie.id, movie.favorite)}
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 float-right"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
									/>
								</svg>
							)}

							<h2 className="mt-2 mb-2  font-bold">{movie.title}</h2>
							<p className="text-sm">
								{movie.description.length > 70
									? movie.description.slice(0, 70) + "..."
									: movie.description}
							</p>
						</div>
						<div className="p-1 border-t border-b text-xs text-gray-700">
							<div className="button-container flex justify-between mb-2">
								<div className="p-2 flex items-center text-sm text-gray-600">
									<svg
										onDoubleClick={() => handleVote(movie.id, movie.votes)}
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										viewBox="0 0 20 20"
										fill="blue">
										<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
									</svg>
									<span className="ml-2">{movie.votes} Votes</span>
								</div>
								<div className="pr-4 flex items-center text-sm text-gray-600">
									{movie.watch ? (
										<svg
											onDoubleClick={() =>
												handleWatchList(movie.id, movie.watch)
											}
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											viewBox="0 0 24 24"
											fill="red">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											/>
										</svg>
									) : (
										<svg
											onDoubleClick={() =>
												handleWatchList(movie.id, movie.watch)
											}
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											/>
										</svg>
									)}
								</div>
							</div>
						</div>
					</Link>
				</div>
			))}
		</div>
	);
};

export default Movies;
