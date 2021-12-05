/** @format */

import { useEffect, useState } from "react";
import Movies from "../components/Movies";
import NavBar from "../components/NavBar";
import { IMovie } from "../context/Types";

function Dashboard() {
	const [movieData, setMovieData] = useState<IMovie["movie"]>([]);

	// Retrieve all Itenerary with limit of 5
	useEffect(() => {
		fetch(`http://localhost:8000/movieList`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMovieData(data);
			});
	}, []);
	console.log(movieData);
	return (
		<div>
			<NavBar />
			<div className="bg-gray-100 px-2">
				<div className="container mx-auto">
					<div>
						<Movies movie={movieData} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
