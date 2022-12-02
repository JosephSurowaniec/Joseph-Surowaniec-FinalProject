import { useEffect, useState } from "react";
import styled from "styled-components";

const DetailFeatures = (specificFeatures) => {

    const [details , setDetails] = useState("");
    const [hideDetails , setHideDetails] = useState(false);

    useEffect(() => {
        fetch(`https://www.dnd5eapi.co/api/features/${specificFeatures.index}`)
            .then((res) => res.json())
            .then((data) => {
                setDetails(data)
            })
            .catch((error) => {
                window.alert("An Error Occured");
            });
    }, [])

    const handleShowDetails = () => {
        setHideDetails(prev => !prev);
    };

    const showDets = () => {
        console.log(details.desc[1]);
    };

    return(
        <div>
            <div>
                <button onClick={handleShowDetails}>{specificFeatures.name}</button>
            </div>
            {hideDetails ?
                <div>
                    {details.desc.map((element) => {
                        return (
                            <div key={Math.floor(Math.random() * 1700000000)}>
                                {element}
                            </div>
                        )
                    })}
                </div>
                :<></>}
        </div>
        
    );
};

const Wrapper = styled.div`
`;

export default DetailFeatures;