import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthScreen from "../authScreen/AuthScreen";
import urls from "../shared/urls";
import AuthLoading from "../shared/AuthLoading";

export default function Signup() {
	const [singupDataInput, setSingupDataInput] = useState({
		email: "",
		password: "",
		username: "",
		url: "",
	});
	const navigate = useNavigate();
	const [blockButtom, setBlockButtom] = useState(false);

	function handleFormChange(e) {
		let data = { ...singupDataInput };
		data[e.target.name] = e.target.value;
		setSingupDataInput(data);
	}

	async function submitSignup(e) {
		e.preventDefault();
		setBlockButtom(true);

		await axios
			.post(urls.signup, singupDataInput)
			.then(() => {
				alert("Cadastro efetuado com sucesso!");
				navigate("/");
			})
			.catch((err) => {
				setBlockButtom(false);
				if (err.response.status === 409) {
					alert("Usuário já registrado!");
				} else {
					alert(err.response.data);
				}
			});
	}

	function toLogin() {
		navigate("/");
	}

	return (
		<AuthScreen>
			<Forms onSubmit={submitSignup}>
				<input
					type="email"
					name="email"
					placeholder="e-mail"
					onChange={(e) => handleFormChange(e)}
					value={singupDataInput.email}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					onChange={(e) => handleFormChange(e)}
					value={singupDataInput.password}
					required
				/>
				<input
					type="text"
					name="username"
					placeholder="username"
					onChange={(e) => handleFormChange(e)}
					value={singupDataInput.username}
					required
				/>

				<input
					type="text"
					name="url"
					placeholder="picture url"
					onChange={(e) => handleFormChange(e)}
					value={singupDataInput.url}
					required
				/>
				<Button type="submit" block={blockButtom}>
					{blockButtom ? <AuthLoading /> : "Sign Up"}
				</Button>
				<Switch onClick={toLogin}>Switch back to log in</Switch>
			</Forms>
		</AuthScreen>
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
