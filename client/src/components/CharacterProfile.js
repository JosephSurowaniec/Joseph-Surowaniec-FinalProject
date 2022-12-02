import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FeedMessage from "./FeedMessage";
import { UserContext } from "./UserContext";
import dragonBornImage from "./dragonbornPlaceholder.jpg"
import {Image} from 'cloudinary-react';
import CharacterSkills from "./CharacterSkills";
import Features from "./Features";

const CharacterProfile = () => {

    const { profileName , loggedIn, userId} = useContext(UserContext);
    const {characterId} = useParams();
    const [specificCharacterInfo, setSpecificCharacterInfo] = useState("");
    const [formData, setFormData] = useState("");
    const [characterFeed, setCharacterFeed ] = useState("");
    const [currentSection, setCurrentSection ] = useState("General");
    const [currentSubSection, setCurrentSubSection ] = useState("Skills")

    const ModifierValues = {
        4: "-3", 5: "-3", 6: "-2", 7: "-2", 8: "-1", 9: "-1", 10: "0", 11: "0", 12: "+1", 13: "+1", 14: "+2", 15: "+2", 16: "+3", 17: "+3", 18: "+4", 19: "+4", 20: "+5"
    };

    useEffect(() => {
        console.log("check-in here")
        console.log(characterId)
        console.log(" second check-in here")
        if (characterId) {
            fetch(`/character/${characterId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSpecificCharacterInfo(data.data[0].characterInformation)
            })
            .catch((error) => {
                window.alert(error);
            });
        }
        
    }, [characterId]);

    useEffect(() => {
        fetch(`/characterFeed/${characterId}`)
        .then(res => res.json())
        .then(data => {
            setCharacterFeed(data.data);

        }).catch((error) => {
          console.log("The Character Feed Broke")
      })
    }, []);

    const showInfo = () => {
        console.log(specificCharacterInfo);
    };



    const handleChange = (value) => {
        setFormData(value)
      };

      const resetTextArea = () => {
        setFormData("");
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        resetTextArea();
        console.log("working");

        fetch("/characterFeed/addCharacterPost", {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({status : formData, characterId : characterId})
      })
          .then(res => {
              return res.json()
          })
          .then((data) => {
                fetch(`/characterFeed/${characterId}`)
                .then(res => res.json())
                .then(data => {
                    setCharacterFeed(data.data);
                    
                });
              })
          .catch((error) => {
            console.log("The MainFeed POST Broke");
          })

      };

      const testHomefeed = () => {
        console.log(characterFeed);
      };

      const setSection = (section) => {
        setCurrentSection(section);
      };

      const setSubSection = (subSection) => {
        setCurrentSubSection(subSection);
      };

    return (
        <Wrapper>
            {!specificCharacterInfo?<>Loading</>
            :
            <InnerWrapper>
                <ImageWrapper>
                    {specificCharacterInfo.characterImageId ?<Image cloudName="dfigamsk5" publicId={specificCharacterInfo.characterImageId} style={{height:300}}/>
                    :<Image cloudName="dfigamsk5" publicId="Testing_Setup/unknownadventurer_fuanqy" />}
                </ImageWrapper>
            <ScrollWrapper>
                <Banner>
                    <StyledChangeButton onClick={() => setSection("General")}>
                        General
                    </StyledChangeButton>
                    <StyledChangeButton onClick={() => setSection("Progress")}>
                        Progress
                    </StyledChangeButton>
                    <StyledChangeButton onClick={() => setSection("Comment")}>
                        Comment Section
                    </StyledChangeButton>
                </Banner>
                <ContentWrapper>
                    <SectionWrapper>   
                        {currentSection === "General"?
                        <CharacterInfoWrapper>
                        <TextWrapper>    
                            <TextDisplay>
                                Name: {specificCharacterInfo.characterName}
                            </TextDisplay>
                            <TextDisplay>
                                Class: <LevelSpan>Lv{specificCharacterInfo.level}</LevelSpan>{specificCharacterInfo.selectedClass.name}
                            </TextDisplay>
                            <TextDisplay>
                                Race: {specificCharacterInfo.selectedRace.name}
                            </TextDisplay>
                            <StatsWrapper>
                                Stats Location
                                <button onClick={showInfo}></button>
                                <StatBox>Strength <div>{specificCharacterInfo.modifiedAbilityScores.strength}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.strength]}</ModifierWrapper></StatBox>
                                <StatBox>Dex <div>{specificCharacterInfo.modifiedAbilityScores.dexterity}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.dexterity]}</ModifierWrapper></StatBox>
                                <StatBox>Con <div>{specificCharacterInfo.modifiedAbilityScores.constitution}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.constitution]}</ModifierWrapper></StatBox>
                                <StatBox>Int <div>{specificCharacterInfo.modifiedAbilityScores.intelligence}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.intelligence]}</ModifierWrapper></StatBox>
                                <StatBox>Wisdom <div>{specificCharacterInfo.modifiedAbilityScores.wisdom}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.wisdom]}</ModifierWrapper></StatBox>
                                <StatBox>Charisma <div>{specificCharacterInfo.modifiedAbilityScores.charisma}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.charisma]}</ModifierWrapper></StatBox>
                            </StatsWrapper>
                            
                        </TextWrapper>
                        <SubSectionWrapper>
                            <SubSectionButtonWrapper>
                                <StyledSubSectionButton onClick={() => setSubSection("Skills")}>
                                    Skills
                                    
                                </StyledSubSectionButton>
                                {/* <StyledSubSectionButton onClick={() => setSubSection("Equipment")}>
                                    Equipment
                                </StyledSubSectionButton>
                                <StyledSubSectionButton onClick={() => setSubSection("Spells")}>
                                    Spells
                                </StyledSubSectionButton> */}
                                <StyledSubSectionButton onClick={() => setSubSection("Features")}>
                                    Features
                                </StyledSubSectionButton>
                            </SubSectionButtonWrapper>
                            <TestWrapper>
                                {currentSubSection === "Skills"?<ChangedContent><CharacterSkills modifiers={ModifierValues} stats={specificCharacterInfo.abilityScores} /></ChangedContent>:<></>}
                                {/* {currentSubSection === "Equipment"?<div>This is the Equipment Tab</div>:<></>}
                                {currentSubSection === "Spells"?<div>This is the Spells Tab</div>:<></>} */}
                                {currentSubSection === "Features"?<ChangedContent><Features levelInfo ={specificCharacterInfo.classData} level={specificCharacterInfo.level}/></ChangedContent>:<></>}
                            </TestWrapper>
                            
                        </SubSectionWrapper>
                        </CharacterInfoWrapper>
                        :<></>}
                        {currentSection === "Progress" ?
                        <div>This is the to mark the progress of your Hero</div>
                        :<></>}
                        {currentSection === "Comment" ?
                            <div>
                            <Textbox>
                                    <MiniHeader>Character Chat</MiniHeader>
                                
                                    <form onSubmit={handleSubmit}>
                                    <StyledTextInput><StyledTextArea name="message" id="message" value={formData} placeholder="Comment on this Character" onChange={(e) => handleChange(e.target.value)} /></StyledTextInput>
                                    <InputArea>
                                        {
                                        formData.length > 80
                                            ?<>{formData.length > 100 ?<OverLimit>{100 - formData.length}</OverLimit> : <LessWords>{100 - formData.length}</LessWords>} </>
                                            :<CharacterCount>{100 - formData.length}</CharacterCount>
                                        }
                                        <StyledSubmit type="submit" disabled={formData.length > 100}>Submit</StyledSubmit>
                                    </InputArea>
                                    </form>
                                    
                                    
                                </Textbox>

                                <div>
                                    <button onClick={testHomefeed}></button>
                                    {!characterFeed[0]
                                    ?<div>Loading</div>
                                    :
                                    <>  
                                    <h1>Testing Area</h1>
                                    
                                    <StyledDiv>{characterFeed.map((feedDetails) => {
                                    return (
                                        
                                        <FeedArea key={Math.floor(Math.random()*140000000000000)}>
                                            <FeedMessage message={feedDetails.message} profileName={profileName} />
                                        </FeedArea>
                                        
                                    )
                                    
                                    })}</StyledDiv>
                                
                                </>
                                }
                                </div>
                            </div>
                            :<></>}
                        
                        </SectionWrapper>
                </ContentWrapper>
            </ScrollWrapper>
            
            </InnerWrapper>}
            
        </Wrapper>
    );
};

const Wrapper = styled.div`
border: 1px solid black;
margin: 25px;
height: 90vh;
`;
const InnerWrapper = styled.div`

margin: 25px;
display: flex;
height: 65%;
`;

const SectionWrapper = styled.div`
display: flex;
flex: 1;
`;
const LevelSpan = styled.span`
font-size: 15px;
`;
const ContentWrapper = styled.div`
display: flex;
flex: 1;
`;

const TestWrapper = styled.div`
flex: 1;
`;
const ChangedContent = styled.div`
height: 100%;
`;
const Banner = styled.div`
display: flex;
background-color: black;
color: white;
height: 7%;
`;
const StyledChangeButton = styled.button`
padding: 15px;
background-color: grey;
color: white;
flex: 1;
`;

const StyledSubSectionButton = styled.button`
padding: 15px;
background-color: black;
color: red;

`;
const SubSectionWrapper = styled.div`
display: flex;
flex: 1;
`
const SubSectionButtonWrapper = styled.div`
display: flex;
flex-direction: column;
background-color: black;
color: white;
`
const ImageWrapper = styled.div`

padding: 25px;
`;
const CharacterInfoWrapper = styled.div`
display: flex;
flex: 1;

`
const ScrollWrapper = styled.div`
display: flex;
flex-direction: column;
width: 75%;
`


const TextWrapper = styled.div`

padding: 25px;
width: 350px;
`;

const StatsWrapper = styled.div`
display: grid;
grid-template-columns: 25px 25px ;
grid-row-gap: 15px;
grid-column-gap: 10px;
align-items: center;
column-gap: 8rem;

`;
const StatBox = styled.div`
width: 100px;
height: 100px;
margin-top: 15px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
border-radius: 35px;
border: 4px solid #595959;
`;
const ModifierWrapper = styled.div`
border: 3px solid red;
border-radius: 25px;
padding: 5px;

`
const TextDisplay = styled.div`
font-size: 35px;
`
const Textbox = styled.div`
display: flex;
flex-direction: column;
border-bottom: 10px solid rgba(0, 0, 0, 0.15);
`;
const StyledTextInput=styled.div`

`
const MiniHeader = styled.div`
border-bottom: 1px solid rgba(0, 0, 0, 0.1);
padding: 8px 8px 8px 15px;
font-size: 25px;
font-weight: bold;
`;


const LessWords = styled.h3`
font-size: 15px;
color: rgba(215, 165, 0, 0.92);

`;
const OverLimit = styled.h3`
font-size: 15px;
color: red;

`;

const FeedArea = styled.div`
display: flex;
justify-content: center;
margin: 5px;
padding: 5px;
`;

const CharacterCount = styled.h3`
font-size: 15px;
opacity: 50%;
`
const StyledTextArea = styled.textarea`

  width: 500px;
  height: 150px;
  padding: 10px 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  resize: none;
  font-size: 18px;
  :focus {
    outline: none;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
} 
  ::-webkit-scrollbar-thumb {
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.10);
} 
::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.15);
} 
`;

const InputArea = styled.div`
display: flex;
justify-content: flex-end;
padding: 0px 50px 0px 15px;
align-items: center;
`
const StyledSubmit = styled.button`
height: 35px;
background-color: pink;
padding: 2px 15px 2px 15px;
color: white;
font-size: 15px;
font-weight: bold;
border: none;
border-radius: 25px;
margin-left: 15px;
:hover {
  cursor: pointer;
}
:disabled {
  background-color: grey;
}
`;

const StyledDiv = styled.div`
  
  display: flex;
  flex-direction: column-reverse;
  `;
export default CharacterProfile;