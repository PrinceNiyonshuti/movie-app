/** @format */

import { useEffect, useState } from "react";
import Movies from "../components/Movies";
import NavBar from "../components/NavBar";
import { IMovie } from "../context/Types";

function Dashboard() {
	const [movieData, setMovieData] = useState<IMovie["movie"]>([]);

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
	useEffect(() => {
		getMovies();
	}, []);
	return (
		<div>
			<NavBar />
			<div className="h-full bg-gray-100 px-2">
				<div className="container mx-auto">
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
					<div className="flex flex-wrap -mx-2 ">
						<h1 className="text-2xl font-bold text-center mt-4 ml-8">
							All Movies
						</h1>
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
