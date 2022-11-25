import { useContext, useReducer, useState } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";
import ClassOptions from "./ClassOptions";
import RaceOptions from "./RaceOptions";


const Character = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);
    

    const testAPI = () => {
        console.log("we are here");
        console.log( state );
        
    };

    const submitCharacter = () => {
            fetch("/newcharacters", {
                "method": "POST",
                "body": JSON.stringify({
                    "characterDetails": state,
                }),
                "headers": {
                    "Content-Type": "application/json"
                }
            })
            .then( res => res.json() )
            .then( data => console.log(data) )
    };

    return (
        <div>
            <h1>THis is the character creation page</h1>
            <button onClick={testAPI}>CLick to test the API</button>
            <button onClick={submitCharacter}>Click to send character to server</button>
            <StyledTextArea name="characterName" id="name" value={state.characterName} placeholder="What's Your Name?" onChange={(e) => actions.updateCharacterName(e.target.value)} />
            {!characterRaces
            ?<h1>Loading</h1>
            :<form>
            <label>Choose a Race</label>
            <select value={state.selectedRace} onChange={(e) => actions.updateRace(e.target.value) }>
                <option value="">Select your Race</option>
                {characterRaces.results.map((element => {
                    return (
                        <option key={Math.floor(Math.random() * 1700000000)} value={element.index}>{element.name}</option>
                    )
                }))}
            </select>
        </form>}
            {!characterClasses
            ?<h1>Loading</h1>
            :
            <div>
                <form>
                <label>Choose a Class</label>
                <select value={state.selectedClass} onChange={(e) => actions.updateClass(e.target.value) }>
                    <option value="">Select your Class</option>
                    {characterClasses.results.map((element => {
                        return (
                            <option key={Math.floor(Math.random() * 1700000000)} value={element.index}>{element.name}</option>
                        )
                    }))}
                </select>
            </form>
            <StyledInputArea>
                <div>
                    {!characterRaces?<div>Loading</div>
                        :characterRaces.results.map((element => {
                        return (
                            <div key={Math.floor(Math.random() * 1700000000)}>
                                <RaceOptions index={element.index} name={element.name}/>
                            </div>
                        )
                    }))}
                </div>
                <div>
                    {!characterClasses?<h1>Loading</h1>
                        :characterClasses.results.map((element => {
                        return (
                            <div key={Math.floor(Math.random() * 1700000000)}>
                                <ClassOptions index={element.index} name={element.name}/>
                            </div>
                        )
                    }))}
                </div>
                <div>
                    {!characterClasses?<h1>Loading</h1>
                        :<div>
                            <form>
                                <label>STRENGTH</label>
                                    <select value={state.abilityScores.strength} onChange={(e) => actions.updateStr(e.target.value) }>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                        <option value={13}>13</option>
                                    </select>
                                    <label>DEXTERITY</label>
                                    <select value={state.abilityScores.dexterity} onChange={(e) => actions.updateDex(e.target.value) }>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                        <option value={13}>13</option>
                                    </select>
                                    <label>CONSTITUTION</label>
                                    <select value={state.abilityScores.constitution} onChange={(e) => actions.updateCon(e.target.value) }>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                        <option value={13}>13</option>
                                    </select>
                                    <label>INTELLIGENCE</label>
                                    <select value={state.abilityScores.intelligence} onChange={(e) => actions.updateInt(e.target.value) }>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                        <option value={13}>13</option>
                                    </select>
                                    <label>WISDOM</label>
                                    <select value={state.abilityScores.wisdom} onChange={(e) => actions.updateWis(e.target.value) }>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                        <option value={13}>13</option>
                                    </select>
                                    <label>CHARISMA</label>
                                    <select value={state.abilityScores.charisma} onChange={(e) => actions.updateCha(e.target.value) }>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                        <option value={13}>13</option>
                                    </select>
                            </form>
                        </div>}
                </div>
            
            </StyledInputArea>
            </div>}
            {!state.characterName
            ?<></>
            :<h1>{state.characterName}</h1>}
            {!state.selectedRace
            ?<div>Loading</div>
            :<h1>{state.selectedRace.name}</h1>}
        </div>
    )
};

const StyledTextArea = styled.textarea`

  border: 1px solid black;
  width: 200px;
  height: 75px;
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  resize: none;
  font-size: 18px;
  /* :focus {
    outline: none;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
} 
  ::-webkit-scrollbar-thumb {
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.10);
} 
::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.15);
}  */
`;

const StyledInputArea = styled.div`
display: flex;
`
export default Character;