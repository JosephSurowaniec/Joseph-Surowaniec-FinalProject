import { useContext } from "react";
import { UserContext } from "./UserContext";


const MainPage = () => {
    const { profileName , loggedIn} = useContext(UserContext)

    const handleLogIn = () => {
        console.log(profileName);
        console.log(loggedIn);
    }
    return(
            <div>
                This is the Homepage
                <button onClick={handleLogIn}>CHeck vitals</button>
                {!loggedIn ?<></>:<>{profileName} is logged In. Have Fun!</>}
            </div>
        )
        
    
};

export default MainPage;