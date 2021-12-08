/** @format */

import { IComment } from "../context/Types";

function Comments(props: IComment) {
	return (
		<div>
			{props.commentList.map((item) => (
				<div className="flex mb-2 bg-gray-100"key={item.id}>
					<div className="bg-white py-6 rounded-lg mt-2 shadow-lg flex items-center justify-center p-2 sm:p-4 w-full">
						<div className="w-full">
							<div className="flex">
								<h3 className="text-lg font-bold text-center">{item.author}</h3>
							</div>
							<div className="flex">
								<p className="text-lg ">
									{item.comment}
								</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Comments;
