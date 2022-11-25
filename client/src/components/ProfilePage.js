import { useContext } from "react";
import { UserContext } from "./UserContext";

const ProfilePage = () => {

    const { profileName , loggedIn , userId} = useContext(UserContext);

    return(
        loggedIn
        ?<div>
            <h1>This is the Profile Page</h1>
            <div>
                Welcome {profileName}
            </div>
        </div>
        :<h1>You must Log In first</h1>
        
    )
}

export default ProfilePage;