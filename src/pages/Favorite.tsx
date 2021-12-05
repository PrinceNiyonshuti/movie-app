/** @format */

import React from "react";
import NavBar from "../components/NavBar";

function Favorite() {
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
				</div>
			</div>
		</div>
	);
}

export default Favorite;
