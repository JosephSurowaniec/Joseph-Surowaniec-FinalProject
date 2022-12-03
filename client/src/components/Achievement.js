import { useState } from "react";
import styled from "styled-components";
import FeedMessage from "./FeedMessage";

const Achievement = () => {

    return (
        <div>
            Hello
        </div>
    )

    // const [formData, setFormData] = useState("");
    


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     resetTextArea();
    //     console.log("working");

    //     fetch("/characterFeed/addProgressPost", { ////Add this
    //       method: "POST",
    //       headers: {
    //           "Accept": "application/json",
    //           "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({status : formData, characterId : characterId , profileName : profileName})
    //   })
    //       .then(res => {
    //           return res.json()
    //       })
    //       .then((data) => {
    //             fetch(`/characterFeed/${characterId}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setCharacterFeed(data.data);
                    
    //             });
    //           })
    //       .catch((error) => {
    //         console.log("The MainFeed POST Broke");
    //       })

    //   };

    // return (
    //     <div>
    //         <StyledCommentSection>
    //                         <Textbox>
    //                                 <MiniHeader>Character Chat</MiniHeader>
                                
    //                                 <StyledForm onSubmit={handleSubmit}>
    //                                 <StyledTextInput><StyledTextArea name="message" id="message" value={formData} placeholder="Comment on this Character" onChange={(e) => handleChange(e.target.value)} /></StyledTextInput>
    //                                 <InputArea>
    //                                     {
    //                                     formData.length > 80
    //                                         ?<>{formData.length > 100 ?<OverLimit>{100 - formData.length}</OverLimit> : <LessWords>{100 - formData.length}</LessWords>} </>
    //                                         :<CharacterCount>{100 - formData.length}</CharacterCount>
    //                                     }
    //                                     <StyledSubmit type="submit" disabled={formData.length > 100}>Submit</StyledSubmit>
    //                                 </InputArea>
    //                                 </StyledForm>
                                    
                                    
    //                             </Textbox>

    //                             <PersonalCommentSection>
    //                                 {/* <button onClick={testHomefeed}></button> */}
    //                                 {!characterFeed[0]
    //                                 ?<div>Loading</div>
    //                                 :
    //                                 <>
    //                                 <StyledDiv>{characterFeed.map((feedDetails) => {
    //                                 return (
                                        
    //                                     <FeedArea key={Math.floor(Math.random()*140000000000000)}>
    //                                         <FeedMessage message={feedDetails.message} profileName={profileName} userId={feedDetails.userId} displayName={feedDetails.displayName} />
    //                                     </FeedArea>
                                        
    //                                 )
                                    
    //                                 })}</StyledDiv>
                                
    //                             </>
    //                             }
    //                             </PersonalCommentSection>
    //                         </StyledCommentSection>
    //     </div>
    // );
};

const PersonalCommentSection = styled.div`
padding: 25px;
display: flex;
flex-direction: column;
align-items: center;
height: 70%;
width: auto;
overflow-y: auto;
`;

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

const StyledForm = styled.form`
border-bottom: 10px solid rgba(0, 0, 0, 0.15);
`;
const StyledDiv = styled.div`
  
  display: flex;
  flex-direction: column-reverse;
  `;
export default Achievement;