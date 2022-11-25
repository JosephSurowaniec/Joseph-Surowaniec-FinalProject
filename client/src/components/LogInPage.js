import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const LogInPage = () => {
    
    const { profileName , loggedIn , setProfileName, setLoggedIn } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");    
    const navigate = useNavigate();

    const handleNav = () => {
        navigate("/createAccount")
    };

    return (
        <div>
            <form onSubmit={(ev) => {
                ev.preventDefault();
                fetch(`/user`, {
                    "method": "POST",
                    "body": JSON.stringify({
                        "username": username,
                        "password": password
                    }),
                    "headers": {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setProfileName(data.data[0].username);
                        setLoggedIn(true);
                    })
                    .catch((error) => {
                        console.log(error);
                        window.alert("An Error Occured");
                    })
            }}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(ev) => setUsername(ev.currentTarget.value)} required />
                <label>Password:</label>
                <input type="text" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required />
                <StyledSubmitButton type="submit" value="Submit" >Submit</StyledSubmitButton>
            </form>
            <button onClick={handleNav}>Click here to Make an Account</button>

        </div>
    )
}


const StyledSubmitButton = styled.button`
  width: 20%;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
`
export default LogInPage;