import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const LogoutButton = () => {
    const { profileName } = useContext(UserContext)
    const { logout, isAuthenticated } = useAuth0();

    return(
        isAuthenticated && (
            <LoggedInWrapper>
                <StyledButton onClick={() => logout()}>
                    Sign Out
                </StyledButton>
                <StyledProfileName>
                    <StyledSpan>{profileName} </StyledSpan>is logged In. Have Fun!
                </StyledProfileName>
            </LoggedInWrapper>
            
        )
        
    )
};

const StyledButton  = styled.button`
border-radius: 15px;
border: none;
padding: 15px;
margin: 15px 0px 15px 15px;
background: #e5e5e5;
`;

const LoggedInWrapper = styled.div`
display: flex;
align-items: center;
`;

const StyledProfileName = styled.div`
margin-left: 25px;
`;
const StyledSpan = styled.span`
font-size: 35px;
color: #accbe1;
font-weight: bold;
`;
export default LogoutButton;