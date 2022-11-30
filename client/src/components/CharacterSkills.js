
import { useEffect, useState } from "react";

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
        <div>
            <button onClick={seeSkills}>Click</button>
            <h1>THis is the skills page ya its here</h1>
            <div>Acrobatics <span>{statModifiers[statistics.dexterity]}</span></div>
            <div>Animal Handling <span>{statModifiers[statistics.wisdom]}</span></div>
            <div>Arcana <span>{statModifiers[statistics.intelligence]}</span></div>
            <div>Athletics <span>{statModifiers[statistics.strength]}</span></div>
            <div>Deception <span>{statModifiers[statistics.charisma]}</span></div>
            <div>History <span>{statModifiers[statistics.intelligence]}</span></div>
            <div>Insight <span>{statModifiers[statistics.intelligence]}</span></div>
            <div>Intimidation <span>{statModifiers[statistics.charisma]}</span></div>
            <div>Investigation <span>{statModifiers[statistics.intelligence]}</span></div>
            <div>Medicine <span>{statModifiers[statistics.wisdom]}</span></div>
            <div>Nature <span>{statModifiers[statistics.wisdom]}</span></div>
            <div>Perception <span>{statModifiers[statistics.wisdom]}</span></div>
            <div>Performance <span>{statModifiers[statistics.charisma]}</span></div>
            <div>Persuasion <span>{statModifiers[statistics.charisma]}</span></div>
            <div>Religion <span>{statModifiers[statistics.intelligence]}</span></div>
            <div>Sleight of Hand <span>{statModifiers[statistics.dexterity]}</span></div>
            <div>Stealth <span>{statModifiers[statistics.dexterity]}</span></div>
            <div>Survival <span>{statModifiers[statistics.wisdom]}</span></div>
        </div>
    );
};

export default CharacterSkills;