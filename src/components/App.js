import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import GlobalResetStyle from "../assets/css/GlobalResetStyle";
import GlobalStyle from "../assets/css/GlobalStyle";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import UserContext from "./context/UserContext";
import Timeline from "./timeline/Timeline";
import PostsFromHashtag from "./postsFromHashtag/PostsFromHashtag.js";
import PostsFromUser from "./postsFromUser/PostsFromUser";
import ControlApiContext from "./context/ControlApiContext";

export default function App() {
	const [userInformation, setUserInformation] = useState({
		imageAvatar: localStorage?.getItem("avatar"),
		token: localStorage?.getItem("token"),
		username: localStorage?.getItem("username"),
		userId: localStorage?.getItem("userId"),
	});
	const [controlApi, setControlApi] = useState(true);
	const [controlApiUser, setControlApiUser] = useState(true);
	const [controlApiComments, setControlApiComments] = useState(false);

	return (
		<>
			<GlobalResetStyle />
			<GlobalStyle />

			<ControlApiContext.Provider
				value={{
					setControlApi,
					controlApi,
					setControlApiUser,
					controlApiUser,
					controlApiComments,
					setControlApiComments,
				}}
			>
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
							<Route path="/user/:id" element={<PostsFromUser />} />
							<Route path="/hashtag/:hashtag" element={<PostsFromHashtag />} />
						</Routes>
					</BrowserRouter>
				</UserContext.Provider>
			</ControlApiContext.Provider>
		</>
	);
}
