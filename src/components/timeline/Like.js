import axios from "axios";
import { useContext } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import styled from "styled-components";
import urls from "../shared/urls.js";
import UserContext from "../context/UserContext";

export default function Like({
	postId,
	liked,
	likes,
	setControlApi,
	setControlApiUser,
}) {
	const { userInformation } = useContext(UserContext);

	function toggleLike() {
		const body = {
			postId,
			postStatus: !liked,
		};

		const header = {
			headers: {
				Authorization: `Bearer ${userInformation.token}`,
			},
		};

		axios
			.put(urls.like, body, header)
			.then(() => {
				setControlApi(true);
				setControlApiUser(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<Container>
			{liked ? (
				<Liked onClick={toggleLike} />
			) : (
				<NotLiked onClick={toggleLike} />
			)}
			<LikesCount>
				{likes}
				{likes > 1 ? " likes" : " like"}
			</LikesCount>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Liked = styled(IoHeart)`
	fill: #ac0000;
	font-size: 25px;
`;

const NotLiked = styled(IoHeartOutline)`
	color: #fff;
	font-size: 25px;
`;

const LikesCount = styled.h3`
	font-family: "Lato";
	font-weight: 400;
	font-size: 11px;
	color: #fff;

	margin-top: 5px;
`;
