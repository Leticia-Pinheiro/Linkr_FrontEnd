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
	const [postsData, setPostsData] = useState("");
	const [controlLoading, setControlLoading] = useState(true);
	const { userInformation } = useContext(UserContext);
	const { setControlApi, controlApi, setControlApiUser } =
		useContext(ControlApiContext);
	const [lastPostCreatedAt, setLastPostCreatedAt] = useState(null);
	const [recentPosts, setRecentPosts] = useState([]);
	
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
				setLastPostCreatedAt(response.data[0].createdAt);
			})
			.catch((err) => {
				setControlLoading(false);
				setPostsData("error");
				setControlApi(false);
			});
	}, [controlApi]);

	useInterval( async () => {
        
        const body = {
            lastPostCreatedAt
        }

        const header = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        };

        const promise = axios.post(`${urls.loadPosts}`, body, header);

        promise.then( response => {
			setRecentPosts(response.data)
        });

    }, 5000);

	return (
		<Feed>
			<Title>timeline</Title>
			<Container>			
				<ContainerTimeline>
					<PostInterface setControlApi={setControlApi} />		
					{recentPosts.length ? 
						<LoadPostsButton
							amount={recentPosts.length} 
							recentPosts={recentPosts}
							setPostsData={setPostsData}
						/>
					: null}
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

				<HashtagBox/>
			</Container>			
			

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
	`
const ContainerTimeline = styled.div`
	display: flex;
	flex-direction: column;
	width: 70%;

	@media (max-width: 700px) {
		width: 100%;
	}
	`

