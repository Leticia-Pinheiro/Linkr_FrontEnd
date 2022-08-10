import styled from "styled-components";
import PostInterface from "./PostInterface";

export default function Timeline () {

    return (
        <Container>
            <Title>timeline</Title>
            <PostInterface />
        </Container>
    );
}

const Container = styled.div`
    width: 610px;
    margin: 80px auto 0 auto;
`;

const Title = styled.h2`

font-family: 'Oswald';
font-weight: 700;
font-size: 43px;
color: #FFFFFF;

margin-bottom: 40px;
`;
