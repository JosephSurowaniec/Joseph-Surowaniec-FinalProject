import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return(
        !isAuthenticated && (

            
            <Wrapper>
            <StyledButton onClick={() => loginWithRedirect()}>
                    Sign In
            </StyledButton>
        </Wrapper>
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

const Wrapper = styled.div`
display: flex;
align-items: center;
`;

export default LoginButton;




