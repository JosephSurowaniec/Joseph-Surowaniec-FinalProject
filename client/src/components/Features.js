import styled from "styled-components";
import DetailFeatures from "./DetailFeatures";

const Features = (featureInfo) => {

    let sliceEndpoint = Number(featureInfo.level);

    const showFeatures = () => {
        console.log(featureInfo);
    };

    return (
        <div>
            {/* <button onClick={showFeatures}>Click</button>
            Features tab */}
            <StyledScroller>
                        {featureInfo.levelInfo.slice(0 , sliceEndpoint).map((element) => {
                            return(
                                <div key={Math.floor(Math.random() * 1700000000)}>
                                    <StyledLevelNumber>{element.level}</StyledLevelNumber>
                                    <StyledLevelDetails>{element.features[0] ?element.features.map((el) => {
                                        return(
                                            <Wrapper123 key={Math.floor(Math.random() * 1700000000)}><DetailFeatures name={el.name} index={el.index}/></Wrapper123>
                                        )
                                    }) 
                                    :<div>No New Features</div>}</StyledLevelDetails>
                                </div>
                            )
                        })}
                    </StyledScroller>
        </div>

    );
};


const StyledFeaturesWrapper = styled.div`
display: flex;
border: 1px solid rgba(35 , 35 , 35 , 0.2);
`;
const StyledScroller = styled.div`
max-height: 60vh;
padding: 10px;
overflow-y: auto;

`;

const StyledLevelNumber = styled.div`
border-bottom: 1px solid #7c98b3;
margin: 10px;
`;
const StyledLevelDetails = styled.div`
display: flex;
flex-direction: column;
padding: 25px;
background-color: #e5e5e5;
border: 1px solid rgba(35 , 35 , 35 , 0.2);
border-radius: 15px;
`;

const Wrapper123 = styled.div`
padding: 15px;

`;
export default Features;