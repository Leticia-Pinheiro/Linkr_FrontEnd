import styled from 'styled-components'

export default function HashtagBox(){

    return(
        <Container> 
            <h1>trendig</h1>
            <Line></Line>
            <div></div>
        </Container>
    )
}

const Container = styled.div`
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    display: flex;
    flex-direction: column;`