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


const Character = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);
    const { userId, loggedIn } = useContext(UserContext);
    const [ currentlyDisplayed, setCurrentlyDisplayed] = useState("general")

    const handleShowSection = (section) => {
        setCurrentlyDisplayed(section);
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
        loggedIn
        ?
        <Wrapper>
            <h1>THis is the character creation page</h1>
            <div>
                Your name is: {state.characterName}
                Your race is: {state.selectedRace.name}
                Your class is: {state.selectedClass.name}
            </div>
            <button onClick={testAPI}>CLick to test the API</button>
            <button onClick={submitCharacter}>Click to send character to server</button>
            <div>
                <button onClick={() => handleShowSection("general")}>General</button>
                <button onClick={() => handleShowSection("race")}>Race</button>
                <button onClick={() => handleShowSection("class")}>Class</button>
                <button onClick={() => handleShowSection("scores")}>Ability Scores</button>
            </div>
            {currentlyDisplayed === "general"?<GeneralCharacterDetails />:<></>}
            {!characterClasses
            ?<h1>Loading</h1>
            :
            <div>
            <StyledInputArea>
                <div>
                {currentlyDisplayed === "race"?<CharacterRaceOptions />:<></>}
                </div>
                <div>
                    {currentlyDisplayed === "class"?<CharacterClassOptions />:<></>}
                </div>
                <div>
                    {!characterClasses?<h1>Loading</h1>
                        :<div>
                            {currentlyDisplayed === "scores"?<CharacterAbilityPoints />:<></>}
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
justify-content: center;
`
const StyledInputArea = styled.div`
display: flex;
`
export default Character;