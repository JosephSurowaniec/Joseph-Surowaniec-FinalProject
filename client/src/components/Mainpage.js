import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import FeedMessage from "./FeedMessage";
import CharacterFeed from "./CharacterFeed";

const MainPage = () => {
    const { profileName , loggedIn, userId} = useContext(UserContext)
    const { user, isAuthenticated } = useAuth0();
    const [getInfo, setGetInfo] = useState(false);
    const [formData, setFormData] = useState("");
    const [ homeFeed, setHomeFeed ] = useState("");
    const [userCharacters , setUserCharacters] = useState("");
    const [postCharacter , setPostCharacter] = useState("");

    useEffect(() => {

        fetch(`/homefeed`)
        .then(res => res.json())
        .then(data => {
            setHomeFeed(data.data);
            setGetInfo(true);

        }).catch((error) => {
          console.log("The MainFeed Broke")
      });

    }, []);

    useEffect(() => {

      if (isAuthenticated) {

        fetch(`/profile/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUserCharacters(data.data);
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
      }

    }, [getInfo]);

    const handleLogIn = () => {
        console.log(homeFeed);
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

        fetch("/homefeed/addPost", {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({status : formData, userId : userId, characterId : postCharacter , profileName : profileName})
      })
          .then(res => {
              return res.json()
          })
          .then((data) => {
                fetch("/homefeed")
                .then(res => res.json())
                .then(data => {
                    setHomeFeed(data.data);
                    
                });
              })
          .catch((error) => {
            console.log("The MainFeed POST Broke");
          })

      };

      const testHomefeed = () => {
        console.log(homeFeed);
      };

      const handlePostedCharacter = (data) => { 
        console.log(data);
        setPostCharacter(data);
      };

      const checkVitals = () => {
        console.log(postCharacter);
        console.log(userCharacters);
      }

    return(
            <Wrapper>
                {/* This is the Homepage
                <button onClick={handleLogIn}>CHeck vitals</button> */}
                {/* {!isAuthenticated ?<></>:<>{profileName} is logged In. Have Fun!</>} */}
                {isAuthenticated ?<div>
                    <Textbox>
                        <MiniHeader>Home</MiniHeader>
                        {/* <button onClick={checkVitals}>
                              Testing User Character
                          </button> */}
                        
                        <form onSubmit={handleSubmit}>
                        <StyledTextInput>
                          <div>
                            <StyledTextArea name="message" id="message" value={formData} placeholder="Share Your Characters!" onChange={(e) => handleChange(e.target.value)} />
                          <InputArea>
                            {
                            formData.length > 224
                                ?<>{formData.length > 150 ?<OverLimit>{150 - formData.length}</OverLimit> : <LessWords>{150 - formData.length}</LessWords>} </>
                                :<CharacterCount>{150 - formData.length}</CharacterCount>
                            }
                            <StyledSubmit type="submit" disabled={formData.length > 150}>Submit</StyledSubmit>
                        </InputArea>
                          </div>
                          
                          <DisplaySelectedCharacter>
                            {userCharacters?userCharacters.filter((el) => {
                                return(
                                  el._id === postCharacter
                                  )}).map((element) => {
                                    return(
                                      <div key={Math.floor(Math.random()*140000000000000)}>
                                        <CharacterFeed characterDetails={element.characterInformation} characterId={element._id}/>
                                      </div>
                                      
                                    )
                                  }):<div>No Character Chosen</div>}

                          </DisplaySelectedCharacter>

                        </StyledTextInput>
                        
                        </form>
                        <CharacterSelecterWrapper>
                            <AddCharacterHeader>Choose a character to add to your post</AddCharacterHeader>
                            <CharacterDiv>
                              {userCharacters?<CharacterForm>
                                <CharacterOption value={postCharacter} onChange={(e) => {handlePostedCharacter(e.target.value)} }>
                                  <option value={""}>Select a character</option>
                                  {userCharacters.map((element) => {
                                    return (
                                      <option key={Math.floor(Math.random()*140000000000000)} value={element._id}>
                                        {element.characterInformation.characterName}
                                      </option>
                                    )
                                  })}
                                </CharacterOption>
                              </CharacterForm>
                              :<></>}
                            </CharacterDiv>
                            
                          </CharacterSelecterWrapper>
                        
                        
                    </Textbox>

                    
                    
                </div>
                
                :<>You must be Logged in to Post</>}
                <div>
                        {/* <button onClick={testHomefeed}></button> */}
                        {!homeFeed[0]
                        ?<div>Loading</div>
                        :
                        <>
                        <GeneralChatHeaderDiv>
                          <GeneralChatHeader>General Chat</GeneralChatHeader>
                        </GeneralChatHeaderDiv>  
                        
                        
                        <StyledDiv>
                          <StyledDiv2>
                          {homeFeed.map((feedDetails) => {
                        return (
                            
                            <FeedArea key={Math.floor(Math.random()*140000000000000)}>
                                <FeedMessage message={feedDetails.message} character={feedDetails.character} userId={feedDetails.userId} displayName={feedDetails.userDisplayName} />
                            </FeedArea>
                            
                        )
                        
                        })}
                          </StyledDiv2>
                        </StyledDiv>
                    
                    </>
                    }
                    </div>
            </Wrapper>
        )
        
    
};

const CharacterDiv = styled.div`
width: 100%;
display: flex;
justify-content: center;
padding: 5px;
`;
const CharacterForm = styled.form`
width: 100%;
display: flex;
justify-content: center;
`;
const CharacterOption = styled.select`
width: 95%;
margin: 5px;
font-size: 20px;
`;
const Wrapper = styled.div`
margin: 0 auto;
padding: 35px;
width: 75%;
border-left: 1px solid rgba(35, 35, 35, 0.15);
border-right: 1px solid rgba(35, 35, 35, 0.15);
min-height: 100vh;
`;
const Textbox = styled.div`
display: flex;
flex-direction: column;
border-bottom: 10px solid rgba(0, 0, 0, 0.15);
`;
const StyledTextInput=styled.div`
display: flex;
justify-content: space-around;
padding: 25px;
`;
const AddCharacterHeader = styled.h3`
margin: 15px 15px 15px 15px;
`;
const MiniHeader = styled.div`
border-bottom: 5px solid #595959;
display: flex;
justify-content: center;
padding: 8px 8px 8px 15px;
font-size: 25px;
font-weight: bold;
margin-bottom: 10px;
`;
const CharacterSelecterWrapper = styled.div`

display: flex;
flex-direction: column;
align-items: center;
border-radius: 15px;
padding: 5px;
box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.52);
max-width: 40%;
margin: 0 auto;
margin-bottom: 15px;
`;
const DisplaySelectedCharacter = styled.div`

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
const GeneralChatHeaderDiv = styled.div`
display: flex;
justify-content: center;
`;
const GeneralChatHeader = styled.h1`
border-radius: 10px;
padding: 15px;
border-bottom: 3px solid #cc444b;
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
  border: 1px solid black;
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

const StyledDiv = styled.div`
  background-color: #7c98b3;
  height: 60vh;
  overflow-y: auto;
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

const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: column-reverse;
  `;

export default MainPage;


