import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";

import UserContext from "../context/UserContext.js";
import urls from "../shared/urls.js";

export default function Feed(props) {
	const [showLogout, setShowLogout] = useState(false);
	const [searchBarData, setSearchBarData] = useState([]);
	const navigate = useNavigate();
	const { setUserInformation } = useContext(UserContext);

	function showOrHide() {
		setShowLogout(!showLogout);
	}

	console.log(searchBarData);

	function toLogin() {
		localStorage.clear();
		navigate("/");
		setUserInformation(null);
	}

	function goToUserPosts(id) {
		navigate(`/user/${id}`);
	}

	function searchUser(str) {
		const MIN = 3;

		if (str.length >= MIN) {
			const strNoSpaces = str.replace(" ", "+");

			axios
				.get(`${urls.getUsers}?search=${strNoSpaces}`)
				.then((response) => {
					setSearchBarData(response.data);
				})
				.catch((err) => {
					alert(err.response.data);
				});
		}

		if (str.length === 0) {
			setSearchBarData([]);
		}
	}

	return (
		<>
			<Header>
				<h1>linkr</h1>

				<BoxInput change={searchBarData.length ? "true" : "false"}>
					<DebounceInput
						minLength={3}
						debounceTimeout={300}
						className="searchBar"
						placeholder="Search for people"
						onChange={(event) => searchUser(event.target.value)}
					/>
					<InputContainer>
						{searchBarData.map((elem, index) => (
							<BoxUser key={index} onClick={() => goToUserPosts(elem.id)}>
								<BoxAvatar src={elem.imageUrl} alt="avatar" />

								<TextUser>{elem.username}</TextUser>
							</BoxUser>
						))}
					</InputContainer>
				</BoxInput>

				<OuterLogout onClick={showOrHide}>
					{showLogout ? <ArrowUp /> : <ArrowDown />}

					<InnerLogout></InnerLogout>
				</OuterLogout>
			</Header>

			{showLogout ? <Logout onClick={toLogin}>Logout</Logout> : null}

			<Body>{props.children}</Body>
		</>
	);
}

const Header = styled.div`
	width: 100%;
	height: 72px;
	background-color: #151515;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	top: 0;

	h1 {
		font-size: 49px;
		font-weight: bold;
		font-family: "Passion One", cursive;
		color: #ffffff;
		margin-left: 28px;

		@media (max-width: 700px) {
			font-size: 45px;
			margin-left: 17px;
		}
	}
`;

const OuterLogout = styled.div`
	display: flex;
	align-items: center;
`;
const InnerLogout = styled.div`
	width: 53px;
	height: 53px;
	border-radius: 50%;
	background-color: #ffffff;
	margin-right: 17px;
	cursor: pointer;

	@media (max-width: 700px) {
		width: 44px;
		height: 44px;
		margin-right: 14px;
	}
`;

const ArrowDown = styled(IoIosArrowDown)`
	color: #ffffff;
	font-size: 30px;
	cursor: pointer;
	margin-right: 17px;

	@media (max-width: 700px) {
		font-size: 25px;
		margin-right: 12px;
	}
`;

const ArrowUp = styled(IoIosArrowUp)`
	color: #ffffff;
	font-size: 30px;
	cursor: pointer;
	margin-right: 17px;

	@media (max-width: 700px) {
		font-size: 25px;
		margin-right: 12px;
	}
`;

const Logout = styled.div`
	width: 150px;
	height: 47px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Lato";
	font-size: 17px;
	font-weight: bold;
	color: #ffffff;
	background: #171717;
	border-radius: 0px 0px 0px 20px;
	position: fixed;
	right: 0;
	cursor: pointer;

	@media (max-width: 700px) {
		height: 43px;
		font-size: 15px;
	}
`;

const Body = styled.div`
	height: 100%;
	width: 45%;
	margin: 40px auto 0 auto;

	@media (max-width: 700px) {
		width: 100%;
		margin-top: 30px;
	}
`;

const BoxInput = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 30%;
	position: relative;
	background-color: #e7e7e7;
	border-radius: ${(props) =>
		props.change === "true" ? "8px 8px 0 0" : "8px"};
`;

const InputContainer = styled.div`
	width: 100%;
	background-color: #e7e7e7;
	position: absolute;
	top: 45px;
	border-radius: 0 0 8px 8px;
`;

const BoxUser = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
	cursor: pointer;
`;

const BoxAvatar = styled.img`
	width: 40px;
	border-radius: 50px;
`;

const TextUser = styled.p`
	font-family: "Lato";
	font-size: 19px;
	color: #515151;
	margin-left: 10px;
`;
