import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FeedMessage from "./FeedMessage";
import { UserContext } from "./UserContext";

const CharacterProfile = () => {

    const { profileName , loggedIn, userId} = useContext(UserContext);
    const {characterId} = useParams();
    const [specificCharacterInfo, setSpecificCharacterInfo] = useState("");
    const [formData, setFormData] = useState("");
    const [characterFeed, setCharacterFeed ] = useState("")

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
  
        
      }

    return (
        <div>
            <h1>This is the character Details page</h1>
            {!specificCharacterInfo?<>Loading</>
            :
            <div>
                {console.log(specificCharacterInfo)}
                <div>
                    {specificCharacterInfo.characterName}
                </div>
                <div>
                    {specificCharacterInfo.selectedClass.name}
                </div>
                <div>
                    {specificCharacterInfo.selectedRace.name}
                </div>
                
                <div>
                <Textbox>
                        <MiniHeader>Home</MiniHeader>
                    
                        <form onSubmit={handleSubmit}>
                        <StyledTextInput><StyledTextArea name="message" id="message" value={formData} placeholder="What's On Your Mind?" onChange={(e) => handleChange(e.target.value)} /></StyledTextInput>
                        <InputArea>
                            {
                            formData.length > 224
                                ?<>{formData.length > 280 ?<OverLimit>{280 - formData.length}</OverLimit> : <LessWords>{280 - formData.length}</LessWords>} </>
                                :<CharacterCount>{280 - formData.length}</CharacterCount>
                            }
                            <StyledSubmit type="submit" disabled={formData.length > 280}>Submit</StyledSubmit>
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
                                <FeedMessage message={feedDetails.message} />
                            </FeedArea>
                            
                        )
                        
                        })}</StyledDiv>
                    
                    </>
                    }
                    </div>
                </div>
            </div>}
        </div>
    );
};

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
background-color: aquamarine;
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