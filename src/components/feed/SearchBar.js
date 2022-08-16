import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { ImSearch } from "react-icons/im";

import UserContext from "../context/UserContext.js";
import urls from "../shared/urls.js";

export default function SearchBar() {
	const [searchBarData, setSearchBarData] = useState([]);
	const navigate = useNavigate();
	const ref = useRef(null);
	const { userInformation } = useContext(UserContext);
	useOutsideAlerter(ref);

	function goToUserPosts(id) {
		navigate(`/user/${id}`);
	}

	function useOutsideAlerter(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setSearchBarData([]);
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	function searchUser(str) {
		const MIN = 3;

		if (str.length >= MIN) {
			const strNoSpaces = str.replace(" ", "+");

			const config = {
				headers: {
					Authorization: `Bearer ${userInformation.token}`,
				},
			};

			axios
				.get(`${urls.getUsers}?search=${strNoSpaces}`, config)
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
			<BoxInput change={searchBarData.length ? "true" : "false"}>
				<IconPlaceholder />
				<DebounceInput
					minLength={3}
					debounceTimeout={300}
					className="searchBar"
					placeholder="Search for people"
					onChange={(event) => searchUser(event.target.value)}
				/>
				<InputContainer ref={ref}>
					{searchBarData.map((elem, index) => (
						<BoxUser key={index} onClick={() => goToUserPosts(elem.id)}>
							<BoxAvatar src={elem.imageUrl} alt="avatar" />

							<TextUser>{elem.username}</TextUser>
							{elem.following ? <IsFollowing>• following</IsFollowing> : null}
						</BoxUser>
					))}
				</InputContainer>
			</BoxInput>
		</>
	);
}

const BoxInput = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 30%;
	position: fixed;
	top: 10px;
	right: 35%;
	margin: 0 auto;
	z-index: 1;

	background-color: #e7e7e7;
	border-radius: ${(props) =>
		props.change === "true" ? "8px 8px 8px 8px" : "8px"};

	@media (max-width: 700px) {
		position: absolute;
		top: 80px;
		width: 90%;
		right: 5%;
		z-index: 0;
	}
`;

const InputContainer = styled.div`
	width: 100%;
	border-radius: 0 0 8px 8px;
	background-color: #e7e7e7;
	position: relative;
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

const TextUser = styled.p`
	font-family: "Lato";
	font-size: 19px;
	color: #515151;
	margin-left: 10px;
`;

const IconPlaceholder = styled(ImSearch)`
	font-size: 19px;
	position: absolute;
	top: 13px;
	right: 5%;
	color: #c6c6c6;
	z-index: 1;
`;

const IsFollowing = styled.p`
	font-family: "Lato";
	font-style: normal;
	font-weight: 400;
	font-size: 19px;
	color: #c5c5c5;
	margin-left: 5px;
`;
