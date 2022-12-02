import { useContext, useReducer, useState } from "react";
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


const Character = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);
    const { userId } = useContext(UserContext);
    const [ currentlyDisplayed, setCurrentlyDisplayed] = useState("general")
    const { isAuthenticated } = useAuth0();
    
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
            .then( data => console.log(data) )
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
                        <button onClick={submitCharacter}>Submit Your Character</button>
                    </div>
                </DisplayName>
                <CharacterImage>
                    {state.characterImageId ?<Image cloudName="dfigamsk5" publicId={state.characterImageId } gravity= "auto" aspect_ratio= "1:1" border= "3px_solid_rgb:cc444b" radius= "max" width="150" height="150" crop="fill"/>
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
        </Wrapper>
        :<h1>You are not logged in</h1>
    )
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border-left: 1px solid #595959;
border-right: 1px solid #595959;
width: 60%;
margin: 0 auto;
height: 100vh;
background-color: #595959;
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
`
export default Character;