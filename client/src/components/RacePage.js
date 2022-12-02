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
                    <StyledRaceName>{raceInfo.name}</StyledRaceName>
                    <StyledRaceDetails>{raceInfo.alignment}</StyledRaceDetails>
                    <RaceSpecificsWrapper>
                        <span>Race Bonuses</span>
                    <StyledRaceAbilities>{raceInfo.traits.map((element) => {
                        return(
                            <div key={Math.floor(Math.random() * 1700000000)}>
                                <div>{element.name}</div>
                            </div>
                        )
                    })}</StyledRaceAbilities>
                    </RaceSpecificsWrapper>
                    <RaceSpecificsWrapper>
                        <span>Race Bonuses</span>
                        <StyledRaceBonus>{raceInfo.ability_bonuses.map((element) => {
                        return(
                            <div key={Math.floor(Math.random() * 1700000000)}>
                                <div>{element.ability_score.name} has a bonus of {element.bonus}</div>
                            </div>
                        )
                    })}</StyledRaceBonus>
                    </RaceSpecificsWrapper>
                    
                    <StyledConfirmButton  onClick={submitRace}>Confirm Race</StyledConfirmButton>
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
height: auto;
display: flex;
flex-direction: column;
align-items: center;
box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
background-color: #ffff;
color: #000;
display: flex;
position: relative;
z-index: 10;
border-radius: 10px;
`;

const StyledRaceName = styled.div`
margin: 55px 25px 25px 25px;
border-bottom: 1px solid red;
font-size: 35px;
`;

const StyledRaceDetails = styled.div`
padding: 35px;
border: 1px solid #595959;
background-color: #e5e5e5;
margin: 0px 25px 25px 25px;
border-radius: 15px;
`;

const StyledRaceAbilities = styled.div`
padding: 35px;
border: 1px solid #595959;
background-color: #e5e5e5;
margin: 0px 25px 25px 25px;
border-radius: 15px;
`;

const RaceSpecificsWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const StyledRaceBonus = styled.div`
padding: 35px;
border: 1px solid #595959;
background-color: #e5e5e5;
margin: 0px 25px 25px 25px;
border-radius: 15px;
`;

const StyledConfirmButton = styled.button`
padding: 15px;
border-radius: 25px;
margin: 25px;
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