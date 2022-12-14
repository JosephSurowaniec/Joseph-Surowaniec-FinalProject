import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";


const ProfileEditPage = ({ showModal, setShowModal}) => {

    const { profileName, setProfileName,  userId , profileImage , setProfileImage } = useContext(UserContext)

    const [changedProfileName , setChangedProfileName] = useState("");
    const [changedProfileImage , setChangedProfileImage] = useState("");
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
            await fetch(`/uploadUserImage`, {
              "method": "POST",
              "body": JSON.stringify({data: base64EncodedImage }),
              "headers": {
                  "Content-Type": "application/json"
              }
          })
          .then((res) => res.json())                      
                  .then((data) => {
                      console.log(data);
                      setChangedProfileImage(data.data.public_id)
                  });
        } catch (error) {
          console.log(error);
        }
      };

    const navigate = useNavigate();
    

    return (
        <div>
            {showModal ? 
            <Background>
                <ModalWrapper showModal={showModal}>
                  <StyledUserData>
                    <StyledForm onSubmit={ async (ev) => {               
                        ev.preventDefault();
                        console.log("this is on submit");

                        await fetch(`/user/editUser`, {
                                "method": "PATCH",
                                "body": JSON.stringify({
                                    "profileName": profileName,
                                    "userId": userId,
                                    "username": changedProfileName,
                                    "profileImage": changedProfileImage
                                }),
                                "headers": {
                                    "Content-Type": "application/json"
                                }
                            })
                            .then((res) => res.json())                      
                            .then((data) => {
                                console.log(data);
                                setProfileName(data.data[0].username)
                                setProfileImage(data.data[0].profileImage)

                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        
                    }}>
                      <StyledNameHeader>
                        Enter your new Username Below:
                      </StyledNameHeader>
                        <TextBar>
                            {/* the input field for the all values, sets the variables when the field is changed */}
                            Username: <StyledInput type="text" name="nickName" value ={changedProfileName} onChange={(ev) => setChangedProfileName(ev.currentTarget.value)} /> 
                        </TextBar>
                     
                        
                        <StyledSubmitButton type="submit" value="Submit" >Submit</StyledSubmitButton>
                    </StyledForm>
                    <StyledUploadImage>
                    <StyledNameHeader>
                        Upload a new Image Below:
                      </StyledNameHeader>
                      <form onSubmit={handleSubmitFile}>
                            <input type="file" name="image" onChange={handleImageUpload} />
                            <StyledUploadButton type="submit">Upload Image</StyledUploadButton>
                            </form>
                    </StyledUploadImage>
                    
                  </StyledUserData>
                    
                    <StyledButton onClick={() => setShowModal(prev => !prev)}>X</StyledButton>
                    <SubmitPictureArea>
                            
                            {previewSource ? 
                            <div>
                            <StyledPreviewImage src={previewSource} alt="uploaded image" />
                            </div>
                        :<></>}
                        </SubmitPictureArea>
                        
                </ModalWrapper>
                
            </Background> 
            :null}
        </div>
    );
}

const StyledUploadImage = styled.div`
display: flex;
flex-direction: column;
margin: 5px;
margin-top: 25px;
align-items: center;
`;
const StyledNameHeader = styled.h3`
`;
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
const TextBar = styled.div`
display: flex;
font-size: 30px;
justify-content: flex-end;
align-items: center;
`;
const ModalWrapper = styled.div`
width: 45%;
height: 45%;
display: flex;
justify-content: center;
align-items: center;
box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
background-color: #ffff;
color: #000;
display: flex;
position: relative;
z-index: 10;
border-radius: 10px;
`;
const StyledUploadButton = styled.button`
padding: 10px;
background: #e5e5e5;
border: none;
border-radius: 15px;
:hover{
  cursor: pointer;
  background: #accbe1;
}
`;
const StyledUserData = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: -50px;
`;
const StyledButton = styled.button`
padding: 15px;
border-radius: 25px;
position: absolute;
right: 0;
top: 0;
margin: 25px;
`;
const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
button {
    justify-content: center;
}
input {
    align-items: center;
}
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
const StyledSubmitButton = styled.button`
  width: 50%;
  background-color: black;
  color: white;
  padding: 14px 20px;
  border: 1px solid black;
  border-radius: 4px;
  position: absolute;
  bottom: 0;
  left: 25%;
  margin-bottom: 25px;
  :hover {
    cursor: pointer;
    background-color: #595959;
    border: 1px solid #595959;
  }
`;

const SubmitPictureArea = styled.div`
border: 1px solid rgba(35 , 35 , 35 , 0.2);
border-radius: 10px;
padding: 5px;
margin: 15px;
`;

const StyledPreviewImage = styled.img`
width: auto;
max-height: 350px;
border-radius: 15px;
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
`;
export default ProfileEditPage;