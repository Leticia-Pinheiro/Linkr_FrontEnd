import { useState } from "react";
import axios from "axios";
import styled from "styled-components"
import Button from "../shared/Button";
import urls from "../shared/urls";

export default function PostInterface () {

    const [isActive, setIsActive] = useState(true);
    const [post, setPost] = useState({
        url: "",
        text: ""
    });

    function handleForm (e) {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }

    function submitForm (e) {

        e.preventDefault();

        setIsActive(false);

        const body = {
            ...post
        }

        const promise = axios.post(urls.timeline, body);
        promise
            .then( () => {
                setPost({
                    url: "",
                    text: ""
                });
            })
            .catch( () => {
                alert('Houve um erro ao publicar seu link!')
            })
            .finally( () => {
                setIsActive(true);
            });
    }
    
    return (
        <Container>
            <ProfilePicture />
            <InputContainer>
                <Title>What are you goin to share today?</Title>
                <Form onSubmit={isActive ? submitForm : (e) => e.preventDefault() } >
                    <UrlInput 
                        placeholder="http://..." 
                        name="url" value={post.url} 
                        onChange={handleForm} 
                        disabled={!isActive}  
                        required
                    />
                    <TextInput 
                        placeholder="teste" 
                        name="text" 
                        value={post.text} 
                        onChange={handleForm} 
                        disabled={!isActive} 
                    />
                    <Button isActive={isActive} >Publish</Button>
                </Form>
            </InputContainer>
        </Container>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 210px;
    padding: 20px;
    background-color: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
`;

const Title = styled.h2`
    font-family: 'Lato';
    font-weight: 300;
    font-size: 20px;
    color: #707070;

    margin-bottom: 10px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;

    margin-left: auto;
`

const UrlInput = styled.input`

    all: unset;
    
    height: 30px;
    padding-left: 10px;
    margin-bottom: 5px;
    background-color: ${ props => props.disabled ? '#D6D6D6': '#EFEFEF'};
    border-radius: 5px;
    box-sizing: border-box;

    font-family: 'Lato';
    font-weight: 300;
    font-size: 15px;
    color: #949494;

    ::placeholder {
        font-family: 'Lato';
        font-weight: 300;
        font-size: 15px;
        color: #949494;
    }
`;

const TextInput = styled.textarea`

    all: unset;

    height: 66px;
    padding: 10px;
    margin-bottom: 5px;
    background-color: ${ props => props.disabled ? '#D6D6D6': '#EFEFEF'};
    border-radius: 5px;
    box-sizing: border-box;

    font-family: 'Lato';
    font-weight: 300;
    font-size: 15px;
    color: #949494;

    ::placeholder {
        font-family: 'Lato';
        font-weight: 300;
        font-size: 15px;
        color: #949494;
    }
`;

const ProfilePicture = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: blue;
`;