import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);


export const UserProvidor = ({ children }) => {

    const [profileName , setProfileName] = useState("");
    const [profileImage , setProfileImage] = useState("");
    const [profileEmail , setProfileEmail] = useState("");
    const [userId , setUserId] = useState("");
    const { user, isAuthenticated } = useAuth0();


    useEffect(() => {
        
        if (isAuthenticated) {
        console.log(user.email);
        console.log("checking the email now")
        fetch(`/user/${user.email}`)
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            console.log("received Data");
                            setUserId(data.data[0]._id);
                            setProfileEmail(data.data[0].email);
                            setProfileImage(data.data[0].profileImage);

                            if (data.data[0].username) {
                                setProfileName(data.data[0].username);
                            } else {
                                setProfileName(user.nickname);
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            // window.alert("An Error in the UserContext");
                        });


    }
            


    }, [isAuthenticated]);

    

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