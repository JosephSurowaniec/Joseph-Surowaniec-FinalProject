import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogInPage from "./LogInPage";
import LogoutButton from "./LogoutButton";
import { UserContext } from "./UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {

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
        <HomepageButton onClick={handleMainpageNavigate}> Go to the MainPage</HomepageButton>
        <h1>This is the Header object</h1>
        <LoginButton />
        <LogoutButton />
        
        {/* {loggedIn?
        <div>
          You are logged in as {profileName}
          <button onClick={handleLogOff}>Log Off</button>
        </div>:
        <LogInPage />} */}
        
      </UpperWrapper>
      {isAuthenticated?
        <LowerWrapper>
          <PlayerButton onClick={handlePlayerNavigate}> Create a Character</PlayerButton>
          <PlayerButton onClick={handleProfileNavigate}> Go to the Profile Page</PlayerButton>
        </LowerWrapper>
      :<></>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid red;
  width: 100vw;

`
const UpperWrapper = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid blue;
  width: 100vw;
  background-color: black;
  color: white;
`;

const LowerWrapper = styled.div`
  display: flex;
  justify-content: center;
  border: none;
  width: 100vw;
  background-color: grey;
  color: white;
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

export default Header;
