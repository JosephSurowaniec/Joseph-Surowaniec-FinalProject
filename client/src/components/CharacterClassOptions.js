import { useContext } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";
import { UserContext } from "./UserContext";
import ClassOptions from "./ClassOptions";

const CharacterClassOptions = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);

    return (

        <Wrapper>
            <StyledHeader>Choose the Class of your Character</StyledHeader>
            <ContentWrapper>
            {!characterClasses?<h1>Loading</h1>
                        :characterClasses.results.map((element => {
                        return (
                            <div key={Math.floor(Math.random() * 1700000000)}>
                                <ClassOptions index={element.index} name={element.name}/>
                            </div>
                        )
                    }))}
            </ContentWrapper>
        </Wrapper>
        
    );
};
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const StyledHeader= styled.h2`
color: #e5e5e5;
`;
const ContentWrapper = styled.div`

display: grid;
grid-template-columns: 250px 250px 250px ;
align-items: center;
justify-content: center;

`;
export default CharacterClassOptions;