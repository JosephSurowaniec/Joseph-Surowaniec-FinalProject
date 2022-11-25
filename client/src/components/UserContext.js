import { createContext, useEffect, useState } from "react";


export const UserContext = createContext(null);


export const UserProvidor = ({ children }) => {

    const [profileName , setProfileName] = useState("")
    const [loggedIn , setLoggedIn] = useState(false)


    return (
        <UserContext.Provider 
            value={ {
                profileName,
                setProfileName,
                loggedIn,
                setLoggedIn
            }}
            >
                {children}
            </UserContext.Provider>
    );
};

export default UserProvidor;