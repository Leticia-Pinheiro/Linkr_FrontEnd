import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner';

export default function Button ({ children, isActive }) {

    return (
        <Conatainer isActive={isActive} >
            {isActive ? 
                children 
            : 
                <ThreeDots color="#FFFFFF" height={15} width={60}  />
            }
        </Conatainer>
    );
};

const Conatainer = styled.button`

    all: unset;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 110px;
    height: 30px;
    margin-left: auto;

    opacity: ${props => props.isActive ? 1 : 0.7};
    background-color: #1877F2;
    border-radius: 5px;
    box-sizing: border-box;

    font-family: 'Lato';
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;

    cursor: ${props => props.isActive ? 'pointer' : 'default'};
`;