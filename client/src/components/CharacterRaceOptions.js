import { useContext } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";
import { UserContext } from "./UserContext";
import RaceOptions from "./RaceOptions";

const CharacterRaceOptions = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);

    return (
        <Wrapper>
            <StyledHeader>Choose the Race of your Character</StyledHeader>
            <ContentWrapper>
            
            {!characterRaces?<div>Loading</div>
                        :characterRaces.results.map((element => {
                        return (
                            <div key={Math.floor(Math.random() * 1700000000)}>
                                <RaceOptions index={element.index} name={element.name}/>
                            </div>
                        )
                    }))}
            </ContentWrapper>
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const ContentWrapper = styled.div`

display: grid;
grid-template-columns: 250px 250px 250px ;
align-items: center;
justify-content: center;

`;
const StyledHeader= styled.h2`
color: #e5e5e5;
`;
export default CharacterRaceOptions;