import { useContext, useState } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";
import { UserContext } from "./UserContext";

const CharacterAbilityPoints = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);
    const [ strPoints, setStrPoints] = useState(0);
    const [ dexPoints, setDexPoints] = useState(0);
    const [ conPoints, setConPoints] = useState(0);
    const [ intPoints, setIntPoints] = useState(0);
    const [ wisPoints, setWisPoints] = useState(0);
    const [ chaPoints, setChaPoints] = useState(0);

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
    const checkNums = () => {
        console.log(strPoints);
    }

    const pointsLeft = 27 - strPoints - dexPoints - conPoints - intPoints - wisPoints - chaPoints;

    return (
        <div>
            <div> {pointsLeft} </div>
            <button onClick={checkNums}></button>
            <form>
                                <label>STRENGTH</label>
                                    <select value={state.abilityScores.strength} onChange={(e) => {actions.updateStr(e.target.value)
                                                                                                    setStrPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && strPoints <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && strPoints <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && strPoints <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && strPoints <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && strPoints <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && strPoints <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && strPoints <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <label>DEXTERITY</label>
                                    <select value={state.abilityScores.dexterity} onChange={(e) => {actions.updateDex(e.target.value)
                                                                                                    setDexPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && dexPoints <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && dexPoints <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && dexPoints <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && dexPoints <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && dexPoints <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && dexPoints <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && dexPoints <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <label>CONSTITUTION</label>
                                    <select value={state.abilityScores.constitution} onChange={(e) => {actions.updateCon(e.target.value)
                                                                                                    setConPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && conPoints <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && conPoints <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && conPoints <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && conPoints <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && conPoints <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && conPoints <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && conPoints <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <label>INTELLIGENCE</label>
                                    <select value={state.abilityScores.intelligence} onChange={(e) => {actions.updateInt(e.target.value)
                                                                                                    setIntPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && intPoints <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && intPoints <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && intPoints <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && intPoints <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && intPoints <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && intPoints <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && intPoints <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <label>WISDOM</label>
                                    <select value={state.abilityScores.wisdom} onChange={(e) => {actions.updateWis(e.target.value)
                                                                                                    setWisPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && wisPoints <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && wisPoints <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && wisPoints <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && wisPoints <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && wisPoints <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && wisPoints <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && wisPoints <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                                    <label>CHARISMA</label>
                                    <select value={state.abilityScores.charisma} onChange={(e) => {actions.updateCha(e.target.value)
                                                                                                    setChaPoints(pointValues[e.target.value])} }>
                                        <option value={8}>8</option>
                                        {pointsLeft <= 0 && chaPoints <=0 ?<></>:<option value={9}>9</option>}
                                        {pointsLeft <= 1 && chaPoints <=1 ?<></>:<option value={10}>10</option>}
                                        {pointsLeft <= 2 && chaPoints <=2 ?<></>:<option value={11}>11</option>}
                                        {pointsLeft <= 3 && chaPoints <=3 ?<></>:<option value={12}>12</option>}
                                        {pointsLeft <= 4 && chaPoints <=4 ?<></>:<option value={13}>13</option>}
                                        {pointsLeft <= 6 && chaPoints <=6 ?<></>:<option value={14}>14</option>}
                                        {pointsLeft <= 8 && chaPoints <=8 ?<></>:<option value={15}>15</option>}
                                    </select>
                            </form>
        </div>
    )
}

export default CharacterAbilityPoints;