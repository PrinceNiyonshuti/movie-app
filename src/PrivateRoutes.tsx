/** @format */

// import { ReactNode, useContext } from "react";
// import { Route, Link, RouteProps, Navigate } from "react-router-dom";
// import { AuthContext } from "./context/AuthContext";

// export default function PrivateRoutes({ component: Component, ...rest }) {
// 	// Context data
// 	const { currentUser } = useContext(AuthContext);
// 	return (
// 		<Route
// 			{...rest}
// 			render={(props: JSX.IntrinsicAttributes) => {
// 				return currentUser ? <Component {...props} /> : <Link to="/" />;
// 			}}></Route>
// 	);
// }

import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

interface PropType {
	component: React.FC;
}

const PrivateRoutes: FC<PropType> = ({ component: Component }) => {
	const { currentUser } = useContext(AuthContext);
	
	if (currentUser) return <Component />;
	return <Navigate to="/" />;
};

export default PrivateRoutes;
