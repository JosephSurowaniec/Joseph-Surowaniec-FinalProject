import { useContext } from "react";
import styled from "styled-components"
import { CharacterContext } from "./CharacterContext";


const RacePage = ({ showModal, setShowModal, raceInfo}) => {
    const {actions} = useContext(CharacterContext);

    const submitRace = (e) => {
        e.preventDefault();
        actions.updateRace(raceInfo)
    };

    return(
        <div>
            {showModal ? 
            <Background>
                <ModalWrapper showModal={showModal}>
                    <div>{raceInfo.name}</div>
                    <div>{raceInfo.alignment}</div>
                    <div>{raceInfo.traits.map((element) => {
                        return(
                            <div key={Math.floor(Math.random() * 1700000000)}>
                                <div>{element.name}</div>
                            </div>
                        )
                    })}</div>
                    <div>{raceInfo.ability_bonuses.map((element) => {
                        return(
                            <div key={Math.floor(Math.random() * 1700000000)}>
                                <div>{element.ability_score.name} has a bonus of {element.bonus}</div>
                            </div>
                        )
                    })}</div>
                    <button  onClick={submitRace}>Confirm Race</button>
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
const StyledButton = styled.button`
padding: 15px;
border-radius: 25px;
position: absolute;
right: 0;
top: 0;
margin: 25px;
`;


export default RacePage;