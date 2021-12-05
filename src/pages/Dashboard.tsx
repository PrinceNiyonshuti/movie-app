/** @format */

import Movies from "../components/Movies";
import NavBar from "../components/NavBar";

function Dashboard() {
	return (
		<div>
			<NavBar />
			<div className="bg-gray-100 px-2">
				<div className="container mx-auto">
					<div className="flex flex-wrap -mx-2 ">
						<Movies />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
