import styled from "styled-components";
import { useContext, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DeleteModal from "./DeleteModal";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import Like from "./Like";
import Balloon from "./Balloon";
import urls from "../shared/urls";

export default function RenderPosts({ elem, setControlApi }) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [editableText, setEditableText] = useState(null);
	const [isDisabled, setIsDisabled] = useState(true);
	const { userInformation } = useContext(UserContext);
	let loginStoraged = localStorage.getItem("login");
	let deserializationData = JSON.parse(loginStoraged);
	const navigate = useNavigate();
	// const inputRef = useRef();
	
	function openLink(url) {
		window.open(url);
	}
	
	function goToUserPosts(id) {
		navigate(`/user/${id}`);
	}

	function handleMouseOver () {
		setIsVisible(true);
	}

	function handleMouseOut () {
		setIsVisible(false);
	}

	async function handleKeyDown (e) {
		
		if (e.keyCode === 27) {
			setEditableText(elem.text);
			setIsEditable(!isEditable);
		}
		if (e.keyCode === 13) {
			setIsDisabled(true);
			const bory = {
				text: e.target.value
			}
			const header = {
				headers: {
					Authorization: `Bearer ${userInformation.token}`
				}
			};
			await axios.put(`${urls.updatePost}/${elem.id}`, bory, header)
				.then( () => {
					setControlApi(true);
					setIsEditable(false);
				})
				.catch( () => {
					alert('Could not update text!');
					setIsDisabled(false);
				})
		}
	}

	return (
		<>
			<Box>
				<DeleteModal
					setIsOpen={setIsOpen}
					modalIsOpen={modalIsOpen}
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
						/>
						{isVisible ? (
							<Balloon 
								whoLiked={elem.whoLiked}
							/>
						) : null}
					</Likes>
				</BoxPictureAndLike>
				<BoxPostTexts>
					<Delete
						display={
							elem.email === deserializationData.email ? "true" : "false"
						}
						onClick={() => setIsOpen(true)}
					/>
					<Edit
						display={
							elem.email === deserializationData.email ? "true" : "false"
						}
						onClick={() => {
							setEditableText(elem.text);
							setIsEditable(!isEditable);
							setIsDisabled(false);
							// inputRef.current.focus();
						}}
					/>
					<User onClick={() => goToUserPosts(elem.userId)}>
						{elem.username}
					</User>

					{isEditable ? (
						<TextInput
							placeholder="Description..."
							name="text"
							value={editableText}
							onChange={ (e) => setEditableText(e.target.value)}
							disabled={isDisabled}
							onKeyDown={handleKeyDown}
							// ref={inputRef}
						/>
					) : <TextPost>{elem.text}</TextPost>}
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
			</Box>
		</>
	);
}

const Box = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	border-radius: 16px;
	padding: 5px;
	background-color: black;
	margin: 0 0 20px 0;

	:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 700px) {
		border-radius: 0;
		margin: 0 0 15px 0;
	}
`;

const BoxPictureAndLike = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 20%;
	height: 100%;
	padding: 15px 0 0 0;
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

//likes
const Likes = styled.div`
	display: flex;
	justify-content: center;
	margin: 25px 0 0 0;
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

	@media (max-width: 700px) {
		width: 80%;
	}
`;

const LinkTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 80%;
	padding: 10px;
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
	margin-bottom: 15px;
`;

const LinkDescription = styled.p`
	font-family: "Lato";
	font-weight: 400;
	font-size: 11px;
	color: #9b9595;
	word-wrap: break-word;
	margin-bottom: 15px;
`;

const Link = styled.p`
	font-family: "Lato";
	font-weight: 400;
	font-size: 11px;
	color: #cecece;
	word-wrap: break-word;
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

const TextInput = styled.input`
	all: unset;

	height: 30px;
	padding: 10px;
	margin: 5px 0;
	background-color: ${(props) => (props.disabled ? "#D6D6D6" : "#EFEFEF")};
	border-radius: 5px;
	box-sizing: border-box;

	font-family: "Lato";
	font-weight: 300;
	font-size: 15px;
	color: #949494;

	::placeholder {
		font-family: "Lato";
		font-weight: 300;
		font-size: 15px;
		color: #949494;
	}
`;
