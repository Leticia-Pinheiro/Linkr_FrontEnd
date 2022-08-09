import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import GlobalResetStyle from "../assets/css/GlobalResetStyle";
import GlobalStyle from "../assets/css/GlobalStyle";
import AuthScreen from "./authScreen/AuthScreen";
import Signup from "./signup/Signup";
import UserContext from "./context/UserContext";

export default function App() {
	const [userInformation, setUserInformation] = useState(null);
	return (
		<>
			<GlobalResetStyle />
			<GlobalStyle />
			<UserContext.Provider
				value={{
					setUserInformation,
					userInformation,
				}}
			>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<AuthScreen />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</BrowserRouter>
			</UserContext.Provider>
		</>
	);
}
