import styled from "styled-components";
import { useState } from "react";

import AuthScreen from "../authScreen/AuthScreen";

export default function Signup() {
	const [singupDataInput, setSingupDataInput] = useState({
		email: "",
		password: "",
		username: "",
		url: "",
	});

	function handleFormChange(e) {
		let data = { ...singupDataInput };
		data[e.target.name] = e.target.value;
		setSingupDataInput(data);
	}

	return (
		<AuthScreen>
			<Forms onSubmit={""}>
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
				<Button type="submit">Sign Up</Button>
				<Switch>Switch back to log in</Switch>
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

		::placeholder {
			font-size: 27px;
			color: #9f9f9f;
			padding-left: 15px;
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
`;

const Switch = styled.div`
	font-family: "Lato";
	font-weight: 400;
	font-size: 20px;
	text-decoration-line: underline;
	color: #ffffff;
	margin: 15px auto 0 auto;
`;
