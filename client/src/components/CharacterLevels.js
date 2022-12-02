import { useContext, useState } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";

const CharacterLevels = (features) => {

    const levelInfo = features.levelDetails;
    const [ currentLevel , setCurrentLevel ] = useState(0);
    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);

    let sliceEndpoint = Number(currentLevel);

    const seeFeatures = () => {
        console.log(features.levelDetails);
        console.log(features.classDetails);
        
    }
    return (
        <Wrapper>
            <h1>Level Page</h1>
            <button onClick={seeFeatures}>Click to set up features</button>
            <LevelSelectorForm>
                <form>
                    <StyledLabel>Select your Level</StyledLabel>
                    <select value={currentLevel} onChange={(e) => {setCurrentLevel(e.target.value)
                                                                    actions.updateLevel(e.target.value)}}>
                        {levelInfo.map((element) => {
                        return (
                            <option key={Math.floor(Math.random()*140000000000000)} value={element.level}>{element.level}</option>
                            )
                        })}
                    </select>
                </form>
            </LevelSelectorForm>
            
            <div>
                <StyledScroller>
                    {levelInfo.slice(0 , sliceEndpoint).map((el) => {
                        return (
                            <InnerLevel key={Math.floor(Math.random()*140000000000000)}>
                                <StyledProfBonus>Proficiency Bonus: {el.ability_score_bonuses}</StyledProfBonus>
                                <span>Features:</span>
                                {el.features?<>{el.features.map((element) => {
                                    return (
                                        <div key={Math.floor(Math.random()*150000000000000)}>
                                            
                                            {element.name}
                                        </div>
                                    )
                                })}</>:<></>}
                            </InnerLevel>
                            )
                        })}
                </StyledScroller>
            </div>

            
        </Wrapper>
    );
};

const Wrapper = styled.div`
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

const LevelSelectorForm = styled.div`
border: 1px solid black;
padding: 25px;
margin: 25px 0 25px 0;
`;
const StyledLabel = styled.label`
margin-right: 10px;
`;
const StyledProfBonus = styled.span`
margin: 5px;
`;

const StyledScroller = styled.div`
max-height: 40vh;
padding: 10px;
overflow-y: auto;

`;
const InnerLevel = styled.div`
padding: 10px;
border-top: 3px solid #7c98b3;
border-bottom: 3px solid #7c98b3;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #e5e5e5;
margin: 5px;
border-radius: 15px;
`;
export default CharacterLevels;