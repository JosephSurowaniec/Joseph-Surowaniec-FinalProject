import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FeedMessage = (content) => {

    const [contentCharacter , setContentCharacter] = useState("");
    const navigate = useNavigate();
    
    const showContent = () => {
        console.log(content);
        // console.log(content.character[0].characterInformation.characterName);
    };  

    const handleNavChar = () => {
        navigate(`/character/${content.character[0]._id}`);
    };

    const handleNavUser = () => {
        navigate(`/profile/${content.userId}`);
    };

    return (
        <Wrapper>
            {/* <button onClick={showContent}>Click to check</button> */}
            {content.character ?
            <CharacterWrapper>
                {<CharacterDiv><CharacterNameButton onClick={handleNavChar}>{content.character[0].characterInformation.characterName}</CharacterNameButton></CharacterDiv>}
                <StyledClassSpan>{content.character[0].characterInformation.selectedClass.name}</StyledClassSpan>
            </CharacterWrapper>
            
            :<></>}
            <MessageWrapper>
                {content.message}
            </MessageWrapper>
            <UserWrapper>
                <StyledUsernameSpan>Created by: </StyledUsernameSpan><StyledButton onClick={handleNavUser}>{content.profileName}</StyledButton>
            </UserWrapper>
            
        </Wrapper>
    );
};

const Wrapper = styled.div`
box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.52);
border-radius: 15px;
padding: 15px;
`;
const CharacterWrapper = styled.div`
display: flex;
align-items: flex-end;
clip-path: polygon(0 0, 54% 0, 100% 100%, 75% 100%, 0% 100%);
background-color: #e5e5e5;
padding: 5px;

`;
const CharacterNameButton = styled.button`
border: none;
background: none;
border-bottom: 2px solid #7c98b3;
:hover {
  cursor: pointer;
}
`;
const CharacterDiv = styled.div`
margin-right: 15px;
`;
const StyledClassSpan = styled.div`
font-size: 12px;

`;
const MessageWrapper = styled.div`
border: 1px solid rgba(36, 36, 36, 0.2);
border-top: none;
width: 500px;
height: 50px;
padding: 25px;
`;
const UserWrapper = styled.div`
display: flex;
justify-content: flex-end;
border-bottom: 1px solid rgba(36, 36, 36, 0.45);
padding: 5px;
`;
const StyledUsernameSpan = styled.span`
margin-right: 5px;
`;
const StyledButton = styled.button`
border: none;
background: none;
:hover {
  cursor: pointer;
}
`;

export default FeedMessage;