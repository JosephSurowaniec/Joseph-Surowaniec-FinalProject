import { useContext, useState } from "react";
import styled from "styled-components";
import { CharacterContext } from "./CharacterContext";
import { UserContext } from "./UserContext";



const GeneralCharacterDetails = () => {

    const { characterClasses, characterRaces, state  } = useContext ( CharacterContext );
    const {actions} = useContext(CharacterContext);

    const [ image , setImage] = useState('');
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
      console.log(base64EncodedImage);
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
        <div>
          <div>
            <StyledTextArea name="characterName" id="name" value={state.characterName} placeholder="What's Your Name?" onChange={(e) => actions.updateCharacterName(e.target.value)} />
          </div>
          <SubmitPictureArea>
            <form onSubmit={handleSubmitFile}>
              <input type="file" name="image" value={image} onChange={handleImageUpload} />
              <button type="submit">Submit photo</button>
            </form>
            {previewSource ? 
            <div>
              <StyledPreviewImage src={previewSource} alt="uploaded image" />
            </div>
          :<></>}
          </SubmitPictureArea>
        </div>
    )
}


const SubmitPictureArea = styled.div`
border: 5px solid black;
border-radius: 10px;
padding: 25px;
margin: 15px;
`;

const StyledPreviewImage = styled.img`
width: 200px;
height: 200px;
`

const StyledTextArea = styled.textarea`

  border: 1px solid black;
  width: 200px;
  height: 75px;
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  resize: none;
  font-size: 18px;
  /* :focus {
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
}  */
`;
export default GeneralCharacterDetails;