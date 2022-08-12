import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import GlobalResetStyle from "../assets/css/GlobalResetStyle";
import GlobalStyle from "../assets/css/GlobalStyle";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import UserContext from "./context/UserContext";
import Timeline from "./timeline/Timeline";
import Hashtag from "./timeline/Hashtag.js"
import PostsFromUser from "./postsFromUser/PostsFromUser";


export default function App() {
	const [userInformation, setUserInformation] = useState({
		imageAvatar: localStorage?.getItem("avatar"),
		token: localStorage?.getItem("token"),
	});

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
						<Route path="/" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/timeline" element={<Timeline />} />
						<Route path="/hashtag/:hashtag" element={<Hashtag />} />
						<Route path="/user/:id" element={<PostsFromUser />} />

					</Routes>
				</BrowserRouter>
			</UserContext.Provider>
		</>
	);
}
