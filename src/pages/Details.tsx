/** @format */

import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Comments from "../components/Comments";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { TMovie, IComment } from "../context/Types";

function Details() {
	// Context data
	const { currentUser } = useContext(AuthContext);
	const { id } = useParams();
	const [details, setDetails] = useState<TMovie>();
	const [messages, setmessages] = useState<IComment["commentList"]>([]);
	const [movieComments, setMovieComments] = useState<number>();

	// form data
	const commentRef = useRef<HTMLTextAreaElement>(null);
	const movie_id = id;

	// Post Comment
	const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const comment = commentRef.current?.value;
		const author = currentUser.email;

		const data = { comment, author, movie_id };

		fetch("http://localhost:8000/Comments", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then(() => {
			Swal.fire({
				title: "Comment Done",
				text: `${author} your comment is saved`,
				icon: "success",
				timer: 2000,
				showConfirmButton: false,
			});
		});
	};

	// get movie
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

	// get comments
	useEffect(() => {
		fetch(`http://localhost:8000/Comments?movie_id=${id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setmessages(data);
			});
		// eslint-disable-next-line
		countComments();
	}, []);

	// Count all Movie Comments
	const countComments = () => {
		fetch(`http://localhost:8000/Comments?movie_id=${id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMovieComments(data.length);
			});
	};

	console.log(window.location.href);
	return (
		<div className="h-full bg-gray-100">
			<NavBar />
			<div className="px-2">
				<div className="container mx-auto">
					<div className="flex flex-wrap -mx-2 ">
						<h1 className="text-2xl font-bold text-center mt-4 ml-8">
							Movie Details
						</h1>
						{details ? (
							<div>
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
													{movieComments} Comment
												</button>
											</div>
										</div>
									</div>
								</div>
								<Comments commentList={messages} />
								<div className="flex items-center justify-center mb-4 px-2 bg-gray-100">
									<div className="bg-white py-6 mt-2 shadow-lg flex items-center justify-center p-6 sm:p-12 w-full">
										<div className="w-full">
											<div className="flex">
												<h3 className="text-2xl font-bold text-center">
													Comment
												</h3>
											</div>
											<form onSubmit={handleComment}>
												<div>
													<label className="block mt-4 font-medium ">
														Add New Comment
													</label>
													<textarea
														className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
														placeholder="Type your Comment"
														ref={commentRef}
														rows={5}
														required
													/>
												</div>
												<button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
													Post Comment
												</button>
											</form>
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
