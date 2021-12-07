/** @format */

import { useContext, useRef } from "react";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";

const AddMovie = () => {
	const { currentUser } = useContext(AuthContext);
	// Form variables
	const movieTitle = useRef<HTMLInputElement>(null);
	const movieGenre = useRef<HTMLSelectElement>(null);
	const movieYear = useRef<HTMLInputElement>(null);
	const movieDescr = useRef<HTMLTextAreaElement>(null);
	const movieForm = useRef<HTMLFormElement>(null);

	const newMovie = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const title = movieTitle.current?.value;
		const genre = movieGenre.current?.value;
		const year = movieYear.current?.value;
		const description = movieDescr.current?.value;
		const publisher = currentUser.email;
		const votes = 0;
		const favorite = false;
		const watch = false;
		const cover = `https://source.unsplash.com/1600x900/?movie,` + title;

		const movie = {
			cover,
			title,
			genre,
			year,
			description,
			publisher,
			votes,
			favorite,
			watch,
		};

		fetch("http://localhost:8000/movieList", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(movie),
		}).then(() => {
			Swal.fire({
				title: "Movie Successfully Created",
				text: `${title} Saved`,
				icon: "success",
				confirmButtonText: "Done",
			}).then(function () {
				window.location.reload();
			});
		});
	};
	return (
		<div className="h-screen bg-gray-100">
			<NavBar />

			<div className="flex items-center justify-center bg-gray-100">
				<div className="bg-white py-6 mt-4 shadow-lg flex items-center justify-center p-6 sm:p-12 md:w-1/2">
					<div className="w-full">
						<div className="flex justify-center">
							<h3 className="text-2xl font-bold text-center">
								New Movies Details
							</h3>
						</div>
						<form onSubmit={newMovie} ref={movieForm}>
							<div>
								<label className="block font-medium ">Movie Title</label>
								<input
									type="text"
									ref={movieTitle}
									className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
									placeholder="Movie title"
									required
								/>
							</div>
							<div>
								<label className="block mt-4 font-medium ">
									Movie Category
								</label>
								<select
									ref={movieGenre}
									className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
									placeholder="Movie Genre"
									required>
									<option value="0">-- Choose Category --</option>
									<option value="Action">Action</option>
									<option value="Commedy">Commedy</option>
									<option value="Sci-Fi">Sci-Fi</option>
									<option value="Drama">Drama</option>
									<option value="Romantic">Romantic</option>
								</select>
							</div>
							<div>
								<label className="block mt-4 font-medium ">
									Published Year
								</label>
								<input
									ref={movieYear}
									type="date"
									className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
									placeholder=""
									required
								/>
							</div>
							<div>
								<label className="block mt-4 font-medium ">Description</label>
								<textarea
									ref={movieDescr}
									className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
									placeholder="Movie Detailed Descriptions"
									rows={5}
									required
								/>
							</div>
							<button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
								Add Movie
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddMovie;
