/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import AddMovie from "../pages/AddMovie";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import Favorite from "../pages/Favorite";
import Login from "../pages/Login";
import Register from "../pages/Register";
import WathcList from "../pages/WathcList";

function Layout() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Register" element={<Register />} />
				<Route path="/Dashboard" element={<Dashboard />} />
				<Route path="/AddMovie" element={<AddMovie />} />
				<Route path="/Detail/:id" element={<Details />} />
				<Route path="/Favorite" element={<Favorite />} />
				<Route path="/WatchList" element={<WathcList />} />
			</Routes>
		</div>
	);
}

export default Layout;
