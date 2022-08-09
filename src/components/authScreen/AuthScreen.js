import styled from "styled-components";

import Login from "../login/Login";

export default function AuthScreen(props) {
	return (
		<Box>
			<BoxTitle>
				<Logo>linkr</Logo>
				<Text>save, share and discover the best links on the web</Text>
			</BoxTitle>
			<BoxForms>{!props.children ? <Login /> : props.children}</BoxForms>
		</Box>
	);
}

const Box = styled.div`
	display: flex;

	@media (max-width: 700px) {
		display: flex;
		flex-direction: column;
	}
`;

const BoxTitle = styled.div`
	background-color: black;
	width: 65%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 0 0 150px;

	@media (max-width: 700px) {
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 25vh;
		padding: 0;
	}
`;

const BoxForms = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 35%;
	padding: 0 50px;

	@media (max-width: 700px) {
		height: 100%;
		width: 100%;
	}
`;

const Logo = styled.p`
	font-family: "Passion One";
	font-weight: bold;
	font-size: 105px;
	color: #ffffff;

	@media (max-width: 700px) {
		font-size: 75px;
	}
`;

const Text = styled.p`
	font-family: "Oswald";
	font-weight: bold;
	font-size: 45px;
	color: #ffffff;
	max-width: 480px;

	@media (max-width: 700px) {
		max-width: 250px;
		font-size: 23px;
	}
`;
