import styled from "styled-components"
import { BsArrowRepeat } from "react-icons/bs";

export default function LoadPostsButton ({ amount, postsData, setPostsData, recentPosts, setLastPostCreatedAt}) {
    
    function handleClick () {
        setPostsData({
            followers: [...postsData.followers],
            posts: [
                ...recentPosts,
                ...postsData.posts
            ]
        });
        setLastPostCreatedAt(recentPosts[0].createdAt)
    }

    return (
        <>
            <Container onClick={handleClick}>{`${amount} new posts, load more!`}<RepeatIcon /></Container>
        </>
    )
}

const Container = styled.button`
    
    display: flex;
    justify-content: center;
    align-items: center;

    width: 611px;
    height: 61px;
    background-color: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 30px;
    border: 0;

    font-family: 'Lato';
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;

    cursor: pointer;
`;

const RepeatIcon = styled(BsArrowRepeat)`
    padding-left: 10px;
    font-size: 30px;
`;