/** @format */

import { useContext, useEffect, useState } from "react";
import Movies from "../components/Movies";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { IMovie } from "../context/Types";

function Dashboard() {
	// Context Api Data
	const { movieData, getFilteredMovies, handleSearch, searchMovie } =
		useContext(AuthContext);

	return (
		<div className="h-screen bg-gray-100">
			<NavBar />
			<div className=" px-2">
				<div className="container mx-auto">
					<div className="button-container flex flex-wrap justify-between mb-2">
						<div className="p-2 flex items-center text-sm">
							<div className="flex flex-wrap -mx-2 ">
								<h1 className="text-2xl font-bold text-center mt-4 ml-8">
									All Movies
								</h1>
							</div>
						</div>
						<div className="p-2 flex items-center text-sm">
							<div className="flex border-2 rounded">
								<input
									onChange={handleSearch}
									type="text"
									className="px-4 py-2 w-80"
									placeholder="Search Movie...."
								/>
								<button
									onClick={searchMovie}
									className="flex items-center justify-center px-4 border-l">
									<svg
										className="w-6 h-6 text-black"
										fill="black"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24">
										<path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
									</svg>
								</button>
							</div>
						</div>
						<div className="p-2 pr-4 flex items-center text-sm">
							<div className="float-right mt-2">
								<select
									onChange={getFilteredMovies}
									className=" float-right px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
									placeholder="Movie Genre"
									required>
									<option value="all">-- Choose Category --</option>
									<option value="Action">Action</option>
									<option value="Commedy">Commedy</option>
									<option value="Sci-Fi">Sci-Fi</option>
									<option value="Drama">Drama</option>
									<option value="Romantic">Romantic</option>
								</select>
							</div>
						</div>
					</div>
					<div>
						<Movies movie={movieData} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
