import styled from 'styled-components'
import { useContext, useState, useEffect} from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import urls from "../shared/urls";
import FeedLoading from "../shared/FeedLoading";
import ControlApiContext from '../context/ControlApiContext';

export default function HashtagBox(){
    const navigate = useNavigate();
    const [tagsData, setTagsData] = useState([]);	
    const { setControlApi, controlApi, setControlApiUser } =
		useContext(ControlApiContext);
	const [controlLoading, setControlLoading] = useState(true);
	const { userInformation } = useContext(UserContext);
    const [hashtag, setHashtag] = useState("")

	
		
    useEffect(() => {
		const header = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        };

		axios
			.get(urls.getHashtags, header)
			.then((response) => {
				setControlLoading(false);
				setTagsData(response.data);  
                setControlApi(false);              
			})
			.catch((err) => {
				setControlLoading(false);
                setTagsData("error");
                setControlApi(false); 
				
			});
	},[controlApi])

    function goToTagPosts(tag){
        navigate(`/hashtag/${tag}`)	
        window.location.reload(false);	
	}	
    

    return(
        <Container> 
            <Title>trending</Title>
            <Line></Line>
            <ContainerTag>
                {!tagsData.length ? (
					<></>
				) : (
					tagsData.map((tag, index) => (
						<Tag key={index} onClick={() => goToTagPosts(tag.name)}># {tag.name}</Tag>
					)))}
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

const ContainerTag = styled.div`
    display: flex;
    flex-direction: column;
    margin: 22px 0 0 16px;`

const Tag = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    cursor: pointer;
    padding: 3px;`