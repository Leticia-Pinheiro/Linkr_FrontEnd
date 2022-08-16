import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import urls from "../shared/urls";
import ControlApiContext from "../context/ControlApiContext";

export default function HashtagBox() {
	const navigate = useNavigate();
	const [tagsData, setTagsData] = useState([]);
	const { setControlApi, controlApi } = useContext(ControlApiContext);
	const { userInformation } = useContext(UserContext);

	useEffect(() => {
		const header = {
			headers: {
				Authorization: `Bearer ${userInformation.token}`,
			},
		};

		axios
			.get(urls.getHashtags, header)
			.then((response) => {
				setTagsData(response.data);
				setControlApi(false);
			})
			.catch((err) => {
				setControlApi(false);
			});
	}, [controlApi]);

	function goToTagPosts(tag) {
		navigate(`/hashtag/${tag}`);
		window.location.reload(false);
	}

	return (
		<Container>
			<Title>trending</Title>
			<Line></Line>
			<ContainerTag>
				{!tagsData.length ? (
					<></>
				) : (
					tagsData.map((tag, index) => (
						<BoxTag>
							<Tag key={index} onClick={() => goToTagPosts(tag.name)}>
								# {tag.name}
							</Tag>
						</BoxTag>
					))
				)}
			</ContainerTag>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	max-width: 300px;
	height: 406px;
	background: #171717;
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	margin-left: 25px;

	@media (max-width: 700px) {
		display: none;
	}
`;

const Title = styled.h1`
	font-family: "Oswald";
	font-style: normal;
	font-weight: 700;
	font-size: 27px;

	color: #ffffff;
	padding: 16px;
`;

const Line = styled.div`
	width: 100%;
	height: 0;
	border: 1px solid #484848;
`;

const ContainerTag = styled.div`
	display: flex;
	flex-direction: column;
	margin: 22px 0 0 16px;
`;

const BoxTag = styled.div`
	max-width: 240px;
	height: 25px;
	overflow: hidden;
	cursor: pointer;
`;

const Tag = styled.p`
	font-family: "Lato";
	font-style: normal;
	font-weight: 700;
	font-size: 19px;
	line-height: 23px;
	letter-spacing: 0.05em;
	color: #ffffff;
	text-overflow: ellipsis;
	padding: 3px;
	word-break: break-all;
`;
