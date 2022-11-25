import { useEffect, useState } from "react";
import styled from "styled-components";
import ClassPage from "./ClassPage";
// import RacePage from "./RacePage";

const ClassOptions = (classDetails) => {
    const [classInfo , setClassInfo] = useState("");
    const [classAbilities , setClassAbilities] = useState("");
    const [showModal , setShowModal] = useState(false);

    const handleDisplayClass = () => {
        setShowModal(prev => !prev)
    };

    useEffect(() => {
        fetch(`https://www.dnd5eapi.co/api/classes/${classDetails.index}`)
            .then((res) => res.json())
            .then((data) => {
                setClassInfo(data)
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
        
            fetch(`https://www.dnd5eapi.co/api/classes/${classDetails.index}/levels`)
            .then((res) => res.json())
            .then((data) => {
                setClassAbilities(data)
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
    }, []);


    return(
        !classInfo
        ?<h1>Loading</h1>
        :
        <div>
            <StyledButtons onClick={handleDisplayClass}>{classDetails.name}</StyledButtons>
            <ClassPage showModal={showModal} setShowModal={setShowModal} classInfo={classInfo} classAbilities={classAbilities}/>
        </div>
        
    )
}


const StyledButtons = styled.button`
padding: 25px;
margin: 5px;
border: 2px solid black;
border-radius: 15px;
`
export default ClassOptions;