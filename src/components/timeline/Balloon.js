import { useState } from "react";
import styled from "styled-components"

export default function Balloon ({ whoLiked }) {

    return (
        <>
            {whoLiked ? (
                <Container>
                    <ArrowUp />
                    <Retangle>
                        {whoLiked?.length === 1 ? `${whoLiked[0]}` : null}
                        {whoLiked?.length === 2 ? `${whoLiked[0]} and ${whoLiked[1]}` : null}
                        {whoLiked?.length === 3 ? `${whoLiked[0]}, ${whoLiked[1]} and ${whoLiked[2]}` : null}
                        {whoLiked?.length === 4 ? `${whoLiked[0]}, ${whoLiked[1]} and other ${whoLiked.length - 2} peoples` : null}
                    </Retangle>
                </Container>
            ) : null}
        </>
        
    )
}

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: -40px;
    z-index: 1;
`
;
const ArrowUp = styled.div`

    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-bottom: 10px solid rgba(255, 255, 255, 0.9);
`;

const Retangle = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    height: 24px;
    padding: 0 10px;

    background: rgba(255, 255, 255, 0.9);
    border-radius: 3px;

    font-family: 'Lato';
    font-weight: 700;
    font-size: 11px;
    color: #505050;
`;