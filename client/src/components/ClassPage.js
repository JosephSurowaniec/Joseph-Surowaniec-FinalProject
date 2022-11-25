import { useContext } from "react";
import styled from "styled-components"
import { CharacterContext } from "./CharacterContext";


const ClassPage = ({ showModal, setShowModal, classInfo, classAbilities}) => {
    const {actions} = useContext(CharacterContext);

    const submitClass = (e) => {
        e.preventDefault();
        actions.updateClass(classInfo);
        actions.updateClassDetails(classAbilities);
    };

    const checkData = () => {
        console.log(classAbilities)
    }

    return(
        <div>
            {showModal ? 
            <Background>
                <ModalWrapper showModal={showModal}>
                    <ScrollArea>{classInfo.name}
                    <div>
                        {classAbilities.map((element) => {
                            return(
                                <div key={Math.floor(Math.random() * 1700000000)}>
                                    <div>{element.level}</div>
                                    <div>{element.features.map((el) => {
                                        return(
                                            <div key={Math.floor(Math.random() * 1700000000)}>{el.name}</div>
                                        )
                                    })}</div>
                                </div>
                            )
                        })}
                    </div>
                    </ScrollArea>
                    <button onClick={submitClass}>Click me</button>
                    <StyledButton onClick={() => setShowModal(prev => !prev)}>Exit</StyledButton>        
                </ModalWrapper>
                
            </Background> 
            :null}
        </div>
    )
}

const Background = styled.div`
width: 100%;
height: 100%;
top: 0;
left: 0;
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
position: fixed;
display: flex;
justify-content: center;
align-items: center;
z-index: 100;
`;

const ModalWrapper = styled.div`
width: 45%;
height: 45%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
background-color: #ffff;
color: #000;
display: flex;
position: relative;
z-index: 10;
border-radius: 10px;
`;

const ScrollArea = styled.div`
overflow-y: scroll;
`;
const StyledButton = styled.button`
padding: 15px;
border-radius: 25px;
position: absolute;
right: 0;
top: 0;
margin: 25px;
`;


export default ClassPage;