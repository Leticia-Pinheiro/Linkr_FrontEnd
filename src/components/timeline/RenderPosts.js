import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import DeleteModal from "./DeleteModal";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";
import Like from "./Like";
import Balloon from "./Balloon";
import EditPost from "./EditPost";
import RepostModal from "./RepostModal";
import axios from "axios";
import urls from "../shared/urls";

export default function RenderPosts({
	elem,
	setControlApi,
	setControlApiUser,
	userInformation,
}) {
	const [modalDeleteIsOpen, setIsOpenDelete] = useState(false);
	const [modalRepostIsOpen, setIsOpenRepost] = useState(false);
	const [totalRepost, setTotalRepost] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [editableText, setEditableText] = useState(null);
	const [isDisabled, setIsDisabled] = useState(true);
	let loginStoraged = localStorage.getItem("login");
	let deserializationData = JSON.parse(loginStoraged);
	const navigate = useNavigate();

	function openLink(url) {
		window.open(url);
	}

	const tagStyle = {
		fontWeight: 700,
		cursor: "pointer",
	};

	function goToTagPosts(tag) {
		const hashtag = tag.slice(1);
		navigate(`/hashtag/${hashtag}`);
		window.location.reload(false);
	}

	function goToUserPosts(id) {
		navigate(`/user/${id}`);
	}

	function handleMouseOver() {
		setIsVisible(true);
	}

	function handleMouseOut() {
		setIsVisible(false);
	}

	function handleEditButton() {
		setEditableText(elem.text);
		setIsEditable(!isEditable);
		setIsDisabled(false);
	}

	useEffect(() => {
		axios
			.get(`${urls.repostTotal}/${elem.id}`)
			.then((response) => {
				setTotalRepost(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Box>
			{elem.repostFrom ? (
				<BoxRepost>
					<RepostIcon />
					Re-posted by
					<RepostName>
						{elem.repostFrom === userInformation.username
							? "you"
							: elem.repostFrom}
					</RepostName>
				</BoxRepost>
			) : null}

			<BoxPosts>
				<DeleteModal
					setIsOpen={setIsOpenDelete}
					modalIsOpen={modalDeleteIsOpen}
					id={elem.id}
					setControlApi={setControlApi}
				/>

				<RepostModal
					setIsOpen={setIsOpenRepost}
					modalIsOpen={modalRepostIsOpen}
					id={elem.id}
					setControlApi={setControlApi}
				/>

				<BoxPictureAndLike>
					<Picture src={elem.imageUrl} alt="avatar" />

					<Likes onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
						<Like
							postId={elem.id}
							liked={elem.liked}
							likes={elem.likes}
							setControlApi={setControlApi}
							setControlApiUser={setControlApiUser}
						/>
						{isVisible ? <Balloon whoLiked={elem.whoLiked} /> : null}
					</Likes>

					<Repost>
						<RepostIconPosts onClick={() => setIsOpenRepost(true)} />
						{totalRepost} re-posts
					</Repost>
				</BoxPictureAndLike>
				<BoxPostTexts>
					<Delete
						display={
							elem.email === deserializationData.email ? "true" : "false"
						}
						onClick={() => setIsOpenDelete(true)}
					/>
					<Edit
						display={
							elem.email === deserializationData.email ? "true" : "false"
						}
						onClick={handleEditButton}
					/>
					<User onClick={() => goToUserPosts(elem.userId)}>
						{elem.username}
					</User>

					{isEditable ? (
						<EditPost
							postId={elem.id}
							text={elem.text}
							isEditable={isEditable}
							setIsEditable={setIsEditable}
							editableText={editableText}
							setEditableText={setEditableText}
							isDisabled={isDisabled}
							setIsDisabled={setIsDisabled}
							setControlApi={setControlApi}
							setControlApiUser={setControlApiUser}
						/>
					) : (
						<ReactTagify
							tagStyle={tagStyle}
							tagClicked={(tag) => goToTagPosts(tag)}
						>
							<TextPost>{elem.text}</TextPost>
						</ReactTagify>
					)}

					<LinkContainer onClick={() => openLink(elem.url)}>
						<LinkTextContainer>
							<LinkTitle>{elem.urlTitle}</LinkTitle>
							<LinkDescription>{elem.urlDescription}</LinkDescription>
							<Link>{elem.url}</Link>
						</LinkTextContainer>

						<LinkImage
							src={
								elem.urlImage === ""
									? "https://shortly-back.herokuapp.com/urls/open/O3LVy3"
									: elem.urlImage
							}
							alt="imageLink"
						/>
					</LinkContainer>
				</BoxPostTexts>
			</BoxPosts>
		</Box>
	);
}

const Box = styled.div`
	width: 611px;
	background: #1e1e1e;
	margin-bottom: 20px;
	border-radius: 16px;

	:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 700px) {
		border-radius: 0;
		margin: 0 0 15px 0;
		width: 100vw;
	}
`;

const BoxPosts = styled.div`
	display: flex;
	height: 276px;
	width: 100%;
	border-radius: 16px;
	padding: 5px;
	background-color: black;
`;

const BoxRepost = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 30px;
	background: #1e1e1e;
	border-radius: 16px;
	color: white;
	font-size: 14px;
	font-family: "Lato";
	padding: 0 0 0 15px;
`;

const BoxPictureAndLike = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 20%;
	height: 100%;
	padding: 20px 0;
`;

const BoxPostTexts = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 20px;
	width: 80%;
	height: 100%;
	position: relative;

	@media (max-width: 700px) {
		padding: 10px;
	}
`;

const Picture = styled.img`
	width: 70px;
	height: 70px;
	border-radius: 50px;

	@media (max-width: 700px) {
		width: 40px;
		height: 40px;
	}
`;

const Likes = styled.div`
	display: flex;
	justify-content: center;
	cursor: pointer;
	position: relative;
`;

const User = styled.p`
	width: fit-content;
	margin-right: auto;
	font-family: "Lato";
	font-weight: 400;
	font-size: 19px;
	color: #ffffff;
	cursor: pointer;
`;

const TextPost = styled.p`
	margin: 10px 0 10px 0;
	font-family: "Lato";
	font-weight: 400;
	font-size: 17px;
	color: #b7b7b7;
	word-wrap: break-word;
`;

const LinkContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	border: 1px solid #4d4d4d;
	border-radius: 11px;
	cursor: pointer;
`;

const LinkTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 80%;
	padding: 10px;
	max-width: 350px;

	@media (max-width: 700px) {
		width: 80%;
	}
`;

const LinkImage = styled.img`
	border-radius: 0 11px 11px 0;
	width: calc(40% - 40px);
	object-fit: fill;

	@media (max-width: 700px) {
		width: 40%;
		object-fit: cover;
	}
`;

const LinkTitle = styled.p`
	font-family: "Lato";
	font-weight: 400;
	font-size: 16px;
	color: #cecece;
	word-wrap: break-word;
	word-break: break-all;
	margin-bottom: 15px;
`;

const LinkDescription = styled.p`
	font-family: "Lato";
	font-weight: 400;
	font-size: 11px;
	color: #9b9595;
	word-wrap: break-word;
	word-break: break-all;
	margin-bottom: 15px;
`;

const Link = styled.p`
	max-width: 250px;
	font-family: "Lato";
	font-weight: 400;
	font-size: 11px;
	color: #cecece;
	word-wrap: break-word;
	word-break: break-all;
`;

const Delete = styled(MdDelete)`
	display: ${(props) => (props.display === "true" ? null : "none")};
	color: white;
	position: absolute;
	top: 15px;
	right: 15px;
	cursor: pointer;
`;

const Edit = styled(FaPencilAlt)`
	display: ${(props) => (props.display === "true" ? null : "none")};
	font-size: 12px;
	color: white;
	position: absolute;
	top: 17px;
	right: 37px;
	cursor: pointer;
`;

const RepostIcon = styled(IoMdRepeat)`
	color: #ffffff;
	font-size: 20px;
`;

const RepostName = styled.p`
	font-weight: bold;
	margin-left: 4px;
`;

const Repost = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Lato";
	font-size: 11px;
	color: white;
	cursor: pointer;
`;

const RepostIconPosts = styled(IoMdRepeat)`
	color: #ffffff;
	font-size: 27px;
`;
