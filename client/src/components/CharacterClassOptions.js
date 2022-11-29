import { useContext } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";
import { UserContext } from "./UserContext";
import ClassOptions from "./ClassOptions";

const CharacterClassOptions = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);

    return (
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
    )
}

export default CharacterClassOptions;