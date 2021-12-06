/** @format */

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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
			Swal.fire({
				title: "Favorited Movie",
				text: "Movie added to favorite",
				icon: "success",
				confirmButtonText: "Done",
			}).then(function () {
				window.location.reload();
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
				confirmButtonText: "Done",
			}).then(function () {
				window.location.reload();
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
				confirmButtonText: "Done",
			}).then(function () {
				window.location.reload();
			});
		});
	};
	return (
		<div className="flex flex-wrap -mx-2 ">
			{props.movie.map((movie) => (
				<div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4" key={movie.id}>
					<div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
						<div className="relative pb-48 overflow-hidden">
							<img
								className="absolute inset-0 h-full w-full object-cover"
								src={movie.cover}
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
										d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
									/>
								</svg>
							)}
							<Link to={`/Detail/${movie.id}`}>
								<h2 className="mt-2 mb-2  font-bold">{movie.title}</h2>
							</Link>

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
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor">
											<path
												fillRule="evenodd"
												d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
												clipRule="evenodd"
											/>
											<path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
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
											<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											<path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
										</svg>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Movies;
