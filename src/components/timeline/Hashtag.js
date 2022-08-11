import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Feed from "../feed/Feed.js"

export default function Hashtag(){
    const {hashtag} = useParams ( ) 

    return (
        <Container>
            <Feed></Feed>
            <Title># {hashtag}</Title>
        </Container>
        
        
        
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;`

const Title = styled.h1`
    font-family: "Oswald";
	font-weight: bold;
	font-size: 43px;
	color: #ffffff;

	@media (max-width: 700px) {
		margin-left: 20px;
	}
`;