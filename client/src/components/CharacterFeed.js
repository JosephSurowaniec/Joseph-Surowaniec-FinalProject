import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Image} from 'cloudinary-react';

const CharacterFeed = (characterInfo) => {

    const navigate = useNavigate();
    const specificInfo = characterInfo.characterDetails;

    const handleNav = () => {
        navigate(`/character/${characterInfo.characterId}`);
      };

      const checkStuff = () => {
        console.log(characterInfo)
      };
      
     
    return (
            <Wrapper onClick={handleNav}>
                <CharacterImage>
                    {/* This is for the image
                    <button onClick={checkStuff}>Click</button> */}
                    {specificInfo.characterImageId ?<StyledImage cloudName="dfigamsk5" publicId={specificInfo.characterImageId}  />
                    :<StyledImage cloudName="dfigamsk5" publicId="User_Profile/defaultProfileImage_pl3ci7" />}
                    {/* {aspect_ratio= "1:1", background: "#262c35", border: "3px_solid_rgb:cc444b", gravity= "auto", , width: 100, crop: "fill"} */}
                </CharacterImage>
                <div>
                    <CharacterName>{specificInfo.characterName}</CharacterName>
                    <div>Class: {specificInfo.selectedClass.name}</div>
                    <div>Race: {specificInfo.selectedRace.name}</div>
                </div>
            </Wrapper> 
    );
};

const StyledImage = styled(Image)`
/* max-height: 100%; */
aspect-ratio: 1/1 ;
object-fit: cover;
width: auto;
height: 250px;
border: 3px solid #cc444b;
border-radius: 50%;
object-position: 0px -1px;
background-color: #cc444b;
`;

const Wrapper = styled.div`
margin: 5px;
padding: 15px;
display: flex;
:hover {
    cursor: pointer;
}
`;

const CharacterImage = styled.div`
margin-right: 25px;

`;

const CharacterName = styled.div`
font-size: 35px;
border-bottom: 3px solid #7c98b3;
margin-bottom: 5px;
`;

export default CharacterFeed;