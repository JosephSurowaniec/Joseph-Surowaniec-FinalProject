import { createContext, useEffect, useState, useReducer } from "react";


export const CharacterContext = createContext(null);

const initialState = {
    characterName: "",
    selectedClass: "",
    selectedRace: "",
    classData:"",
    characterImageId: "",
    abilityScores:{
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8
    }
};

const reducer = (state, action) => {

    switch(action.type) {

        case "addName": {
            return {
                ...state,
                characterName: action.data
            }
        }

        case "addRace": {
            return {
                ...state,
                selectedRace: action.data
            }
        }

        case "addClass": {
            return {
                ...state,
                selectedClass: action.data
            }
        }
        case "addClassOptions": {
            return {
                ...state,
                classData: action.data
            }
        }
        case "addCharacterImage": {
            return {
                ...state,
                characterImageId: action.data
            }
        }
        case "addStrength": {
            return {
                ...state,
                abilityScores: {...state.abilityScores, strength: action.data}
                
            }
        }
        case "addDexterity": {
            return {
                ...state,
                abilityScores:{...state.abilityScores, dexterity: action.data}

            }
        }
        case "addConstitution": {
            return {
                ...state,
                abilityScores:{...state.abilityScores, constitution: action.data}

            }
        }
        case "addIntelligence": {
            return {
                ...state,
                abilityScores:{...state.abilityScores, intelligence: action.data}

            }
        }
        case "addWisdom": {
            return {
                ...state,
                abilityScores:{...state.abilityScores, wisdom: action.data}

            }
        }
        case "addCharisma": {
            return {
                ...state,
                abilityScores:{...state.abilityScores, charisma: action.data}

            }
        }
        default: {
            throw new Error("Something Broke");
        }
    }
}

export const CharacterProvidor = ({ children }) => {

    const [characterClasses, setCharacterClasses] = useState("")
    const [characterRaces, setCharacterRaces] = useState("")
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch("https://www.dnd5eapi.co/api/classes")
            .then((res) => res.json())
            .then((data) => {
                setCharacterClasses(data)
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
    }, [])

    useEffect(() => {
        fetch("https://www.dnd5eapi.co/api/races/")
            .then((res) => res.json())
            .then((data) => {
                setCharacterRaces(data)
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
    }, []);

    const updateCharacterName = (data) => {
        dispatch({
            type: "addName",
            data
        })
    };

    const updateRace = (data) => {
        dispatch({
            type: "addRace",
            data
        })
    };

    const updateClass = (data) => {
        dispatch({
            type: "addClass",
            data
        })
    };

    const updateClassDetails = (data) => {
        dispatch({
            type: "addClassOptions",
            data
        })
    };

    const updateCharacterImage = (data) => {
        dispatch({
            type: "addCharacterImage",
            data
        })
    };

    const updateStr = (data) => {
        dispatch({
            type: "addStrength",
            data
        })
    };
        const updateDex = (data) => {
            dispatch({
                type: "addDexterity",
                data
            })
    };
    const updateCon = (data) => {
        dispatch({
            type: "addConstitution",
            data
        })
    };
        const updateInt = (data) => {
            dispatch({
                type: "addIntelligence",
                data
            })
    };
    const updateWis = (data) => {
        dispatch({
            type: "addWisdom",
            data
        })
    };
        const updateCha = (data) => {
            dispatch({
                type: "addCharisma",
                data
            })
    };

    return (
        <CharacterContext.Provider 
            value={ {
                characterClasses,
                characterRaces,
                state,
                actions: {updateCharacterName, updateRace, updateClass, updateClassDetails, updateCharacterImage, updateStr, updateDex, updateCon, updateInt, updateWis, updateCha }
            }}
            >
                {children}
            </CharacterContext.Provider>
    );
};

export default CharacterProvidor;