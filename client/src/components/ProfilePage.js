import { useContext, useEffect, useState } from "react";
import CharacterFeed from "./CharacterFeed";
import { UserContext } from "./UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import ProfileEditPage from "./ProfileEditPage";
import {Image} from 'cloudinary-react';
import { useParams } from "react-router-dom";

const ProfilePage = () => {

    const { profileName , userId , profileEmail , profileImage} = useContext(UserContext);

    let profileId = useParams();

    const [ profileData, setProfileData] = useState("");
    const [userCharacters , setUserCharacters] = useState("");
    const [ showModal , setShowModal ] = useState(false);
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        console.log(profileId.userId);

        fetch(`/profile/${profileId.userId}`)
            .then((res) => res.json())
            .then((data) => {
                setUserCharacters(data.data);
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
    }, []);

    useEffect(() => {
        fetch(`/user/profile/${profileId.userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProfileData(data.data[0]);
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
    }, []);

    const handleEditProfile = () => {
        console.log("this will open the modal");
        console.log(profileData);
        setShowModal(prev => !prev)
    };
    
    return(
        isAuthenticated
        ?profileData?<Wrapper>
            <Header>
                <h1>{profileData.username}'s profile</h1>
            </Header>
            <UserInfoWrapper>
                <ProfileEditPage  showModal={showModal} setShowModal={setShowModal} />
                <ProfileDetails>
                    <ImageWrapper>
                        {profileData.profileImage ?<Image cloudName="dfigamsk5" publicId={profileData.profileImage} gravity= "auto" aspect_ratio= "1:1" border= "3px_solid_rgb:7c98b3" radius= "max" width="250" height="250" crop="fill"/>
                        :<Image cloudName="dfigamsk5" publicId="User_Profile/defaultProfileImage_pl3ci7" gravity= "auto" aspect_ratio= "1:1" border= "3px_solid_rgb:cc444b" radius= "max" width="150" height="150" crop="fill" />}
                    </ImageWrapper>
                        <InfoWrapper>
                            <StyledInfo><StyledInfoSpan>Username:</StyledInfoSpan>{profileData.username}</StyledInfo>
                            <StyledInfo><StyledInfoSpan>Email Address:</StyledInfoSpan>{profileData.email}</StyledInfo> 
                        </InfoWrapper>
                    {profileName === profileData.username?<StyledEditButton onClick={handleEditProfile}>Edit Profile</StyledEditButton>:<></>}
                </ProfileDetails>
            </UserInfoWrapper>
            {!userCharacters?<>Loading</>
            :<div>
                {userCharacters.map((element) => {
                    return(
                        <StyledCharacterFeed key={Math.floor(Math.random() * 1700000000)}>
                            <CharacterFeed characterDetails={element.characterInformation} userId={element.userId} characterId={element._id}/>
                        </StyledCharacterFeed>
                    )
                    
                })}
                
            </div>}
        </Wrapper>
        :<div>Loading</div>
        :<h1>You must Log In first</h1>
        
    )
};

const Wrapper = styled.div`
padding: 25px;
`
const Header = styled.div`
border-bottom: 10px solid #accbe1;
margin-bottom: 10px;
`
const ProfileDetails = styled.div`

display: flex;
padding: 5px;
button {
    justify-content: flex-end;
    width: 100px;
    height:50px;
}
`;
const UserInfoWrapper = styled.div`
display: flex;
justify-content: center;
`;
const InfoWrapper = styled.div`
padding: 25px;
`;
const StyledInfo = styled.div`
font-size: 25px;
margin-bottom: 25px;
`;
const StyledInfoSpan = styled.span`
margin-right: 10px;
`;
const StyledCharacterFeed = styled.div`
margin: 15px;
border-radius: 15px;
box-shadow: -7px 5px 6px 4px rgba(0,0,0,0.49);
`;
const ImageWrapper = styled.div`
border-right: 2px solid #7c98b3 ;
padding: 25px;
height: 250px;
width: 250px;
`;
const StyledEditButton = styled.button`
padding: 15px;

`;
export default ProfilePage;