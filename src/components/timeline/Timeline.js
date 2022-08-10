import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

import Feed from "../feed/Feed";
import RenderPosts from "./RenderPosts";
import urls from "../shared/urls";
import FeedLoading from "../shared/FeedLoading";
import PostInterface from "./PostInterface";

export default function Timeline() {
	const [postsData, setPostsData] = useState("error");
	const [controlApi, setControlApi] = useState(true);
	const [controlLoading, setControlLoading] = useState(true);

	if (controlApi) {
		setControlApi(false);

		axios
			.get(urls.getPosts)
			.then((response) => {
				setControlLoading(false);
				setPostsData(response.data);
			})
			.catch((err) => {
				setControlLoading(false);
				setPostsData("error");
			});
	}

	return (
		<Feed>
			<Title>timeline</Title>

			<PostInterface setControlApi={setControlApi} />

			{controlLoading ? (
				<FeedLoading />
			) : postsData === "error" ? (
				<ErrorText>
					An error occured while trying to fetch the posts, please refresh the
					page!
				</ErrorText>
			) : !postsData.length ? (
				<NoPostsYet>There are no posts yet</NoPostsYet>
			) : (
				postsData.map((elem, index) => <RenderPosts key={index} elem={elem} />)
			)}
		</Feed>
	);
}

const Title = styled.p`
	font-family: "Oswald";
	font-weight: bold;
	font-size: 43px;
	color: #ffffff;

	@media (max-width: 700px) {
		margin-left: 20px;
	}
`;

const ErrorText = styled.p`
	font-family: "Oswald";
	font-weight: bold;
	font-size: 20px;
	color: #ffffff;
	text-align: center;
`;

const NoPostsYet = styled.p`
	font-family: "Oswald";
	font-weight: bold;
	font-size: 20px;
	color: #ffffff;
	text-align: center;
`;
