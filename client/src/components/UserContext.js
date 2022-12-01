import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);


export const UserProvidor = ({ children }) => {

    const [profileName , setProfileName] = useState("");
    const [profileImage , setProfileImage] = useState("");
    const [profileEmail , setProfileEmail] = useState("");
    const [userId , setUserId] = useState("");
    const { user, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        console.log(user.email);
        fetch(`/user/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUserId(data.data[0].client_id);
                setProfileEmail(data.data[0].email);
                setProfileName(data.data[0].username);
                setProfileImage(data.data[0].profileImage);
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
    }

    return (
        <UserContext.Provider 
            value={ {
                profileName,
                setProfileName,
                userId,
                setUserId,
                profileImage,
                setProfileImage,
                profileEmail,
                setProfileEmail
            }}
            >
                {children}
            </UserContext.Provider>
    );
};

export default UserProvidor;