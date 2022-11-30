import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CharacterFeed = (characterInfo) => {

    const navigate = useNavigate();
    const specificInfo = characterInfo.characterDetails;

    const handleNav = () => {
        navigate(`/character/${characterInfo.characterId}`);
      }
  
     
    return (
        <Wrapper onClick={handleNav}>
            <CharacterName>{specificInfo.characterName}</CharacterName>
            <div>Class: {specificInfo.selectedClass.name}</div>
            <div>Race: {specificInfo.selectedRace.name}</div>
        </Wrapper>
    );
};


const Wrapper = styled.div`
border: 1px solid black;
margin: 5px;
padding: 5px;
:hover {
    cursor: pointer;
}
`;

const CharacterName = styled.div`
font-size: 35px;
`
export default CharacterFeed;