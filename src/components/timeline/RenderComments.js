import styled from "styled-components";
import { useState, useContext } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import axios from "axios";

import urls from "../shared/urls";
import ControlApiContext from "../context/ControlApiContext";

export default function RenderComments({
	comments,
	userInformation,
	author,
	postId,
}) {
	const [commentDataInput, setCommentDataInput] = useState({
		text: "",
	});
	const { setControlApiComments } = useContext(ControlApiContext);

	function handleFormChange(e) {
		let data = { ...commentDataInput };
		data[e.target.name] = e.target.value;
		setCommentDataInput(data);
	}

	const config = {
		headers: {
			Authorization: `Bearer ${userInformation.token}`,
		},
	};

	async function postComment() {
		const body = {
			postId,
			comment: commentDataInput.text,
		};

		await axios
			.post(urls.comments, body, config)
			.then(() => {
				setControlApiComments(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<Box>
			{comments.map((elem, index) => (
				<div key={index}>
					<BoxComment>
						<BoxUser>
							<BoxAvatar src={elem.imageUrl} alt="avatar" />
						</BoxUser>
						<BoxCommentText>
							<TextUser>
								{elem.username}{" "}
								{elem.userId === author ? (
									<IsFollowing>• post’s author</IsFollowing>
								) : !elem.following ? null : elem.userId ===
								  parseInt(userInformation.userId) ? null : (
									<IsFollowing>• following</IsFollowing>
								)}
							</TextUser>

							<Text>{elem.text}</Text>
						</BoxCommentText>
					</BoxComment>
					<Line></Line>
				</div>
			))}
			<BoxPostComment>
				<BoxAvatar
					src={userInformation.imageAvatar || userInformation.image}
					alt="avatar"
				/>
				<Form>
					<InputComment
						type="text"
						name="text"
						placeholder="write a comment..."
						onChange={(e) => handleFormChange(e)}
						value={commentDataInput.text}
						required
					/>
					<SendIcon onClick={postComment} />
				</Form>
			</BoxPostComment>
		</Box>
	);
}

const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: initial;
	justify-content: center;
	width: 100%;
	border-radius: 0 0 8px 8px;
	padding: 11px 20px;
`;

const BoxComment = styled.div`
	display: flex;
`;

const BoxUser = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
	height: 50px;
	cursor: pointer;
	border-radius: 0 0 8px 8px;
`;

const BoxAvatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50px;
`;

const TextUser = styled.div`
	display: flex;
	font-family: "Lato";
	font-size: 19px;
	color: #c5c5c5;
`;

const IsFollowing = styled.p`
	font-family: "Lato";
	font-style: normal;
	font-weight: 400;
	font-size: 19px;
	color: #515151;
	margin-left: 5px;
`;

const BoxCommentText = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: initial;
	margin-left: 10px;
`;

const Line = styled.div`
	width: 100%;
	border: 1px solid #353535;
	margin: 12px 0;
`;

const Text = styled.p`
	font-family: "Lato";
	font-size: 14px;
	color: #acacac;
	margin-top: 5px;
`;

const BoxPostComment = styled.div`
	display: flex;
	align-items: center;
	justify-content: initial;
`;

const Form = styled.form`
	position: relative;
	width: 90%;
`;

const InputComment = styled.input`
	width: 100%;
	height: 40px;
	background: #252525;
	border-radius: 8px;
	border: none;
	margin-left: 15px;
	color: white;
	padding: 0 30px 0 10px;

	::placeholder {
		font-family: "Lato";
		font-style: italic;
		font-size: 14px;
		color: #575757;
		padding: 0 30px 0 10px;
	}
`;

const SendIcon = styled(IoPaperPlaneOutline)`
	font-size: 20px;
	color: #f3f3f3;
	cursor: pointer;
	position: absolute;
	right: 5px;
	top: 11px;
`;
