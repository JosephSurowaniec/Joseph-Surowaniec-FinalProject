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
                <StyledFeatureButton onClick={handleShowDetails}>{specificFeatures.name}</StyledFeatureButton>
            </div>
            {hideDetails ?
                <FeatureDetails>
                    {details.desc.map((element) => {
                        return (
                            <div key={Math.floor(Math.random() * 1700000000)}>
                                {element}
                            </div>
                        )
                    })}
                </FeatureDetails>
                :<></>}
        </div>
        
    );
};

const FeatureDetails = styled.div`
padding: 5px;
background: white;
border-radius: 15px;
`;
const StyledFeatureButton = styled.div`
border: none;
background: #7c98b3;
padding: 10px;
border-radius: 15px;
`;
export default DetailFeatures;