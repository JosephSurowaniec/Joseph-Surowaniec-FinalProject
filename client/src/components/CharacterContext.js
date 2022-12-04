import { createContext, useEffect, useState, useReducer } from "react";


export const CharacterContext = createContext(null);

const initialState = {
    characterName: "",
    selectedClass: "",
    selectedRace: "",
    classData:"",
    characterImageId: "",
    level:"",
    abilityScores:{
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8
    },
    modifiedAbilityScores:{
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8
    },
    assignedPoints:{
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    }
};

const reducer = (state, action) => {

    switch(action.type) {

        case "resetCharacter": {
            return {
                ...state,
                characterName: "",
                selectedClass: "",
                selectedRace: "",
                classData:"",
                characterImageId: "",
                level:"",
                abilityScores:{
                    strength: 8,
                    dexterity: 8,
                    constitution: 8,
                    intelligence: 8,
                    wisdom: 8,
                    charisma: 8
                },
                modifiedAbilityScores:{
                    strength: 8,
                    dexterity: 8,
                    constitution: 8,
                    intelligence: 8,
                    wisdom: 8,
                    charisma: 8
                },
                assignedPoints:{
                    strength: 0,
                    dexterity: 0,
                    constitution: 0,
                    intelligence: 0,
                    wisdom: 0,
                    charisma: 0
                }
            }
        }

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
        case "addStrengthPoints": {
            return {
                ...state,
                assignedPoints: {...state.assignedPoints, strength: action.data}
                
            }
        }
        case "addDexterityPoints": {
            return {
                ...state,
                assignedPoints:{...state.assignedPoints, dexterity: action.data}

            }
        }
        case "addConstitutionPoints": {
            return {
                ...state,
                assignedPoints:{...state.assignedPoints, constitution: action.data}

            }
        }
        case "addIntelligencePoints": {
            return {
                ...state,
                assignedPoints:{...state.assignedPoints, intelligence: action.data}

            }
        }
        case "addWisdomPoints": {
            return {
                ...state,
                assignedPoints:{...state.assignedPoints, wisdom: action.data}

            }
        }
        case "addCharismaPoints": {
            return {
                ...state,
                assignedPoints:{...state.assignedPoints, charisma: action.data}

            }
        }
        case "addLevel": {
            return {
                ...state,
                level: action.data
            }
        }
        case "updateModStats": {
            return {
                ...state,
                modifiedAbilityScores:{...state.modifiedAbilityScores,
                                        strength: action.data.str,
                                        dexterity: action.data.dex,
                                        constitution: action.data.con,
                                        intelligence: action.data.int,
                                        wisdom: action.data.wis,
                                        charisma: action.data.cha}

            }
        }

        case "getCharacter": {
            return {
                ...state,
                characterName: action.data.characterName,
                selectedClass: action.data.selectedClass,
                selectedRace: action.data.selectedRace,
                classData: action.data.classData,
                characterImageId: action.data.characterImageId,
                level: action.data.level,
                // abilityScores:{
                //     strength: action.data.abilityScores.strength,
                //     dexterity: action.data.abilityScores.dexterity,
                //     constitution: action.data.abilityScores.constitution,
                //     intelligence: action.data.abilityScores.intelligence,
                //     wisdom: action.data.abilityScores.wisdom,
                //     charisma: action.data.abilityScores.charisma
                // },
                // modifiedAbilityScores:{
                //     strength: action.data.modifiedAbilityScores.strength,
                //     dexterity: action.data.modifiedAbilityScores.dexterity,
                //     constitution: action.data.modifiedAbilityScores.constitution,
                //     intelligence: action.data.modifiedAbilityScores.intelligence,
                //     wisdom: action.data.modifiedAbilityScores.wisdom,
                //     charisma: action.data.modifiedAbilityScores.charisma
                // },
                // assignedPoints:{
                //     strength: action.data.assignedPoints.strength,
                //     dexterity: action.data.assignedPoints.dexterity,
                //     constitution: action.data.assignedPoints.constitution,
                //     intelligence: action.data.assignedPoints.intelligence,
                //     wisdom: action.data.assignedPoints.wisdom,
                //     charisma: action.data.assignedPoints.charisma
                // }
            }
        }
        case "getCharacterAbilityScores": {
            return {
                ...state,
                // abilityScores:{
                //     strength: action.data.abilityScores.strength,
                //     dexterity: action.data.abilityScores.dexterity,
                //     constitution: action.data.abilityScores.constitution,
                //     intelligence: action.data.abilityScores.intelligence,
                //     wisdom: action.data.abilityScores.wisdom,
                //     charisma: action.data.abilityScores.charisma
                // },
                // modifiedAbilityScores:{
                //     strength: action.data.modifiedAbilityScores.strength,
                //     dexterity: action.data.modifiedAbilityScores.dexterity,
                //     constitution: action.data.modifiedAbilityScores.constitution,
                //     intelligence: action.data.modifiedAbilityScores.intelligence,
                //     wisdom: action.data.modifiedAbilityScores.wisdom,
                //     charisma: action.data.modifiedAbilityScores.charisma
                // },
                // assignedPoints:{
                //     strength: action.data.assignedPoints.strength,
                //     dexterity: action.data.assignedPoints.dexterity,
                //     constitution: action.data.assignedPoints.constitution,
                //     intelligence: action.data.assignedPoints.intelligence,
                //     wisdom: action.data.assignedPoints.wisdom,
                //     charisma: action.data.assignedPoints.charisma
                // }
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

    const resetCharacterData = (data) => {
        dispatch({
            type: "resetCharacter",
            data
        })
    };

    const getCharacterData = (data) => {
        dispatch({
            type: "getCharacter",
            data
        })
    };
    const getCharacterAbilityScores = (data) => {
        dispatch({
            type: "getCharacterAbilityScores",
            data
        })
    };
    
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
    const updateStrPoints = (data) => {
        dispatch({
            type: "addStrengthPoints",
            data
        })
    };
        const updateDexPoints = (data) => {
            dispatch({
                type: "addDexterityPoints",
                data
            })
    };
    const updateConPoints = (data) => {
        dispatch({
            type: "addConstitutionPoints",
            data
        })
    };
        const updateIntPoints = (data) => {
            dispatch({
                type: "addIntelligencePoints",
                data
            })
    };
    const updateWisPoints = (data) => {
        dispatch({
            type: "addWisdomPoints",
            data
        })
    };
        const updateChaPoints = (data) => {
            dispatch({
                type: "addCharismaPoints",
                data
            })
    };
    const updateLevel = (data) => {
        dispatch({
            type: "addLevel",
            data
        })
};
    const updateModifiedStats = (data) => {
        dispatch({
            type: "updateModStats",
            data
        })
};

    return (
        <CharacterContext.Provider 
            value={ {
                characterClasses,
                characterRaces,
                state,
                actions: {updateCharacterName,
                            updateRace,
                            updateClass, 
                            updateClassDetails, 
                            updateCharacterImage, 
                            updateStr, updateDex, updateCon, updateInt, updateWis, updateCha,
                            updateStrPoints, updateDexPoints, updateConPoints, updateIntPoints, updateWisPoints, updateChaPoints,  
                            updateModifiedStats,
                            updateLevel,
                            resetCharacterData,
                            getCharacterData, getCharacterAbilityScores }
            }}
            >
                {children}
            </CharacterContext.Provider>
    );
};

export default CharacterProvidor;