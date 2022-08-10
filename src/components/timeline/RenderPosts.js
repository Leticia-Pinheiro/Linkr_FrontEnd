import styled from "styled-components";

export default function RenderPosts({ elem }) {
	function openLink(url) {
		window.open(url);
	}

	return (
		<>
			<Box>
				<BoxPictureAndLike>
					<Picture src={elem.imageUrl} alt="avatar" />

					<Likes></Likes>
				</BoxPictureAndLike>
				<BoxPostTexts>
					<User>{elem.username}</User>
					<TextPost>{elem.text}</TextPost>
					<LinkContainer onClick={() => openLink(elem.url)}>
						<LinkTextContainer>
							<LinkTitle>{elem.urlTitle}</LinkTitle>
							<LinkDescription>{elem.urlDescription}</LinkDescription>
							<Link>{elem.url}</Link>
						</LinkTextContainer>
						<LinkImage src={elem.urlImage} alt="imageLink" />
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
	width: 40%;
	object-fit: fill;
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