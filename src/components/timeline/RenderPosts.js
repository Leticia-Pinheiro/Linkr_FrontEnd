import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  {  ReactTagify  }  from  "react-tagify"
import DeleteModal from "./DeleteModal";
import { MdDelete } from "react-icons/md";
import Like from "./Like";

export default function RenderPosts({ elem, setControlApi }) {
	const [modalIsOpen, setIsOpen] = useState(false);
	let loginStoraged = localStorage.getItem("login");
	let deserializationData = JSON.parse(loginStoraged);
	const navigate = useNavigate();

	function openLink(url) {
		window.open(url);
	}

	const  tagStyle  =  { 		
		fontWeight : 700 , 
		cursor : 'pointer' 
	  } ;
	  
	function goToTagPosts(tag){
		const hashtag = tag.slice(1);
		navigate(`/hashtag/${hashtag}`)
	}	

	function goToUserPosts(id) {
		navigate(`/user/${id}`);
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

					<Likes>
						<Like postId={elem.id} liked={elem.liked} />
					</Likes>
				</BoxPictureAndLike>
				<BoxPostTexts>

					<Delete
						display={
							elem.email === deserializationData.email ? "true" : "false"
						}
						onClick={() => setIsOpen(true)}
					/>
					<User onClick={() => goToUserPosts(elem.userId)}>
						{elem.username}
					</User>

					< ReactTagify  
					tagStyle = { tagStyle }  
					tagClicked = { ( tag ) => goToTagPosts(tag)}
					> 
						<TextPost>{elem.text}</TextPost>
					</ReactTagify>

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
	width: 611px;
	height: 276px;
	border-radius: 16px;
	padding: 5px;
	background-color: black;
	margin-bottom: 20px;

	:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 700px) {
		border-radius: 0;
		margin: 0 0 15px 0;
		width: 100%;
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
	margin: 25px 0 0 0;
`;

const User = styled.p`
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
`;
