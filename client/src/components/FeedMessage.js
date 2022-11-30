import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeedMessage = (content) => {

    const [contentCharacter , setContentCharacter] = useState("");
    const navigate = useNavigate();
    
    const showContent = () => {
        console.log(content);
        // console.log(content.character[0].characterInformation.characterName);
    };  

    const handleNav = () => {
        navigate(`/character/${content.character[0]._id}`);
    };

    return (
        <div>
            <button onClick={showContent}>Click to check</button>
            {content.character ?
            <div>
                {<button onClick={handleNav}>{content.character[0].characterInformation.characterName}</button>}
                {content.character[0].characterInformation.selectedClass.name}
            </div>
            
            :<></>}
            {content.message}
        </div>
    );
};

export default FeedMessage;