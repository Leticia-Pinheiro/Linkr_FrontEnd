import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
import { useState, useContext } from "react";

import urls from "../shared/urls";
import DeleteLoading from "../shared/DeleteLoading";
import ControlApiContext from "../context/ControlApiContext";
import UserContext from "../context/UserContext";

export default function DeleteModal({
	setIsOpen,
	modalIsOpen,
	id,
	setControlApi,
}) {
	const [controlLoading, setControlLoading] = useState(false);
	const { setControlApiUser } = useContext(ControlApiContext);
	const { userInformation } = useContext(UserContext);

	function closeModal() {
		setIsOpen(false);
	}

	const body = {
		name: userInformation.username,
		userId: userInformation.userId,
		postId: id,
	};

	function repost() {
		setControlLoading(true);

		axios
			.post(urls.repost, body)
			.then(() => {
				setControlLoading(false);
				setControlApi(true);
				setIsOpen(false);
				setControlApiUser(true);
			})
			.catch((err) => {
				setControlLoading(false);
				alert(err.response.data);
			});
	}

	return (
		<div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				ariaHideApp={false}
				className="Modal"
				overlayClassName="Overlay"
			>
				{controlLoading ? (
					<DeleteLoading />
				) : (
					<>
						<Text>Do you want to re-post this link?</Text>
						<BoxButton>
							<ButtonCancel onClick={closeModal}>No, cancel</ButtonCancel>
							<ButtonOk onClick={() => repost()}>Yes, share!</ButtonOk>
						</BoxButton>{" "}
					</>
				)}
			</Modal>
		</div>
	);
}

const Text = styled.p`
	font-family: "Lato";
	font-weight: bold;
	font-size: 34px;
	text-align: center;
	color: #ffffff;
`;

const BoxButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin: 40px 0 0 0;
`;

const ButtonCancel = styled.button`
	width: 134px;
	height: 37px;
	background: #ffffff;
	border-radius: 5px;
	font-family: "Lato";
	font-weight: bold;
	font-size: 18px;
	color: #1877f2;
	border: none;
	cursor: pointer;
`;

const ButtonOk = styled.button`
	width: 134px;
	height: 37px;
	background: #1877f2;
	border-radius: 5px;
	font-family: "Lato";
	font-weight: bold;
	font-size: 18px;
	color: #ffffff;
	border: none;
	cursor: pointer;
`;
