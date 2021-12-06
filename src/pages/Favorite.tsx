/** @format */

import React, { useEffect, useState } from "react";
import Movies from "../components/Movies";
import NavBar from "../components/NavBar";
import { IMovie } from "../context/Types";

function Favorite() {
	const [movieData, setMovieData] = useState<IMovie["movie"]>([]);
	// Retrieve all Movies
	const getMovies = () => {
		fetch(`http://localhost:8000/movieList?favorite=true`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMovieData(data);
			});
	};
	useEffect(() => {
		getMovies();
	}, []);

	return (
		<div className="h-screen bg-gray-100">
			<NavBar />
			<div className="px-2">
				<div className="container mx-auto">
					<div className="flex flex-wrap -mx-2 ">
						<h1 className="text-2xl font-bold text-center mt-4 ml-8">
							My Favorite Movies
						</h1>
					</div>
					<div>
						{/* {movieData
							.filter((movies) => movies.favorite == true)
							.map((movie) => (
								<p>{movie.title}</p>
							))} */}
						<Movies movie={movieData} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Favorite;
