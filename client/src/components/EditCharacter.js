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
import { useNavigate, useParams } from "react-router-dom";

const EditCharacter = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);
    const { userId } = useContext(UserContext);
    const [ currentlyDisplayed, setCurrentlyDisplayed] = useState("general")
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    const {characterId} = useParams();
    const [currentCharacter, setCurrentCharacter] = useState("");
    const [visibleNavButton, setVisibleNavButton] = useState(false);

    useEffect(() => {
        actions.resetCharacterData("");

        if (characterId) {

            fetch(`/character/${characterId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCurrentCharacter(data.data[0].characterInformation);
                console.log(state.characterName);
            })
            .catch((error) => {
                window.alert(error);
            });
        }
        
    }, []);

    useEffect(() => {

        actions.getCharacterData(currentCharacter);
        if (currentCharacter.abilityScores) {
            actions.updateStr(currentCharacter.abilityScores.strength);
            actions.updateDex(currentCharacter.abilityScores.dexterity);
            actions.updateCon(currentCharacter.abilityScores.constitution);
            actions.updateInt(currentCharacter.abilityScores.intelligence);
            actions.updateWis(currentCharacter.abilityScores.wisdom);
            actions.updateCha(currentCharacter.abilityScores.charisma);
        }
        if (currentCharacter.assignedPoints) {
            actions.updateStrPoints(currentCharacter.assignedPoints.strength);
            actions.updateDexPoints(currentCharacter.assignedPoints.dexterity);
            actions.updateConPoints(currentCharacter.assignedPoints.constitution);
            actions.updateIntPoints(currentCharacter.assignedPoints.intelligence);
            actions.updateWisPoints(currentCharacter.assignedPoints.wisdom);
            actions.updateChaPoints(currentCharacter.assignedPoints.charisma);
        }
        
        
        
    }, [currentCharacter])
    
    
    const handleShowSection = (section) => {
        setCurrentlyDisplayed(section);
    };

    const handleResetClass = () => {
        actions.updateClass("");
        actions.updateClassDetails("");
    };
    const showState = () => {
        console.log(state)
    };

    const handleResetRace = () => {
        actions.updateRace("")
    };

    const handleCharProfileNav = () => {
        navigate(`/character/${characterId}`);
        actions.resetCharacterData("");
    }

    const submitCharacter = () => { //need to change to a patch
        console.log(currentCharacter);
        console.log( state );

            fetch(`/editcharacter/${characterId}`, {
                "method": "PATCH",
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
                setVisibleNavButton(true);
                
            } )
    };

    return (
        isAuthenticated 
        ?state.characterName?
        <Wrapper>
            <CreatorWrapper>
                <DisplayName>
                    <div>
                        Character Name: {state.characterName}
                    </div>
                    <div>
                        <button onClick={submitCharacter}>Confirm Changes</button>
                        {visibleNavButton?<button onClick={handleCharProfileNav}>Back to {state.characterName}'s profile</button>:<></>}
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
        :<>Loading <button onClick={showState}>Click</button></>
        :<h1>You are not logged in</h1>
    )
};






const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border-left: 1px solid #595959;
border-right: 1px solid #595959;
border-bottom: 3px solid #cc444b;
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
`;

const StyledContentArea = styled.div`
display: flex;
margin-top: 10%;
`;

export default EditCharacter;