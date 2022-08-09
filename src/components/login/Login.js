import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import urls from "../shared/urls";
import AuthLoading from "../shared/AuthLoading";
import UserContext from "../context/UserContext";

export default function Login() {
	const [loginDataInput, setLoginDataInput] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const [blockButtom, setBlockButtom] = useState(false);
	const { setUserInformation } = useContext(UserContext);

	function handleFormChange(e) {
		let data = { ...loginDataInput };
		data[e.target.name] = e.target.value;
		setLoginDataInput(data);
	}

	async function submitLogin(e) {
		e.preventDefault();
		setBlockButtom(true);

		await axios
			.post(urls.signin, loginDataInput)
			.then((response) => {
				setUserInformation(response.data);

				let serializationData = JSON.stringify({ ...loginDataInput });
				localStorage.setItem("login", serializationData);

				navigate("/timeline");
			})
			.catch((err) => {
				setBlockButtom(false);
				if (err.response.status === 401) {
					alert("Usuário/senha inválidos!");
				} else {
					alert(err.response.data);
				}
			});
	}

	useEffect(() => {
		if (localStorage.length > 0) {
			let loginStoraged = localStorage.getItem("login");
			let deserializationData = JSON.parse(loginStoraged);

			axios
				.post(urls.signin, deserializationData)
				.then((response) => {
					setUserInformation(response.data);
					navigate("/timeline");
				})
				.catch((err) => {
					if (err.response.status === 401) {
						alert("Usuário/senha inválidos!");
					} else {
						alert(err.response.data);
					}
				});
		}
	}, []);

	function toSignup() {
		navigate("/signup");
	}

	return (
		<>
			<Forms onSubmit={submitLogin}>
				<input
					type="email"
					name="email"
					placeholder="e-mail"
					onChange={(e) => handleFormChange(e)}
					value={loginDataInput.email}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					onChange={(e) => handleFormChange(e)}
					value={loginDataInput.password}
					required
				/>
				<Button type="submit" block={blockButtom}>
					{blockButtom ? <AuthLoading /> : "Log In"}
				</Button>
				<Switch onClick={toSignup}>First time? Create an account!</Switch>
			</Forms>
		</>
	);
}

const Forms = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;

	input[type="email"],
	input[type="password"],
	input[type="text"] {
		font-family: "Oswald";
		font-weight: 700;
		font-size: 27px;
		border-radius: 6px;
		height: 65px;
		margin-top: 25px;
		width: 100%;
		padding-left: 15px;

		::placeholder {
			font-size: 27px;
			color: #9f9f9f;
		}
	}
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 65px;
	margin: 25px auto 0 auto;
	background: #1877f2;
	border-radius: 6px;
	font-family: "Oswald";
	font-weight: 700;
	font-size: 27px;
	border: none;
	color: white;
	pointer-events: ${(props) => (props.block ? "none" : null)};
`;

const Switch = styled.div`
	font-family: "Lato";
	font-weight: 400;
	font-size: 20px;
	text-decoration-line: underline;
	color: #ffffff;
	margin: 15px auto 0 auto;
`;
