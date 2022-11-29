import { useContext, useEffect, useState } from "react";
import CharacterFeed from "./CharacterFeed";
import { UserContext } from "./UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {

    const { profileName , loggedIn , userId} = useContext(UserContext);

    const [userCharacters , setUserCharacters] = useState("");
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        fetch(`/profile/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUserCharacters(data.data);
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
    }, []);

    return(
        isAuthenticated
        ?<div>
            <h1>This is the Profile Page</h1>
            <div>
                Welcome {profileName}
            </div>
            {!userCharacters?<>Loading</>
            :<div>
                {userCharacters.map((element) => {
                    return(
                        <div key={Math.floor(Math.random() * 1700000000)}>
                            <CharacterFeed characterDetails={element.characterInformation} userId={element.userId} characterId={element._id}/>
                        </div>
                    )
                    
                })}
                
            </div>}
        </div>
        :<h1>You must Log In first</h1>
        
    )
}

export default ProfilePage;