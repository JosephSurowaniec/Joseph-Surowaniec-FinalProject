import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SigninPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");      
    const navigate = useNavigate();

    const handleSignUp = () => {
        console.log("working now");
    }
    return(
        <div>
            <form onSubmit={(ev) => {
                ev.preventDefault();
                console.log(username);
                console.log(password);
                console.log(email);
                fetch(`/newUser`, {
                    "method": "POST",
                    "body": JSON.stringify({
                        "username": username,
                        "password": password,
                        "email": email,
                    }),
                    "headers": {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => res.json())                      
                        .then((data) => {
                            console.log(data);
                            navigate("/");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
            }}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(ev) => setUsername(ev.currentTarget.value)} required />
                <label>Password:</label>
                <input type="text" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required />
                <label>Email:</label>
                <input type="email" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required />
                <StyledSubmitButton type="submit" value="Submit" >Submit</StyledSubmitButton>
            </form>

        </div>
    )
}

const StyledSubmitButton = styled.button`
  width: 20%;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
`
export default SigninPage;