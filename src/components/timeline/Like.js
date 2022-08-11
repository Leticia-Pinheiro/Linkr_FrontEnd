import axios from "axios";
import { useContext, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import styled from "styled-components";
import urls from "../shared/urls.js";
import UserContext from "../context/UserContext";

export default function Like ({ postId, liked }) {
    
    const {userInformation} = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(liked); 

    function toggleLike () {

        const body = {
			postId,
			postStatus: !isLiked
		};

		const header = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        };
        
        axios.put(urls.like, body, header).then( () => {
            setIsLiked(!isLiked);
        })
        
    }

    return (
        <Container>
            {isLiked ? <Liked onClick={toggleLike}/> : <NotLiked onClick={toggleLike}/>}
            <LikesCount>Like</LikesCount>
        </ Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Liked = styled(IoHeart)`
    fill: #AC0000;
    font-size: 25px;
`;

const NotLiked = styled(IoHeartOutline)`
    color: #FFF;
    font-size: 25px;
`;

const LikesCount = styled.h3`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 11px;
    color: #fff;

    margin-top: 5px;
`;