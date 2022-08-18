import styled from "styled-components";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import urls from "../shared/urls";
import UserContext from "../context/UserContext";
import ControlApiContext from "../context/ControlApiContext";

export default function Comments({
	postId,
	setComments,
	setRenderComments,
	renderComments,
}) {
	const [totalComments, setTotalComments] = useState(0);
	const { userInformation } = useContext(UserContext);
	const { controlApiComments } = useContext(ControlApiContext);
	const config = {
		headers: {
			Authorization: `Bearer ${userInformation.token}`,
		},
	};

	function toggleRender() {
		if (renderComments) {
			setRenderComments(false);
		} else {
			setRenderComments(true);
		}
	}

	useEffect(() => {
		axios
			.get(`${urls.commentsTotal}/${postId}`, config)
			.then((response) => {
				setTotalComments(response.data.count);
				setComments(response.data.comments);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [controlApiComments]);

	return (
		<Box onClick={toggleRender}>
			<ChatIcon />
			<EllipsisIcon>...</EllipsisIcon>
			{totalComments} comments
		</Box>
	);
}

const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Lato";
	font-size: 11px;
	color: white;
	cursor: pointer;
`;

const ChatIcon = styled(IoChatbubblesOutline)`
	transform: scaleX(-1);
	font-size: 23px;
	position: relative;
	margin-bottom: 3px;
`;

const EllipsisIcon = styled.p`
	position: absolute;
`;
