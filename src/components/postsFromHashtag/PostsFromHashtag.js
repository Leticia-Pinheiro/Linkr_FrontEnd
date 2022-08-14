import axios from "axios";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import urls from "../shared/urls";
import Feed from "../feed/Feed";
import RenderPosts from "../timeline/RenderPosts";
import FeedLoading from "../shared/FeedLoading";
import UserContext from "../context/UserContext";

export default function PostsFromHashtag() {
	const { hashtag } = useParams() 
	const [TagPosts, setTagPosts] = useState([]);
	const navigate = useNavigate();		
	const { userInformation } = useContext(UserContext);
	const [controlLoading, setControlLoading] = useState(true);

	const config = {
		headers: {
			Authorization: `Bearer ${userInformation.token}`,
		},
	};

	useEffect(() => {
		axios
			.get(`${urls.getHashtag}/${hashtag}`, config)
			.then((response) => {
				setTagPosts(response.data);
				setControlLoading(false);
			})
			.catch((err) => {
				if (err.response.status === 404) {
					alert("Hashtag não encontrada!");
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
					{!TagPosts.length ? null : (
						<Title># {hashtag}</Title>
					)}
					{!TagPosts.length ? (
						<NoPostsYet>No posts yet!</NoPostsYet>
					) : (
						TagPosts.map((elem, index) => (
							<RenderPosts key={index} elem={elem} />
						))
					)}
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
