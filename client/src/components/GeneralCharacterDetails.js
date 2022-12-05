import { useContext, useState } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";
import { UserContext } from "./UserContext";



const GeneralCharacterDetails = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);

    
    const [ selectedFile, setSelectedFile ] = useState('');
    const [ previewSource, setPreviewSource] = useState('');

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      previewFile(file);
    };

    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
        console.log(file);
        
  
        
      }
    };

    const handleSubmitFile = (e) => {
      e.preventDefault();
      console.log("submit sent 1");
      if (!previewSource) {
        return;
      }
      uploadImage(previewSource);

    };

    const uploadImage =  async (base64EncodedImage) => {

      try {
          await fetch(`/testingUpload`, {
            "method": "POST",
            "body": JSON.stringify({data: base64EncodedImage }),
            "headers": {
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())                      
                .then((data) => {
                    console.log(data);
                    actions.updateCharacterImage(data.data.public_id)
                });
      } catch (error) {
        console.log(error);
      }
    };

    return(
        <GeneralWrapper>
          <StyledNameDiv>
            <StyledNameHeader>
              Enter the Character's Below:
            </StyledNameHeader>
            <TextBar>
              Name: <StyledInput type="text" name="name" value ={state.characterName} onChange={(e) => actions.updateCharacterName(e.target.value)} /> 
            </TextBar>
            {/* <StyledTextArea name="characterName" id="name" value={state.characterName} placeholder="What's Your Name?" onChange={(e) => actions.updateCharacterName(e.target.value)} /> */}
          </StyledNameDiv>
          <SubmitPictureArea>
          <StyledNameHeader>
              Upload an image of your Character Below:
            </StyledNameHeader>
            <form onSubmit={handleSubmitFile}>
              <input type="file" name="image" onChange={handleImageUpload} />
              <StyledSubmitImage type="submit">Submit photo</StyledSubmitImage>
            </form>
            {previewSource ? 
            <PreviewImageWrapper>
              <StyledPreviewImage src={previewSource} alt="uploaded image" />
            </PreviewImageWrapper>
          :<></>}
          </SubmitPictureArea>
        </GeneralWrapper>
    )
}

const GeneralWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e5e5e5;
  border-right: 3px solid #cc444b;
  border-bottom: 3px solid #cc444b;
  padding: 50px;
  border-radius: 15px;
`;
const SubmitPictureArea = styled.div`

border-radius: 10px;
padding: 25px;
margin: 15px;
`;
const StyledNameDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const StyledSubmitImage = styled.button`

padding: 10px;
background: white;
border: none;
border-radius: 15px;
:hover {
    cursor: pointer;
    background: #accbe1;
}
`;
const PreviewImageWrapper = styled.div`
display: flex;
justify-content: center;
margin-top: 25px;
`;
const StyledPreviewImage = styled.img`
width: auto;
max-height: 500px;
position: absolute;
border-radius: 15px;
box-shadow: -9px 5px 15px 5px #000000;
`;
const StyledNameHeader = styled.h3`
`;
const TextBar = styled.div`
display: flex;
font-size: 30px;
justify-content: flex-end;
align-items: center;
`;
const StyledInput = styled.input`

  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-left: 25px;
  margin-right: 5px;

  
`;
const StyledTextArea = styled.textarea`

  border: 1px solid black;
  width: 200px;
  height: 75px;
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  resize: none;
  font-size: 18px;
`;
export default GeneralCharacterDetails;