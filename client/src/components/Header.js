import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogInPage from "./LogInPage";
import LogoutButton from "./LogoutButton";
import { UserContext } from "./UserContext";

const Header = () => {

  const { profileName , loggedIn , setProfileName , setLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogOff = () => {
    setProfileName("");
    setLoggedIn(false);
  }
  const handlePlayerNavigate = () => {

    console.log("Navigate to the player tab");
    navigate("/character");
  };

  const handleMainpageNavigate = () => {

    console.log("Navigate to the Mainpage");
    navigate("/");
  };

  return (
    <>
      <Wrapper>
        <HomepageButton onClick={handleMainpageNavigate}> Go to the MainPage</HomepageButton>
        <h1>This is the Header object</h1>
        <PlayerButton onClick={handlePlayerNavigate}> Go to the Players Page</PlayerButton>
        {loggedIn?
        <div>
          You are logged in as {profileName}
          <button onClick={handleLogOff}>Log Off</button>
        </div>:
        <LogInPage />}
        {/* <h1>Auth buttons</h1>
        <LoginButton />
        <LogoutButton /> */}
      </Wrapper>

    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  width: 100vw;
  background-color: black;
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
