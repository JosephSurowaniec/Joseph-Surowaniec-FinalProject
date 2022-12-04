import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";
import { UserContext } from "./UserContext";

const CharacterAbilityPoints = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);
    // const [ strPoints, setStrPoints] = useState(0);
    // const [ dexPoints, setDexPoints] = useState(0);
    // const [ conPoints, setConPoints] = useState(0);
    // const [ intPoints, setIntPoints] = useState(0);
    // const [ wisPoints, setWisPoints] = useState(0);
    // const [ chaPoints, setChaPoints] = useState(0);

    const [strModifier, setStrModifier] = useState(0);
    const [dexModifier, setDexModifier] = useState(0);
    const [conModifier, setConModifier] = useState(0);
    const [intModifier, setIntModifier] = useState(0);
    const [wisModifier, setWisModifier] = useState(0);
    const [chaModifier, setChaModifier] = useState(0);

    let updatedStr = Number(strModifier) + Number(state.abilityScores.strength);
    let updatedDex = Number(dexModifier) + Number(state.abilityScores.dexterity);
    let updatedCon = Number(conModifier) + Number(state.abilityScores.constitution);
    let updatedInt = Number(intModifier) + Number(state.abilityScores.intelligence);
    let updatedWis = Number(wisModifier) + Number(state.abilityScores.wisdom);
    let updatedCha = Number(chaModifier) + Number(state.abilityScores.charisma);

    useEffect(() => {

        if (state.selectedRace) {

            const checkModifiers = state.selectedRace.ability_bonuses.map((el) => {
                    return (
                        {name: el.ability_score.name , score: el.bonus}
                    )
                });
            console.log(checkModifiers)
        
        const strengthModifier = checkModifiers.filter((name) => {if (name.name === 'STR' ) {
            return true;
        }});
        const dextModifier = checkModifiers.filter((name) => {if (name.name === 'DEX' ) {
            return true;
        }});
        const conModifier = checkModifiers.filter((name) => {if (name.name === 'CON' ) {
            return true;
        }});
        const intModifier = checkModifiers.filter((name) => {if (name.name === 'INT' ) {
            return true;
        }});
        const wisModifier = checkModifiers.filter((name) => {if (name.name === 'WIS' ) {
            return true;
        }});
        const charModifier = checkModifiers.filter((name) => {if (name.name === 'CHA' ) {
            return true;
        }});

        if (strengthModifier.length >= 1) {
            setStrModifier(strengthModifier[0].score)
        };
        if (dextModifier.length >= 1) {
            setDexModifier(dextModifier[0].score)
        };
        if (conModifier.length >= 1) {
            setConModifier(conModifier[0].score)
        };
        if (intModifier.length >= 1) {
            setIntModifier(intModifier[0].score)
        };
        if (wisModifier.length >= 1) {
            setWisModifier(wisModifier[0].score)
        };
        if (charModifier.length >= 1) {
            setChaModifier(charModifier[0].score)
        };
    }
    }, []);

    const pointValues = {
        8: 0,
        9: 1,
        10: 2,
        11: 3,
        12: 4,
        13: 5,
        14: 7,
        15: 9
    };

    const handleSubmitStats = (e) => {
        e.preventDefault();
        console.log("stats sent")
        actions.updateModifiedStats({str: updatedStr, dex: updatedDex , con: updatedCon , int: updatedInt , wis: updatedWis, cha: updatedCha })
    };
    const checkNums = () => {
        console.log(state);
        // console.log(strModifier);
        // console.log(dexModifier);
        // console.log(conModifier);
        // console.log(intModifier);
        // console.log(wisModifier);
        // console.log(chaModifier);
    }

    const pointsLeft = 27 - state.assignedPoints.strength - state.assignedPoints.dexterity - state.assignedPoints.constitution - state.assignedPoints.intelligence - state.assignedPoints.wisdom - state.assignedPoints.charisma;

    const ModifierValues = {
        4: "-3", 5: "-3", 6: "-2", 7: "-2", 8: "-1", 9: "-1", 10: "0", 11: "0", 12: "+1", 13: "+1", 14: "+2", 15: "+2", 16: "+3", 17: "+3", 18: "+4", 19: "+4", 20: "+5"
    };

    return (
        <Wrapper>
            <PointsWrapper> Points Remaining: {pointsLeft} </PointsWrapper>
            <button onClick={checkNums}></button>
            <FormWrapper>
                                <StatsWrapper><label>STRENGTH</label>
                                    <select value={state.abilityScores.strength} onChange={(e) => {actions.updateStr(e.target.value)
                                                                                                    actions.updateStrPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && state.assignedPoints.strength <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && state.assignedPoints.strength <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && state.assignedPoints.strength <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && state.assignedPoints.strength <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && state.assignedPoints.strength <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && state.assignedPoints.strength <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && state.assignedPoints.strength <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <StatBox>Strength <div>{updatedStr}</div><ModifierWrapper>{ModifierValues[updatedStr]}</ModifierWrapper></StatBox>
                                </StatsWrapper>
                                <StatsWrapper>
                                    <label>DEXTERITY</label>
                                    <select value={state.abilityScores.dexterity} onChange={(e) => {actions.updateDex(e.target.value)
                                                                                                    actions.updateDexPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && state.assignedPoints.dexterity <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && state.assignedPoints.dexterity <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && state.assignedPoints.dexterity <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && state.assignedPoints.dexterity <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && state.assignedPoints.dexterity <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && state.assignedPoints.dexterity <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && state.assignedPoints.dexterity <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <StatBox>Dex <div>{updatedDex}</div><ModifierWrapper>{ModifierValues[updatedDex]}</ModifierWrapper></StatBox>
                                </StatsWrapper>
                                <StatsWrapper>
                                    <label>CONSTITUTION</label>
                                    <select value={state.abilityScores.constitution} onChange={(e) => {actions.updateCon(e.target.value)
                                                                                                    actions.updateConPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && state.assignedPoints.constitution <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && state.assignedPoints.constitution <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && state.assignedPoints.constitution <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && state.assignedPoints.constitution <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && state.assignedPoints.constitution <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && state.assignedPoints.constitution <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && state.assignedPoints.constitution <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <StatBox>Con <div>{updatedCon}</div><ModifierWrapper>{ModifierValues[updatedCon]}</ModifierWrapper></StatBox>
                                </StatsWrapper>
                                <StatsWrapper>
                                    <label>INTELLIGENCE</label>
                                    <select value={state.abilityScores.intelligence} onChange={(e) => {actions.updateInt(e.target.value)
                                                                                                    actions.updateIntPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && state.assignedPoints.intelligence <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && state.assignedPoints.intelligence <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && state.assignedPoints.intelligence <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && state.assignedPoints.intelligence <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && state.assignedPoints.intelligence <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && state.assignedPoints.intelligence <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && state.assignedPoints.intelligence <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <StatBox>Int <div>{updatedInt}</div><ModifierWrapper>{ModifierValues[updatedInt]}</ModifierWrapper></StatBox>
                                </StatsWrapper>
                                <StatsWrapper>
                                    <label>WISDOM</label>
                                    <select value={state.abilityScores.wisdom} onChange={(e) => {actions.updateWis(e.target.value)
                                                                                                    actions.updateWisPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && state.assignedPoints.wisdom <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && state.assignedPoints.wisdom <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && state.assignedPoints.wisdom <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && state.assignedPoints.wisdom <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && state.assignedPoints.wisdom <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && state.assignedPoints.wisdom <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && state.assignedPoints.wisdom <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <StatBox>Wisdom <div>{updatedWis}</div><ModifierWrapper>{ModifierValues[updatedWis]}</ModifierWrapper></StatBox>
                                </StatsWrapper>
                                <StatsWrapper>
                                    <label>CHARISMA</label>
                                    <select value={state.abilityScores.charisma} onChange={(e) => {actions.updateCha(e.target.value)
                                                                                                    actions.updateChaPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && state.assignedPoints.charisma <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && state.assignedPoints.charisma <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && state.assignedPoints.charisma <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && state.assignedPoints.charisma <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && state.assignedPoints.charisma <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && state.assignedPoints.charisma <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && state.assignedPoints.charisma <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <StatBox>Charisma <div>{updatedCha}</div><ModifierWrapper>{ModifierValues[updatedCha]}</ModifierWrapper></StatBox>
                                </StatsWrapper>
                                <div>
                                    <button onClick={handleSubmitStats}>Confirm Stats</button>
                                </div>
                                    
                            </FormWrapper>
                        <div>

                       
                                
                                
                                
                                

                        </div>
        </Wrapper>
    )
}


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

const PointsWrapper = styled.div`
padding: 25px 25px 0 25px;
margin-bottom: 15px;
border-bottom: 3px solid #cc444b;
font-size: 25px;
`;

const FormWrapper = styled.form`
display: grid;
grid-template-columns: auto auto ;

grid-row-gap: 5px;

grid-column-gap: 75px;

/* align-items: center; */

/* column-gap: 8rem;  */

`;

const StatsWrapper = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
border: 1px solid rgba(35 , 35 , 35 , 0.2);;
border-radius: 15px;
padding: 5px;
margin: 10px;
`;

const StatBox = styled.div`
width: 100px;
height: 100px;
margin-top: 15px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
border-radius: 35px;
border: 4px solid #595959;
`;
const ModifierWrapper = styled.div`
border: 3px solid red;
border-radius: 25px;
padding: 5px;
`;
export default CharacterAbilityPoints;