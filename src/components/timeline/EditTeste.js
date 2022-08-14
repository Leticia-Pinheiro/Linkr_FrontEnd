import styled from "styled-components";
import { useRef } from "react";

export default function EditTeste({
	handleKeyDown,
	editableText,
	setEditableText,
	isDisabled,
	isEditable,
}) {
	const inputRef = useRef();

	if (isEditable) {
		let teste = { inputRef };
		console.log(teste.current);
		//inputRef.current.focus();
	}

	return (
		<>
			<TextInput
				ref={inputRef}
				placeholder="Description..."
				name="text"
				value={editableText}
				onChange={(e) => setEditableText(e.target.value)}
				disabled={isDisabled}
				onKeyDown={handleKeyDown}
			/>
		</>
	);
}

const TextInput = styled.input`
	all: unset;

	height: 30px;
	padding: 10px;
	margin: 5px 0;
	background-color: ${(props) => (props.disabled ? "#D6D6D6" : "#EFEFEF")};
	border-radius: 5px;
	box-sizing: border-box;

	font-family: "Lato";
	font-weight: 300;
	font-size: 15px;
	color: #949494;

	::placeholder {
		font-family: "Lato";
		font-weight: 300;
		font-size: 15px;
		color: #949494;
	}
`;
