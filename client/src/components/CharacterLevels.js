import { useState } from "react";
import styled from "styled-components";

const CharacterLevels = (features) => {

    const levelInfo = features.levelDetails;
    const [ currentLevel , setCurrentLevel ] = useState(0);

    let sliceEndpoint = Number(currentLevel);

    const seeFeatures = () => {
        console.log(features.levelDetails);
        console.log(features.classDetails);
        

    }
    return (
        <div>
            <h1>Level Page</h1>
            <button onClick={seeFeatures}>Click to set up features</button>
            <div>
                <form>
                    <label>Select your Level</label>
                    <select value={currentLevel} onChange={(e) => {setCurrentLevel(e.target.value)}}>
                        {levelInfo.map((element) => {
                        return (
                            <option key={Math.floor(Math.random()*140000000000000)} value={element.level}>{element.level}</option>
                            )
                        })}
                    </select>
                </form>
            </div>
            
            <div>
                This is where you can select your features
                <div>
                    {levelInfo.slice(0 , sliceEndpoint).map((el) => {
                        return (
                            <InnerLevel key={Math.floor(Math.random()*140000000000000)}>
                                {el.ability_score_bonuses}
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
                </div>
            </div>

            
        </div>
    );
};

const InnerLevel = styled.div`
border: 1px solid black;
margin: 2px;
padding: 2px;
`
export default CharacterLevels;