/** @format */

import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Layout from "../layout/Layout";
configure({ adapter: new Adapter() });

describe("rendering components", () => {
	it("renders App component without crashing", () => {
		shallow(<App />);
	});
	it("renders Layout component without crashing", () => {
		shallow(<Layout />);
	});
	it("renders Login component without crashing", () => {
		shallow(<Login />);
	});
	it("renders Register component without crashing the screen", () => {
		shallow(<Register />);
	});
});
