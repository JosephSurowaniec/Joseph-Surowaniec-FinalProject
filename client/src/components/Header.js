import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Header = () => {
  
    const navigate = useNavigate();

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
