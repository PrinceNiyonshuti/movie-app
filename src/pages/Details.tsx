/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

type IState = {
	cover: string;
	title: string;
	genre: string;
	year: string;
	description: string;
	publisher: string;
	votes: number;
	favorite: boolean;
	watch: boolean;
	id: number;
};

function Details() {
	const { id } = useParams();
	const [details, setDetails] = useState<IState>();

	useEffect(() => {
		fetch(`http://localhost:8000/movieList/` + id)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setDetails(data);
			});
		// eslint-disable-next-line
	}, []);

	console.log(details);
	return (
		<div>
			<NavBar />
			<div className="px-2">
				<div className="container mx-auto">
					<div className="flex flex-wrap -mx-2 ">
						<h1 className="text-2xl font-bold text-center mt-4 ml-8">
							Movie Details {id} of movie
							{details ? ("dhasdl") : "No"}
						</h1>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
}

export default Details;
