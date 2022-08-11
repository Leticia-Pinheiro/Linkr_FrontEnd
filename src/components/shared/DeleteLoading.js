import styled from "styled-components";

export default function DeleteLoading() {
	return (
		<>
			<Box>
				<Outer></Outer>
				<Middle></Middle>
				<Inner></Inner>
			</Box>
		</>
	);
}

const Box = styled.div`
	position: relative;
	margin: 0 30px 40px 0;
`;

const Outer = styled.div`
	border: 3px solid transparent;
	border-top-color: white;
	border-right-color: white;
	border-radius: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 5.5em;
	height: 5.5em;
	margin-left: -1.75em;
	margin-top: -1.75em;
	animation: spin 2s linear infinite;
`;

const Middle = styled.div`
	border: 3px solid transparent;
	border-top-color: white;
	border-right-color: white;
	border-radius: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 4.1em;
	height: 4.1em;
	margin-left: -1.05em;
	margin-top: -1.05em;
	animation: spin 1.75s linear reverse infinite;
`;

const Inner = styled.div`
	border: 3px solid transparent;
	border-top-color: white;
	border-right-color: white;
	border-radius: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 2.8em;
	height: 2.8em;
	margin-left: -0.4em;
	margin-top: -0.4em;
	animation: spin 1.5s linear infinite;
`;
