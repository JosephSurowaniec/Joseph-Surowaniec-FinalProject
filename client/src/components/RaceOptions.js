import { useEffect, useState } from "react";
import styled from "styled-components";
import RacePage from "./RacePage";

const RaceOptions = (raceDetails) => {
    const [raceInfo , setRaceInfo] = useState("");
    const [showModal , setShowModal] = useState(false);

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
        :
        <div>
            <StyledButtons onClick={handleDisplayRace}>{raceDetails.name}</StyledButtons>
            <RacePage showModal={showModal} setShowModal={setShowModal} raceInfo={raceInfo}/>
        </div>
        
    )
}


const StyledButtons = styled.button`
padding: 25px;
margin: 5px;
border: 2px solid black;
border-radius: 15px;
`
export default RaceOptions;