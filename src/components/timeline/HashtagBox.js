import styled from 'styled-components'

export default function HashtagBox(){

    return(
        <Container> 
            <Title>trending</Title>
            <Line></Line>
            <ContainerTag>

            </ContainerTag>
        </Container>
    )
}

const Container = styled.div`
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    
    @media (max-width: 700px) {
        display: none;
    }`

const Title = styled.h1`
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    
    color: #FFFFFF;
    padding: 16px;`

const Line = styled.div`
    width: 301px;
    height: 0;
    border: 1px solid #484848;`

const ContainerTag = styled.div``