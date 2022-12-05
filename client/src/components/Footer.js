import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const Footer = () => {

  const { profileName , loggedIn , userId, setProfileName , setLoggedIn } = useContext(UserContext);
  const { user, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  const handleLogOff = () => {
    setProfileName("");
    setLoggedIn(false);
  };

  const handleProfileNavigate = () => {
    console.log("Navigate to the profile tab");
    navigate(`/profile/${userId}`);
  };

  const handlePlayerNavigate = () => {
    console.log("Navigate to the player tab");
    navigate("/character");
  };

  const handleMainpageNavigate = () => {

    console.log("Navigate to the Mainpage");
    navigate("/");
  };

  return (
    <Wrapper>
      <UpperWrapper>
        <RightsWrapper>
          Dungeons & Dragons, D&D, their respective logos, and all Wizards titles and characters are property of Wizards of the Coast LLC in the U.S.A. and other countries. ©2022 Wizards.
        </RightsWrapper>
        
      </UpperWrapper>
      {/* {isAuthenticated?
        <LowerWrapper>
          <PlayerButton onClick={handlePlayerNavigate}> Create a Character</PlayerButton>
          <PlayerButton onClick={handleProfileNavigate}> Go to the Profile Page</PlayerButton>
        </LowerWrapper>
      :<></>} */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
 
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  bottom: 0;
`
const UpperWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: #595959;
  color: white;
`;

const RightsWrapper = styled.div`
display: flex;
align-items: flex-end;
margin: 5px;
height: 50px;
`;

const HomepageButton = styled.button`
border-radius: 15px;
border: none;
padding: 15px;
margin: 15px;
`;

export default Footer;
