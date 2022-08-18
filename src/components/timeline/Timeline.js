import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import useInterval from "use-interval";

import Feed from "../feed/Feed";
import RenderPosts from "./RenderPosts";
import urls from "../shared/urls";
import FeedLoading from "../shared/FeedLoading";
import PostInterface from "./PostInterface";
import ControlApiContext from "../context/ControlApiContext";
import HashtagBox from "./HashtagBox";
import LoadPostsButton from "./LoadPostsButton";

export default function Timeline() {
	const [postsData, setPostsData] = useState({ posts: [], followers: [] });
	const [controlLoading, setControlLoading] = useState(true);
	const { userInformation } = useContext(UserContext);
	const { setControlApi, controlApi, setControlApiUser } =
		useContext(ControlApiContext);
		
	const [lastPostCreatedAt, setLastPostCreatedAt] = useState(null);
	const [recentPosts, setRecentPosts] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function teste() {
			const header = {
				headers: {
					Authorization: `Bearer ${userInformation.token}`,
				},
			};

			axios
				.get(urls.getPosts+`?page=${page}`, header)
				.then((response) => {
					setControlLoading(false);
					setIsLoading(false);
					setPostsData(response.data);
					setControlApi(false);

					if (response.data.posts.length) {
						setLastPostCreatedAt(response.data.posts[0].createdAt);
					}
				})
				.catch((err) => {
					setControlLoading(false);
					setPostsData("error");
					setControlApi(false);
				});
		}
		teste();
	}, [controlApi]);

	useInterval(() => {
		const body = {
			lastPostCreatedAt,
		};
		const header = {
			headers: {
				Authorization: `Bearer ${userInformation.token}`,
			},
		};

		const promise = axios.post(`${urls.loadPosts}`, body, header);

		promise.then((response) => {
			setRecentPosts(response.data);
		});
	}, 5000);

	useEffect( () => {
		const timelineObserver = new IntersectionObserver( (entries) => {
			if (entries.some( (entry) => entry.isIntersecting)) {
				setIsLoading(true);
				setPage(previousPage => previousPage + 1);
				setControlApi(true);
			}
		});
		timelineObserver.observe(document.querySelector('#timeLineSentinel'));
		return () => timelineObserver.disconnect();
	}, []);

	return (
		<Feed>
			<Title>timeline</Title>
			<Box>
				<Container>
					<ContainerTimeline>
						<PostInterface setControlApi={setControlApi} />
						{recentPosts.length ? (
							<LoadPostsButton
								amount={recentPosts.length}
								postsData={postsData}
								recentPosts={recentPosts}
								setPostsData={setPostsData}
								setLastPostCreatedAt={setLastPostCreatedAt}
							/>
						) : null}

						{controlLoading ? (
							<FeedLoading />
						) : postsData === "error" ? (
							<ErrorText>
								An error occured while trying to fetch the posts, please refresh
								the page!
							</ErrorText>
						) : !postsData.followers.length ? (
							<NoPostsYet>
								You don't follow anyone yet. Search for new friends!
							</NoPostsYet>
						) : !postsData.posts.length ? (
							<NoPostsYet>No posts found from your friends</NoPostsYet>
						) : (
							postsData.posts.map((elem, index) => (
								<RenderPosts
									key={index}
									elem={elem}
									setControlApi={setControlApi}
									setControlApiUser={setControlApiUser}
									userInformation={userInformation}
								/>
							))
						)}
						<Sentinel id="timeLineSentinel"/>
						{isLoading && page > 1 ? (
							<>
								<FeedLoading />
								{/* <Text>Loading more posts</Text> */}
							</>
						) : null}
					</ContainerTimeline>
				</Container>
				<HashtagBox />
			</Box>
		</Feed>
	);
}

const Text = styled.h3`
	padding: 600px auto 100px auto;
`;

const Sentinel = styled.div`
`;

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
