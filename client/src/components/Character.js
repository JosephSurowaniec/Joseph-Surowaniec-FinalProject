import { useContext, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import CharacterAbilityPoints from "./CharacterAbilityPoints";
import CharacterClassOptions from "./CharacterClassOptions";
import { CharacterContext } from "./CharacterContext";
import CharacterRaceOptions from "./CharacterRaceOptions";
import ClassOptions from "./ClassOptions";
import GeneralCharacterDetails from "./GeneralCharacterDetails";
import RaceOptions from "./RaceOptions";
import { UserContext } from "./UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import CharacterLevels from "./CharacterLevels";
import {Image} from 'cloudinary-react';
import { useNavigate } from "react-router-dom";


const Character = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);
    const { userId } = useContext(UserContext);
    const [ currentlyDisplayed, setCurrentlyDisplayed] = useState("general")
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        actions.resetCharacterData("");
    }, []);
    
    const handleShowSection = (section) => {
        setCurrentlyDisplayed(section);
    };

    const handleResetClass = () => {
        actions.updateClass("");
        actions.updateClassDetails("");
    };
    const showRace = () => {
        console.log(state.selectedRace)
    };

    const handleResetRace = () => {
        actions.updateRace("")
    };

    const testAPI = () => {
        console.log("we are here");
        console.log( state );
        
    };

    const submitCharacter = () => {
            fetch("/newcharacters", {
                "method": "POST",
                "body": JSON.stringify({
                    "characterDetails": state,
                    "userId": userId
                }),
                "headers": {
                    "Content-Type": "application/json"
                }
            })
            .then( res => res.json() )
            .then( data => {
                console.log(data);
                navigate(`/character/${data.data._id}`);
                actions.resetCharacterData("");
            } )
    };

    return (
        isAuthenticated
        ?
        <Wrapper>
            <CreatorWrapper>
                <DisplayName>
                    <div>
                        Character Name: {state.characterName}
                    </div>
                    <div>
                        <StyledSubmitCharacterButton onClick={submitCharacter}>Submit Your Character</StyledSubmitCharacterButton>
                    </div>
                </DisplayName>
                <CharacterImage>
                    {state.characterImageId ?<StyledImage cloudName="dfigamsk5" publicId={state.characterImageId } />
                    :<></>}
                </CharacterImage>
                <ButtonWrapper>
                    <ContentButton onClick={() => handleShowSection("general")}>General</ContentButton>
                    <ContentButton onClick={() => handleShowSection("race")}>Race</ContentButton>
                    <ContentButton onClick={() => handleShowSection("class")}>Class</ContentButton>
                    <ContentButton onClick={() => handleShowSection("scores")}>Ability Scores</ContentButton>
                    <ContentButton disabled={!state.selectedClass.name} onClick={() => handleShowSection("levels")}>Levels</ContentButton>
                </ButtonWrapper>
            </CreatorWrapper>
            <StyledContentArea>
                {currentlyDisplayed === "general"?<GeneralCharacterDetails />:<></>}
                {!characterClasses
                ?<h1>Loading</h1>
                :
                <div>
                <StyledInputArea>
                    <div>
                    {currentlyDisplayed === "race"?!state.selectedRace.name
                        ?<CharacterRaceOptions />
                        :<ConfirmedWrapper>
                            You selected <SelectedSpan>{state.selectedRace.name}</SelectedSpan>
                            {/* <button onClick={showRace}>Click for details</button> */}
                            <EditButton onClick={handleResetRace}>Edit Race</EditButton>
                        </ConfirmedWrapper>
                    :<></>}
                    </div>
                    <div>
                        {currentlyDisplayed === "class"?!state.selectedClass.name
                            ?<CharacterClassOptions />
                            :<ConfirmedWrapper>
                            You selected <SelectedSpan>{state.selectedClass.name}</SelectedSpan>
                            
                            <EditButton onClick={handleResetClass}>Click to change</EditButton>
                        </ConfirmedWrapper>
                        :<></>}
                    </div>
                    <div>
                        {!characterClasses?<h1>Loading</h1>
                            :<div>
                                {currentlyDisplayed === "scores"?<CharacterAbilityPoints />:<></>}
                            </div>}
                    </div>
                    <div>
                        {!characterClasses?<h1>Loading</h1>
                            :<div>
                                {currentlyDisplayed === "levels"?<CharacterLevels classDetails={state.selectedClass} levelDetails={state.classData} />:<></>}
                            </div>}
                    </div>
                
                </StyledInputArea>
                </div>}
            </StyledContentArea>
            
        </Wrapper>
        :<h1>You are not logged in</h1>
    )
};

const StyledImage = styled(Image)`
/* max-height: 100%; */
aspect-ratio: 1/1 ;
object-fit: cover;
width: auto;
height: 150px;
border: 3px solid #cc444b;
border-radius: 50%;
object-position: 0px -1px;
background-color: #cc444b;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border-left: 1px solid #595959;
border-right: 1px solid #595959;
border-bottom: 3px solid #cc444b;
width: 60%;
margin: 0 auto;
min-height: 100vh;
background-color: #595959;

`;

const StyledSubmitCharacterButton = styled.button`
margin-top: 25px;
padding: 10px;
background: #e5e5e5;
border: none;
border-radius: 15px;
:hover {
    cursor: pointer;
    background: #7c98b3;
}
`;

const CharacterImage = styled.div`

`;
const ConfirmedWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e5e5e5;
  border-right: 3px solid #cc444b;
  border-bottom: 3px solid #cc444b;
  padding: 50px;
  border-radius: 15px;
`;
const SelectedSpan = styled.span`
font-size: 35px;
font-weight: bold;
border-bottom: 1px solid #cc444b ;
padding: 5px;
margin: 10px 0 25px 0;
`;

const EditButton = styled.button`
border: none;
background-color: #accbe1;
padding: 10px;
border-radius: 15px;
border: 1px solid #7c98b3;
`;
const CreatorWrapper = styled.div`
display: flex;
align-items: flex-end;
background-color: #accbe1;
width: 100%;
border-top: 2px solid #cc444b;

`;
const ButtonWrapper = styled.div`

width: 50%;
display: flex;
align-items: flex-end;
`;
const DisplayName = styled.div`
font-size: 25px;
margin-right: 50px;
padding: 25px;
width: 30%;

`;

const ContentButton = styled.button`
font-size: 25px;
margin: 5px 5px 0 5px;
padding: 5px;
background: #e5e5e5;
border: none;
:hover {
    cursor: pointer;
}
:active {
    background: #595959 ;
    color: #cc444b;
}
`;

// const ButtonToggle = styled(ContentButton)`
// opacity: 0.6;
// ${({ active }) =>
//   active &&
//   `
//   opacity: 1;
// `}
// `;
const StyledInputArea = styled.div`
display: flex;


`;

const StyledContentArea = styled.div`
display: flex;
margin-top: 10%;
`;
export default Character;