import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";
import RacePage from "./RacePage";

const RaceOptions = (raceDetails) => {
    const [raceInfo , setRaceInfo] = useState("");
    const [showModal , setShowModal] = useState(false);
    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );

    const handleDisplayRace = () => {
        setShowModal(prev => !prev)
    };

    useEffect(() => {
        fetch(`https://www.dnd5eapi.co/api/races/${raceDetails.index}`)
            .then((res) => res.json())
            .then((data) => {
                setRaceInfo(data)
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
    }, []);

    const seeDetails = () => {
        console.log(raceInfo);
    }

    return(
        !raceInfo
        ?<h1>Loading</h1>
        :<RaceWrapper>
            <ButtonWrapper>
                <StyledButtons onClick={handleDisplayRace}>{raceDetails.name}</StyledButtons>
            </ButtonWrapper>
            
            <RacePage showModal={showModal} setShowModal={setShowModal} raceInfo={raceInfo}/>
        </RaceWrapper>
        
        
    )
}


const StyledButtons = styled.button`
padding: 25px;
margin: 5px;
border: none;
background: none;
border-radius: 15px;
font-size: 25px;
`;
const ButtonWrapper = styled.div`
/* border-bottom: 2px solid #cc444b; */
`;
const RaceWrapper = styled.div`
/* clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%); */

border-bottom: 3px solid #7c98b3;
display: flex;
justify-content: center;
background-color: #e5e5e5;
margin: 5px;
border-radius: 15px;
`;

export default RaceOptions;