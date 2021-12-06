/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function Details() {
	const { id } = useParams();
	return (
		<div>
			<NavBar />
			<div className="px-2">
				<div className="container mx-auto">
					<div className="flex flex-wrap -mx-2 ">
						<h1 className="text-2xl font-bold text-center mt-4 ml-8">
							Movie Details {id} of movie
						</h1>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
}

export default Details;
