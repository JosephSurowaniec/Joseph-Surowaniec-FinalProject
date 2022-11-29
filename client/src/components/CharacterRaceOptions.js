import { useContext } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";
import { UserContext } from "./UserContext";
import RaceOptions from "./RaceOptions";

const CharacterRaceOptions = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);

    return (
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
    )
}

export default CharacterRaceOptions;