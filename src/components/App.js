import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import GlobalResetStyle from "../assets/css/GlobalResetStyle";
import GlobalStyle from "../assets/css/GlobalStyle";
import AuthScreen from "./authScreen/AuthScreen";
import Signup from "./signup/Signup";
import Feed from "./feed/Feed.js"
import UserContext from "./context/UserContext";
import Timeline from "./timeline/Timeline";


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
						<Route path="/timeline" element={<Timeline />} />
						<Route path="/feed" element={<Feed />} />
					</Routes>
				</BrowserRouter>
			</UserContext.Provider>
		</>
	);
}
