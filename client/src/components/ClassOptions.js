import { useEffect, useState } from "react";
import styled from "styled-components";
import ClassPage from "./ClassPage";
// import RacePage from "./RacePage";

const ClassOptions = (classDetails) => {
    const [classInfo , setClassInfo] = useState("");
    const [classAbilities , setClassAbilities] = useState("");
    const [showModal , setShowModal] = useState(false);
    const [testClass , setTestClass] = useState("");

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

    const testNewAPi = () => {
        console.log(testClass);
        console.log(classInfo);
    };

    return(
        !classInfo
        ?<h1>Loading</h1>
        :
        <ClassWrapper>
            <ButtonWrapper>
                <StyledButtons onClick={handleDisplayClass}>{classDetails.name}</StyledButtons>
            </ButtonWrapper>
            
            {/* <button onClick={testNewAPi}>Click</button> */}
            <ClassPage showModal={showModal} setShowModal={setShowModal} classInfo={classInfo} classAbilities={classAbilities}/>
        </ClassWrapper>
        
    )
}

const ClassWrapper = styled.div`


border-bottom: 3px solid #cc444b;
display: flex;
justify-content: center;
background-color: #e5e5e5;
margin: 5px;
border-radius: 15px;
`;
const ButtonWrapper = styled.div`
/* border-bottom: 2px solid #cc444b; */
`;
const StyledButtons = styled.button`
padding: 25px;
margin: 5px;
border: none;
background: none;
border-radius: 15px;
font-size: 25px;
`;
export default ClassOptions;