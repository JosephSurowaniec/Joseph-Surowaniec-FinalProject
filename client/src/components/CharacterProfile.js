import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FeedMessage from "./FeedMessage";
import { UserContext } from "./UserContext";
import {Image} from 'cloudinary-react';
import CharacterSkills from "./CharacterSkills";
import Features from "./Features";
import Achievement from "./Achievement";

const CharacterProfile = () => {

    const { profileName , loggedIn, userId} = useContext(UserContext);
    const {characterId} = useParams();
    const [specificCharacterInfo, setSpecificCharacterInfo] = useState("");
    const [userCharacter, setUserCharacter] = useState("");
    const [formData, setFormData] = useState("");
    const [progressionData, setProgressionData] = useState("");
    const [characterFeed, setCharacterFeed ] = useState("");
    const [progressFeed , setProgressFeed] = useState("");
    const [currentSection, setCurrentSection ] = useState("General");
    const [currentSubSection, setCurrentSubSection ] = useState("Skills")
    const navigate = useNavigate();

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
                setSpecificCharacterInfo(data.data[0].characterInformation);
                setUserCharacter(data.data[0].userId)
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
      });

      fetch(`/characterFeed/progression/${characterId}`)
                .then(res => res.json())
                .then(data => {
                    setProgressFeed(data.data);
                    
                }).catch((error) => {
          console.log("The Character Feed Broke")
      });

    }, []);

    const showInfo = () => {
        console.log(specificCharacterInfo);
    };

    const handleEditNav = () => {
        navigate(`/character/edit/${characterId}`)
      };


    const handleChange = (value) => {
        setFormData(value)
      };

      const handleChangeProgression = (value) => {
        setProgressionData(value)
      };

      const resetTextArea = () => {
        setFormData("");
      };

      const resetTextArea2 = () => {
        setProgressionData("");
      };

      const handleSubmitProgression = (e) => {
        e.preventDefault();
        resetTextArea2();
        console.log("working");

        fetch("/characterFeed/addProgressPost", {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({status : progressionData, characterId : characterId , profileName : profileName})
      })
          .then(res => {
              return res.json()
          })
          .then((data) => {
                fetch(`/characterFeed/progression/${characterId}`)
                .then(res => res.json())
                .then(data => {
                    setProgressFeed(data.data);
                    
                });
              })
          .catch((error) => {
            console.log("The MainFeed POST Broke");
          })

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
          body: JSON.stringify({status : formData, characterId : characterId , profileName : profileName})
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

      const testProgressfeed = () => {
        console.log(profileName);
        console.log(userId);
        console.log(userCharacter);
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
                    {specificCharacterInfo.characterImageId ?<StyledImage cloudName="dfigamsk5" publicId={specificCharacterInfo.characterImageId} />
                    :<StyledImage cloudName="dfigamsk5" publicId="Testing_Setup/unknownadventurer_fuanqy" />}
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
                            <div>
                                <TextDisplay>
                                    Name: {specificCharacterInfo.characterName}
                                </TextDisplay>
                                <TextDisplay>
                                    Class: {specificCharacterInfo.selectedClass.name}<LevelSpan>Lv{specificCharacterInfo.level}</LevelSpan>
                                </TextDisplay>
                                <TextDisplay>
                                    Race: {specificCharacterInfo.selectedRace.name}
                                </TextDisplay>
                            </div>    
                            
                            <StatsWrapper>
                                {/* Stats Location
                                <button onClick={showInfo}></button> */}
                                <StatBox>Strength <div>{specificCharacterInfo.modifiedAbilityScores.strength}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.strength]}</ModifierWrapper></StatBox>
                                <StatBox>Dex <div>{specificCharacterInfo.modifiedAbilityScores.dexterity}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.dexterity]}</ModifierWrapper></StatBox>
                                <StatBox>Con <div>{specificCharacterInfo.modifiedAbilityScores.constitution}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.constitution]}</ModifierWrapper></StatBox>
                                <StatBox>Int <div>{specificCharacterInfo.modifiedAbilityScores.intelligence}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.intelligence]}</ModifierWrapper></StatBox>
                                <StatBox>Wisdom <div>{specificCharacterInfo.modifiedAbilityScores.wisdom}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.wisdom]}</ModifierWrapper></StatBox>
                                <StatBox>Charisma <div>{specificCharacterInfo.modifiedAbilityScores.charisma}</div><ModifierWrapper>{ModifierValues[specificCharacterInfo.modifiedAbilityScores.charisma]}</ModifierWrapper></StatBox>
                            </StatsWrapper>
                       
                            {userId === userCharacter?<StyledEditCharacterButton onClick={handleEditNav}>Edit Character</StyledEditCharacterButton>:<></>}
                         
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
                            <StyledCommentSection>
                            {userId === userCharacter?<Textbox>
                                {/* <button onClick={testProgressfeed}>Click to see names</button> */}
                                    <MiniHeader>Progression Chat</MiniHeader>
                                
                                    <StyledForm onSubmit={handleSubmitProgression}>
                                    <StyledTextInput><StyledTextArea name="message" id="message" value={progressionData} placeholder="Comment on this Character" onChange={(e) => handleChangeProgression(e.target.value)} /></StyledTextInput>
                                    <InputArea>
                                        {
                                        progressionData.length > 80
                                            ?<>{progressionData.length > 100 ?<OverLimit>{100 - progressionData.length}</OverLimit> : <LessWords>{100 - progressionData.length}</LessWords>} </>
                                            :<CharacterCount>{100 - progressionData.length}</CharacterCount>
                                        }
                                        <StyledSubmit type="submit" disabled={progressionData.length > 100}>Submit</StyledSubmit>
                                    </InputArea>
                                    </StyledForm>
                                </Textbox>
                                :<></>}

                                <PersonalCommentSection>
                                    {/* <button onClick={testProgressfeed}></button> */}
                                    {!progressFeed
                                    ?<div>Loading</div>
                                    :!progressFeed[0]
                                    ?<>Nothing Posted Yet</>
                                    :<>
                                    <StyledDiv>{progressFeed.map((feedDetails) => {
                                    return (
                                        
                                        <FeedArea key={Math.floor(Math.random()*140000000000000)}>
                                            <FeedMessage message={feedDetails.message} profileName={profileName} userId={feedDetails.userId} displayName={feedDetails.displayName} />
                                        </FeedArea>
                                        
                                    )
                                    
                                    })}</StyledDiv>
                                
                                </>
                                }
                                </PersonalCommentSection>
                            </StyledCommentSection>

                        :<></>}
                        {currentSection === "Comment" ?
                            <StyledCommentSection>
                            <Textbox>
                                    <MiniHeader>Character Chat</MiniHeader>
                                
                                    <StyledForm onSubmit={handleSubmit}>
                                    <StyledTextInput><StyledTextArea name="message" id="message" value={formData} placeholder="Comment on this Character" onChange={(e) => handleChange(e.target.value)} /></StyledTextInput>
                                    <InputArea>
                                        {
                                        formData.length > 80
                                            ?<>{formData.length > 100 ?<OverLimit>{100 - formData.length}</OverLimit> : <LessWords>{100 - formData.length}</LessWords>} </>
                                            :<CharacterCount>{100 - formData.length}</CharacterCount>
                                        }
                                        <StyledSubmit type="submit" disabled={formData.length > 100}>Submit</StyledSubmit>
                                    </InputArea>
                                    </StyledForm>
                                    
                                    
                                </Textbox>

                                <PersonalCommentSection>
                                
                                    {/* <button onClick={testHomefeed}></button> */}
                                    {!characterFeed
                                    ?<div>Loading</div>
                                    :!characterFeed[0]
                                    ?<>Nothing Posted Yet</>
                                    :
                                    <>
                                    <StyledDiv>{characterFeed.map((feedDetails) => {
                                    return (
                                        
                                        <FeedArea key={Math.floor(Math.random()*140000000000000)}>
                                            <FeedMessage message={feedDetails.message} profileName={profileName} userId={feedDetails.userId} displayName={feedDetails.displayName} />
                                        </FeedArea>
                                        
                                    )
                                    
                                    })}</StyledDiv>
                                
                                </>
                                }
                                </PersonalCommentSection>
                            </StyledCommentSection>
                            :<></>}
                        
                        </SectionWrapper>
                </ContentWrapper>
            </ScrollWrapper>
            
            </InnerWrapper>}
            
        </Wrapper>
    );
};

