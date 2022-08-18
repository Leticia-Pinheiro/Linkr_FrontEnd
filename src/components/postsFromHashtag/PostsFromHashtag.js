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
import ControlApiContext from "../context/ControlApiContext";

export default function PostsFromHashtag() {
	const { hashtag } = useParams();
	const [TagPosts, setTagPosts] = useState([]);
	const navigate = useNavigate();
	const { userInformation } = useContext(UserContext);
	const [controlLoading, setControlLoading] = useState(true);
	const { setControlApi, setControlApiUser, controlApiUser } =
		useContext(ControlApiContext);

	const [page, setPage] = useState(0);

	const config = {
		headers: {
			Authorization: `Bearer ${userInformation.token}`,
		},
	};

	useEffect(() => {
		axios
			.get(`${urls.getHashtag}/${hashtag}?page=${page}`, config)
			.then((response) => {
				setTagPosts(response.data);
				setControlLoading(false);
				setControlApiUser(false);
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
	}, [controlApiUser]);

	useEffect( () => {
		const hashtagPageObserver = new IntersectionObserver( (entries) => {
			if (entries.some( (entry) => entry.isIntersecting)) {
				setPage(previousPage => previousPage + 1);
				setControlApiUser(true);
			}
		});
		hashtagPageObserver.observe(document.querySelector('#hashtagPageSentinel'));
		return () => hashtagPageObserver.disconnect();
	}, []);

	return (
		<Feed>
			{controlLoading ? (
				<FeedLoading />
			) : (
				<>
					{!TagPosts.length ? null : <Title># {hashtag}</Title>}

					<Container>
						<ContainerTimeline>
							{!TagPosts.length ? (
								<NoPostsYet>No posts yet!</NoPostsYet>
							) : (
								TagPosts.map((elem, index) => (
									<RenderPosts
										key={index}
										elem={elem}
										setControlApiUser={setControlApiUser}
										setControlApi={setControlApi}
									/>
								))
							)}
						</ContainerTimeline>
						<HashtagBox />
					</Container>
				</>
			)}
			<Sentinel id="hashtagPageSentinel"></Sentinel>
		</Feed>
	);
}

const Sentinel = styled.div`
`

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
	display: flex;
`;

const ContainerTimeline = styled.div`
	display: flex;
	flex-direction: column;
`;
