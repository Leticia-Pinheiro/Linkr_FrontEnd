import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import UserContext from "../context/UserContext.js";
import SearchBar from "./SearchBar.js";

export default function Feed(props) {
	const [showLogout, setShowLogout] = useState(false);
	const navigate = useNavigate();
	const { userInformation, setUserInformation } = useContext(UserContext);

	function showOrHide() {
		setShowLogout(!showLogout);
	}

	function toLogin() {
		localStorage.clear();
		navigate("/");
		setUserInformation(null);
	}

	function toTimeline() {
		navigate("/timeline");
	}

	return (
		<>
			<Header>
				<Title onClick={toTimeline}>linkr</Title>

				<OuterLogout onClick={showOrHide}>
					{showLogout ? <ArrowUp /> : <ArrowDown />}

					<InnerLogout
						src={userInformation.imageAvatar || userInformation.image}
						alt="avatar"
					></InnerLogout>
				</OuterLogout>
			</Header>

			<SearchBar />

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
	position: fixed;
	top: 0;
	z-index: 1;
	@media (max-width: 700px) {
		position: fixed;
		top: 0;
	}
`;

const Title = styled.div`
	font-size: 49px;
	font-weight: bold;
	font-family: "Passion One", cursive;
	color: #ffffff;
	margin-left: 28px;
	cursor: pointer;
	@media (max-width: 700px) {
		font-size: 45px;
		margin-left: 17px;
	}
`;

const OuterLogout = styled.div`
	display: flex;
	align-items: center;
`;

const InnerLogout = styled.img`
	width: 53px;
	height: 53px;
	border-radius: 50%;
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
	top: 72px;
	right: 0;
	cursor: pointer;
	@media (max-width: 700px) {
		height: 43px;
		font-size: 15px;
	}
`;

const Body = styled.div`
	height: 100%;
	width: 50%;
	margin: 80px auto 0 auto;

	@media (max-width: 700px) {
		width: 100%;
		margin-top: 140px;
	}
`;
