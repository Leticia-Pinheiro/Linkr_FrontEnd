import styled from "styled-components";
import { useContext, useEffect, useRef } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import urls from "../shared/urls";


export default function EditPost ({
		postId, 
		text, 
		isEditable, 
		setIsEditable, 
		editableText, 
		setEditableText, 
		isDisabled, 
		setIsDisabled, 
		setControlApi,
		setControlApiUser
	}) {


	const { userInformation } = useContext(UserContext);
    const inputRef = useRef();

    useEffect( () => {
        inputRef.current.focus();
    });

    async function handleKeyDown (e) {
		
		if (e.keyCode === 27) {
			setEditableText(text);
			setIsEditable(!isEditable);
		}
		if (e.keyCode === 13) {
			setIsDisabled(true);
			const bory = {
				text: e.target.value
			}
			const header = {
				headers: {
					Authorization: `Bearer ${userInformation.token}`
				}
			};
			
			await axios.put(`${urls.updatePost}/${postId}`, bory, header)
				.then( () => {
					setControlApi(true);
					setControlApiUser(true);
					setIsEditable(false);
				})
				.catch( () => {
					alert('Could not update text!');
					setIsDisabled(false);
				})
		}
	}

    return (
        <TextInput
            placeholder="Description..."
            name="text"
            value={editableText}
            onChange={ (e) => setEditableText(e.target.value)}
            disabled={isDisabled}
            onKeyDown={handleKeyDown}
            ref={inputRef}
        />
    )
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