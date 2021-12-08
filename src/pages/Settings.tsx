/** @format */

import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";

function Settings() {
	// Context Api Data
	const { currentUser, myMovies, myComments } = useContext(AuthContext);

	// State Data
	// const [myMovies, setMyMovies] = useState<number>();
	// const [myComments, setMyComments] = useState<number>();

	// // Count all User Movies
	// const countMyMovies = () => {
	// 	fetch(`http://localhost:8000/movieList?publisher=${currentUser.email}`)
	// 		.then((res) => {
	// 			return res.json();
	// 		})
	// 		.then((data) => {
	// 			setMyMovies(data.length);
	// 		});
	// };

	// // Count all User Comments
	// const countMyComments = () => {
	// 	fetch(`http://localhost:8000/Comments?author=${currentUser.email}`)
	// 		.then((res) => {
	// 			return res.json();
	// 		})
	// 		.then((data) => {
	// 			setMyComments(data.length);
	// 		});
	// };

	// Render and run function on component mount
	// useEffect(() => {
	// 	countMyMovies();
	// 	countMyComments();
	// }, []);

	return (
		<div className="h-screen bg-gray-100">
			<NavBar />
			<div className="h-screen bg-gray-300">
				<div className="w-full flex justify-center py-10">
					<div className="p-3 bg-white rounded-xl max-w-lg hover:shadow">
						<div className="flex justify-between w-full">
							<div className="ml-2">
								<div className="p-3">
									<h3 className="text-2xl">{currentUser.email}</h3>
									<span>Team Member</span>
								</div>
								<div className="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
									<div className="mr-3">
										<span className="text-gray-400 block">Movies</span>
										<span className="font-bold text-black text-xl">
											{myMovies}
										</span>
									</div>
									<div className="mr-3">
										<span className="text-gray-400 block">Comments</span>
										<span className="font-bold text-black text-xl">
											{myComments}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
