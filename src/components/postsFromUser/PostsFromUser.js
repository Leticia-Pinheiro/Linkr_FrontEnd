import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import urls from "../shared/urls";
import Feed from "../feed/Feed";
import RenderPosts from "../timeline/RenderPosts";
import FeedLoading from "../shared/FeedLoading";

export default function PostsFromUser() {
	const [userPosts, setUserPosts] = useState([]);
	const navigate = useNavigate();
	let { id } = useParams();

	useEffect(() => {
		axios
			.get(`${urls.getPosts}/${id}`)
			.then((response) => {
				setUserPosts(response.data);
			})
			.catch((err) => {
				if (err.response.status === 404) {
					alert("Usuário não encontrado!");
					navigate("/timeline");
				} else {
					alert(err.response.data);
				}
			});
	}, []);

	return (
		<Feed>
			{!userPosts.length ? (
				<FeedLoading />
			) : (
				<>
					<Title>{userPosts[0].username}'s posts</Title>
					{userPosts.map((elem, index) => (
						<RenderPosts key={index} elem={elem} />
					))}
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
