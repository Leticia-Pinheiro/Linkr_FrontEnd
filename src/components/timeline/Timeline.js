import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";

import Feed from "../feed/Feed";
import RenderPosts from "./RenderPosts";
import urls from "../shared/urls";
import FeedLoading from "../shared/FeedLoading";
import PostInterface from "./PostInterface";
import ControlApiContext from "../context/ControlApiContext";
import HashtagBox from "./HashtagBox";

export default function Timeline() {
	const [postsData, setPostsData] = useState("");
	const [controlLoading, setControlLoading] = useState(true);
	const { userInformation } = useContext(UserContext);
	const { setControlApi, controlApi, setControlApiUser } =
		useContext(ControlApiContext);

	useEffect(() => {
		const header = {
			headers: {
				Authorization: `Bearer ${userInformation.token}`,
			},
		};

		axios
			.get(urls.getPosts, header)
			.then((response) => {
				setControlLoading(false);
				setPostsData(response.data);
				setControlApi(false);
			})
			.catch((err) => {
				setControlLoading(false);
				setPostsData("error");
				setControlApi(false);
			});
	}, [controlApi]);

	return (
		<Feed>
			<Title>timeline</Title>
			<Box>
				<Container>
					<ContainerTimeline>
						<PostInterface setControlApi={setControlApi} />

						{controlLoading ? (
							<FeedLoading />
						) : postsData === "error" ? (
							<ErrorText>
								An error occured while trying to fetch the posts, please refresh
								the page!
							</ErrorText>
						) : !postsData.length ? (
							<NoPostsYet>There are no posts yet</NoPostsYet>
						) : (
							postsData.map((elem, index) => (
								<RenderPosts
									key={index}
									elem={elem}
									setControlApi={setControlApi}
									setControlApiUser={setControlApiUser}
								/>
							))
						)}
					</ContainerTimeline>
				</Container>
				<HashtagBox />
			</Box>
		</Feed>
	);
}

const Title = styled.p`
	font-family: "Oswald";
	font-weight: bold;
	font-size: 43px;
	color: #ffffff;
	margin-bottom: 40px;

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

const Container = styled.div`
	display: flex;
`;

const ContainerTimeline = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	@media (max-width: 700px) {
		width: 100%;
	}
`;

const Box = styled.div`
	display: flex;
	margin: 0 auto;
`;
