/** @format */

import React, { useContext, useEffect, useState } from "react";
import Movies from "../components/Movies";
import NavBar from "../components/NavBar";
import { IMovie } from "../context/Types";
import { AuthContext } from "../context/AuthContext";

function WathcList() {
	const { watchMovie } = useContext(AuthContext);

	return (
		<div className="h-screen bg-gray-100">
			<NavBar />
			<div className="px-2">
				<div className="container mx-auto">
					<div className="flex flex-wrap -mx-2 ">
						<h1 className="text-2xl font-bold text-center mt-4 ml-8">
							My Watch List Movies
						</h1>
					</div>
					<div>
						<Movies movie={watchMovie} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default WathcList;
