/** @format */

import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AddMovie from "../pages/AddMovie";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import Favorite from "../pages/Favorite";
import Login from "../pages/Login";
import Register from "../pages/Register";
import WathcList from "../pages/WathcList";
import { AuthContext } from "../context/AuthContext";
import PrivateRoutes from "../PrivateRoutes";

function Layout() {
	// Context data Authentication Data
	const { currentUser } = useContext(AuthContext);
	return (
		<div>
			<Routes>
				<Route path="/" element={currentUser ? <Dashboard /> : <Login />} />
				<Route
					path="/Register"
					element={currentUser ? <Dashboard /> : <Register />}
				/>
				<Route
					path="/Dashboard"
					element={<PrivateRoutes component={Dashboard} />}
				/>
				<Route
					path="/AddMovie"
					element={<PrivateRoutes component={AddMovie} />}
				/>
				<Route
					path="/Detail/:id"
					element={<PrivateRoutes component={Details} />}
				/>

				<Route
					path="/Favorite"
					element={<PrivateRoutes component={Favorite} />}
				/>
				<Route
					path="/WatchList"
					element={<PrivateRoutes component={WathcList} />}
				/>
			</Routes>
		</div>
	);
}

export default Layout;
