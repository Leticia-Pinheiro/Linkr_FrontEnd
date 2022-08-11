import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
import { useState, useContext } from "react";

import urls from "../shared/urls";
import DeleteLoading from "../shared/DeleteLoading";
import UserContext from "../context/UserContext";

export default function DeleteModal({
	setIsOpen,
	modalIsOpen,
	id,
	setControlApi,
}) {
	const [controlLoading, setControlLoading] = useState(false);

	const { userInformation } = useContext(UserContext);

	function closeModal() {
		setIsOpen(false);
	}

	function deletePost(id) {
		setControlLoading(true);

		const config = {
			headers: {
				Authorization: `Bearer ${userInformation.token}`,
			},
		};

		axios
			.delete(`${urls.delete}/${id}`, config)
			.then(() => {
				setControlLoading(false);
				setControlApi(true);
				setIsOpen(false);
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
						<Text>Are you sure you want to delete this post?</Text>
						<BoxButton>
							<ButtonCancel onClick={closeModal}>No, go back</ButtonCancel>
							<ButtonOk onClick={() => deletePost(id)}>Yes, delete it</ButtonOk>
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
