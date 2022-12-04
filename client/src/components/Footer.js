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
        <HomepageButton onClick={handleMainpageNavigate}>MainPage</HomepageButton>
        <h1>This is the Footer object</h1>
        
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

const LowerWrapper = styled.div`
  display: flex;
  justify-content: center;
  border: none;
  width: 100vw;
  background-color: #7c98b3;
  color: white;
  border-top: 5px solid #cc444b;
`;

const PlayerButton = styled.button`
border-radius: 15px;
border: none;
padding: 15px;
margin: 15px;
`;

const HomepageButton = styled.button`
border-radius: 15px;
border: none;
padding: 15px;
margin: 15px;
`;

export default Footer;
