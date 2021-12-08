/** @format */

import React, { useContext } from "react";
import Movies from "../components/Movies";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";

function Favorite() {
	// Context Api Data
	const { favMovies } = useContext(AuthContext);

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
						{/* {favMovies
							.filter((movies) => movies.favorite == true)
							.map((movie) => (
								<p>{movie.title}</p>
							))} */}
						<Movies movie={favMovies} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Favorite;
