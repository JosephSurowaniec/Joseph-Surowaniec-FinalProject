
import { useEffect, useState } from "react";
import styled from "styled-components";

const CharacterSkills = (characterDetails) => {

    const [skills , setSkills] = useState("");
    const statModifiers = characterDetails.modifiers;
    const statistics = characterDetails.stats;

    useEffect(() => {
        fetch(`https://www.dnd5eapi.co/api/skills`)
            .then((res) => res.json())
            .then((data) => {
                setSkills(data)
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
    }, []);

    const seeSkills = () => {
        console.log(statModifiers);
        console.log(statistics);
    };

    return (
        <Wrapper>
            <button onClick={seeSkills}>Click</button>
            
            <SkillSection>
                <h1>Skills</h1>
                <UniqueSkill>Acrobatics <ModifierSpan>{statModifiers[statistics.dexterity]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Animal Handling <ModifierSpan>{statModifiers[statistics.wisdom]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Arcana <ModifierSpan>{statModifiers[statistics.intelligence]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Athletics <ModifierSpan>{statModifiers[statistics.strength]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Deception <ModifierSpan>{statModifiers[statistics.charisma]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>History <ModifierSpan>{statModifiers[statistics.intelligence]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Insight <ModifierSpan>{statModifiers[statistics.intelligence]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Intimidation <ModifierSpan>{statModifiers[statistics.charisma]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Investigation <ModifierSpan>{statModifiers[statistics.intelligence]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Medicine <ModifierSpan>{statModifiers[statistics.wisdom]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Nature <ModifierSpan>{statModifiers[statistics.wisdom]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Perception <ModifierSpan>{statModifiers[statistics.wisdom]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Performance <ModifierSpan>{statModifiers[statistics.charisma]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Persuasion <ModifierSpan>{statModifiers[statistics.charisma]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Religion <ModifierSpan>{statModifiers[statistics.intelligence]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Sleight of Hand <ModifierSpan>{statModifiers[statistics.dexterity]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Stealth <ModifierSpan>{statModifiers[statistics.dexterity]}</ModifierSpan></UniqueSkill>
                <UniqueSkill>Survival <ModifierSpan>{statModifiers[statistics.wisdom]}</ModifierSpan></UniqueSkill>
            </SkillSection>
            <SavingThrowWrapper>
                <h1>Saving Throws</h1>
                <StyledSavingThrow>
                <StatBox>Strength<ModifierWrapper>{statModifiers[statistics.strength]}</ModifierWrapper></StatBox>
                <StatBox>Dex <ModifierWrapper>{statModifiers[statistics.dexterity]}</ModifierWrapper></StatBox>
                <StatBox>Con <ModifierWrapper>{statModifiers[statistics.constitution]}</ModifierWrapper></StatBox>
                <StatBox>Int <ModifierWrapper>{statModifiers[statistics.intelligence]}</ModifierWrapper></StatBox>
                <StatBox>Wisdom <ModifierWrapper>{statModifiers[statistics.wisdom]}</ModifierWrapper></StatBox>
                <StatBox>Charisma<ModifierWrapper>{statModifiers[statistics.charisma]}</ModifierWrapper></StatBox>
            </StyledSavingThrow>
            </SavingThrowWrapper>
            
        </Wrapper>
    );
};

const Wrapper = styled.div`

display: flex;
border: 1px solid black;
flex: 1;
height: 100%;

`;
const SkillSection = styled.div`
margin: 10px;
padding: 25px;
box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
background-color: white;
color: #000;
display: flex;
flex-direction: column;
border-radius: 10px;
`;

const UniqueSkill = styled.div`
border-bottom: 1px solid black;
margin: 2px;
padding: 2px;
min-width: 200px;
max-width: 200px;
font-size: 20px;
span{
float: right;
}
`;

const ModifierSpan = styled.span`
border: 2px solid red;
border-radius: 5px;
`;
const SavingThrowWrapper = styled.div`
margin-left: 25px;
`;
const StyledSavingThrow = styled.div`

display: flex;
flex-wrap: wrap;
height: 35%;
max-width: 400px;
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
border-radius: 10px;
padding: 5px;

`;
export default CharacterSkills;