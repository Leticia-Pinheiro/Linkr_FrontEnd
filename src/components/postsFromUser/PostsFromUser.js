import axios from "axios";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import urls from "../shared/urls";
import Feed from "../feed/Feed";
import RenderPosts from "../timeline/RenderPosts";
import FeedLoading from "../shared/FeedLoading";
import UserContext from "../context/UserContext";
import ControlApiContext from "../context/ControlApiContext";
import HashtagBox from "../timeline/HashtagBox";

export default function PostsFromUser() {
	const [userPosts, setUserPosts] = useState([]);
	const navigate = useNavigate();
	let { id } = useParams();
	const { userInformation } = useContext(UserContext);
	const [controlLoading, setControlLoading] = useState(true);
	const { setControlApi, setControlApiUser, controlApiUser } =
		useContext(ControlApiContext);
	const [disableButton, setDisableButton] = useState(false);

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
				setControlApiUser(false);
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
	}, [controlApiUser]);

	console.log(userPosts[0]);
	console.log(controlApiUser);

	async function followUser() {
		setDisableButton(true);

		await axios
			.post(urls.follow, { id }, config)
			.then(() => {
				setDisableButton(false);
				setControlApiUser(true);
			})
			.catch((err) => {
				setDisableButton(false);

				alert(err.response.data);
			});
	}

	return (
		<Feed>
			{controlLoading ? (
				<FeedLoading />
			) : (
				<>
					<TitleContainer>
						{!userPosts.length ? null : (
							<Title>{userPosts[0].username}'s posts</Title>
						)}
						{userInformation.username !== userPosts[0].username ? (
							<ButtonFollow
								disable={disableButton ? "true" : "false"}
								onClick={followUser}
							>
								{userPosts[0].following ? "Unfollow" : "Follow"}
							</ButtonFollow>
						) : null}
					</TitleContainer>

					<Container>
						<ContainerTimeline>
							{!userPosts.length ? (
								<NoPostsYet>User hasn't posted yet</NoPostsYet>
							) : (
								userPosts.map((elem, index) => (
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

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 120px 0 40px 0;
`;

const ButtonFollow = styled.button`
	width: 110px;
	height: 30px;
	border: none;
	background: #1877f2;
	border-radius: 5px;
	pointer-events: ${(props) => (props.disable === "true" ? "none" : null)};
	font-family: "Lato";
	font-weight: 700;
	font-size: 14px;
	color: #ffffff;
`;
