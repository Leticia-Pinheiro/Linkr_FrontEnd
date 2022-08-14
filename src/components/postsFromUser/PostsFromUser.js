import axios from "axios";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import urls from "../shared/urls";
import Feed from "../feed/Feed";
import RenderPosts from "../timeline/RenderPosts";
import FeedLoading from "../shared/FeedLoading";
import UserContext from "../context/UserContext";
import HashtagBox from "../timeline/HashtagBox";

export default function PostsFromUser() {
	const [userPosts, setUserPosts] = useState([]);
	const navigate = useNavigate();
	let { id } = useParams();
	const { userInformation } = useContext(UserContext);
	const [controlLoading, setControlLoading] = useState(true);

	const config = {
		headers: {
			Authorization: `Bearer ${userInformation.token}`,
		},
	};

	useEffect(() => {
		axios
			.get(`${urls.getPosts}/${id}`, config)
			.then((response) => {
				setUserPosts(response.data);
				setControlLoading(false);
			})
			.catch((err) => {
				if (err.response.status === 404) {
					alert("Usuário não encontrado!");
					navigate("/timeline");
					setControlLoading(false);
				} else {
					alert(err.response.data);
					setControlLoading(false);
				}
			});
	}, []);

	return (
		<Feed>

			{controlLoading ? (
				<FeedLoading />
			) : (
				<>
					{!userPosts.length ? null : (
						<Title>{userPosts[0].username}'s posts</Title>
					)}

					<Container>
						<ContainerTimeline>					
							{!userPosts.length ? (
								<NoPostsYet>User hasn't posted yet</NoPostsYet>
							) : (
								userPosts.map((elem, index) => (
									<RenderPosts key={index} elem={elem} />
								))
							)}
						</ContainerTimeline>
						<HashtagBox />
					</Container>
				</>
			)}
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

const NoPostsYet = styled.p`
	font-family: "Oswald";
	font-weight: bold;
	font-size: 20px;
	color: #ffffff;
	text-align: center;
`;

const Container = styled.div`
	display: flex;`

const ContainerTimeline = styled.div`
	display: flex;
	flex-direction: column;`