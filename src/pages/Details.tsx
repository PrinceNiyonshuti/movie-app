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
		<div className="h-screen bg-gray-100">
			<NavBar />
			<div className="px-2">
				<div className="container mx-auto">
					<div className="flex flex-wrap -mx-2 ">
						<h1 className="text-2xl font-bold text-center mt-4 ml-8">
							Movie Details
						</h1>
						{details ? (
							<div className="flex flex-wrap">
								<div className="w-full  rounded overflow-hidden shadow-lg bg-gray-800 m-4 flex justify-between">
									<div className="md:flex-shrink-0">
										<img
											className="md:w-56 h-full"
											src={details.cover}
											alt={details.title}
										/>
									</div>
									<div className="flex flex-col flex-grow px-8 py-4 bg-color-333 text-white">
										<h3 className="font-bold text-4xl md:text-2xl lg:text-2xl ">
											{details.title}
										</h3>
										<span className="font-variant-numerical text-xl lg:text-sm lg:mb-4 mt-2">
											{details.year}
										</span>
										<div className="p-1  text-xs text-gray-700">
											<div className="button-container flex justify-between mb-2">
												<div className="pr-4 flex items-center text-sm text-gray-600">
													<span className=" px-2 py-1 leading-none bg-blue-500 text-white rounded-full font-semibold uppercase text-xs">
														{details.genre}
													</span>
												</div>
												<div className="p-2 flex items-center text-sm text-gray-600">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														viewBox="0 0 20 20"
														fill="yellow">
														<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
													</svg>
													<span className="ml-2 text-white">
														{details.votes} Votes
													</span>
												</div>
											</div>
										</div>
										<div className="flex-grow">
											<p className="text-lg-2 md:text-base lg:text-base text-gray-100 leading-snug truncate-overflow">
												{details.description}
											</p>
										</div>
										<div className="button-container flex justify-between mb-2">
											<button className="text-lg lg:text-sm font-bold py-2 px-4 text-white">
												Publisher : {details.publisher}
											</button>
											<button className="text-lg lg:text-sm font-bold py-2 px-4 rounded bg-orange-200 text-orange-700">
												0 Comment
											</button>
										</div>
									</div>
								</div>
							</div>
						) : (
							"Details Not Found"
						)}
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
}

export default Details;
