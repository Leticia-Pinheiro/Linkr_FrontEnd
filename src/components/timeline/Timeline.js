import styled from "styled-components";
import PostInterface from "./PostInterface";
import Feed from "../feed/Feed"

export default function Timeline () {

    return (
        <Feed>
            <Container>
                <Title>timeline</Title>
                <PostInterface />
            </Container>
        </Feed>
    );
}

const Container = styled.div`
    width: 610px;
    margin: 152px auto 0 auto;
`;

const Title = styled.h2`

    font-family: 'Oswald';
    font-weight: 700;
    font-size: 43px;
    color: #FFFFFF;

    margin-bottom: 40px;
`;