const Wrapper = styled.div`

padding: 50px;
margin: 25px;
min-height: 100vh;
border-right: 1px solid rgba(35, 35, 35, 0.2);
border-left: 1px solid rgba(35, 35, 35, 0.2);
`;
const InnerWrapper = styled.div`
margin: 25px;
display: flex;
height: 65%;
`;
const StyledEditCharacterButton = styled.button`
padding: 15px;
background: #e5e5e5;
border: none;
border-radius: 15px;
position: absolute;
top: 5px;
right: 5px;
:hover {
    cursor: pointer;
    background: #accbe1;
}
`;
const StyledImage = styled(Image)`
border-radius: 15px;
max-width: 400px;
`;
const PersonalCommentSection = styled.div`
padding: 25px;
display: flex;
flex-direction: column;
align-items: center;
height: 70%;
width: auto;
overflow-y: auto;
`;
const SectionWrapper = styled.div`
display: flex;
flex: 1;
`;
const LevelSpan = styled.span`
font-size: 25px;
margin-left: 15px;
font-weight: bold;
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
background-color: #e5e5e5;
padding-left: 25px;
`;
const Banner = styled.div`
display: flex;
background-color: #595959;
color: white;
height: 55px;
`;
const StyledChangeButton = styled.button`
padding: 15px;
font-size: 25px;
background-color: #595959;
color: white;
flex: 1;
height: 55px;
:hover {
    background-color: #7c98b3;
    cursor: pointer;
}
`;

const StyledSubSectionButton = styled.button`
border: none;
margin-bottom: 5px;
padding: 15px;
background-color: #595959;
color: #e5e5e5;
font-size: 20px;
font-weight: bold;
border-bottom: 2px solid #cc444b;
:hover {
    background-color: #cc444b;
    cursor: pointer;
}
`;
const SubSectionWrapper = styled.div`
display: flex;
flex: 1;
`
const SubSectionButtonWrapper = styled.div`
display: flex;
flex-direction: column;
background-color: #7c98b3;
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
width: 450px;
display: flex;
flex-direction: column;
border-left: 1px solid rgba( 35, 35 ,35 , 0.2);
border-bottom: 1px solid rgba( 35, 35 ,35 , 0.2);
align-items: center;
padding-top: 50px;
position: relative;
button {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
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
`;

const StyledCommentSection = styled.div`
display: flex;
justify-content: center;
margin: 0 auto;
padding-top: 10px;
`;
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
background-color: #cc444b;
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

const StyledForm = styled.form`
border-bottom: 10px solid rgba(0, 0, 0, 0.15);
`;
const StyledDiv = styled.div`
  
  display: flex;
  flex-direction: column-reverse;
  `;
export default CharacterProfile;