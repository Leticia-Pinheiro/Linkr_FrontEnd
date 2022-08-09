import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalResetStyle from "../assets/css/GlobalResetStyle";
import GlobalStyle from "../assets/css/GlobalStyle";
import AuthScreen from "./authScreen/AuthScreen";
import Signup from "./signup/Signup";

export default function App() {
	return (
		<>
			<GlobalResetStyle />
			<GlobalStyle />

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthScreen />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
