import { useState } from 'react';
import styled from 'styled-components';
import Checked from '../assets/checked.svg';
import UnChecked from '../assets/unChecked.svg';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
`

const Popup = styled.div`
    height: 20em;
    width: 20em;
    background-color: #9AD0EC;
    bottom: 0;
    top: 0;
    position: absolute;
    left: 0;
    right: 0;
    padding: 1.5em;
    margin: auto;
    border-radius: 0.4em;
`

const HeaderText = styled.div`
    font-size: 1em;
    font-style: italic;
    text-align: left;
    color: black;
`
const ElementsWrapper = styled.div`
    height: 15em;
`
const ReviewWrapper = styled.div`
    height: 4em;
    display: flex;
    justify-content: space-between;
    margin-top: 2em;
    width: 80%;
`
const GoodBadFilter = styled.div`
    img{
        height: 1.125em;
        margin-right: 0.5em;
        vertical-align: middle;
    }
    color: black;
    font-size: 0.875em;
    user-select: none;
    cursor: pointer;
`
const CTAWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const CloseCTA = styled.div`
    background-color: #769FCD;
    color: #fff;
    font-size: 1em;
    padding: 0.5em 1em;
    border-radius: 0.3em;
    font-weight: bold;
    cursor: pointer;
`
const SaveCTA = styled(CloseCTA)`
    margin-left: 1em;
`
const HighlightWrapper = styled.div`
    height: 8em;
    width: 100%;
    margin: 0;
    display: flex;
    img{
        height: 1em;
        margin: 0.25em 0.5em 0 0;
        vertical-align: middle;
        cursor: pointer;
    }
`
const HighlightLabel = styled.div`
    color: black;
    font-size: 1em;
    line-height: 1.5;
    input{
        width: 1em;
        text-align: center;
        cursor: pointer;
    }
`
const ColoredText = styled.span`
    color: ${props => props.color ? props.color : "black"};
    text-decoration: underline;
    font-style: italic;
    font-size: 1em;
    margin: 0 0.5em;
    cursor: pointer;
`
const ColorDropdown = styled.div`
    height: 5.25em;
    width: 4.5em;
    background-color: #769FCD;
    border-radius: 0.3em;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 10.125em;
    left: 13.5em;
    text-align: center;
`
const DropdownElement = styled.div`
    color: ${props => props.color ? props.color : "black"};
    font-size: 0.875em;
    margin: 0.25em 0;
    cursor: pointer;
`
const Error = styled.div`
    color: #DD4A48;
    font-size: 0.75em;
    text-align: left;
`
// component to handle FilterPopup

export default function FilterPopup(props){

    const highlightOptions = [{'text':"Red", "color": "#B33030"}, {"text": "Black", "color":"#313552"}, {"text": "Brown", "color": "#694E4E"}];

    const [isGood, setIsGood] = useState(props.filterOptions.good);
    const [isBad, setIsBad] = useState(props.filterOptions.bad);
    const [selectedHighliter, setHighliter] = useState({'text': props.filterOptions.highlight.text ?  props.filterOptions.highlight.text : "Red", "color":  props.filterOptions.highlight.color ?  props.filterOptions.highlight.color: "#B33030"});
    const [showDropdown, setShowDropdown] = useState(false);
    const [toHighlight, setToHighlight] = useState(props.filterOptions.highlight.rating !== "" ? true : false);
    const [ratingVal, setRatingVal] = useState(props.filterOptions.highlight.rating ? props.filterOptions.highlight.rating  : "2");
    const [error, setError] = useState("");

    const saveClicked = ()=> {
        let pl = {
            "good": isGood,
            "bad": isBad,
            "highlight": {"color": toHighlight ? selectedHighliter['color'] : "", "rating":  toHighlight ? ratingVal : "", "text": selectedHighliter['text']} 
        }
        props.setFilters(pl);
        props.closeClicked();
    }

    const ratingChanged = (val) => {
        if((val >= 1 && val<= 5) || val.length === 0)
            setRatingVal(val);
        else{
            setError("Rating should be between 1 and 5");
            setToHighlight(false);
            setTimeout(()=>{
                setError("");
            }, 5000);
        }
    }

    return(
        <Wrapper>
            <Popup>
                <HeaderText>FILTERS</HeaderText>
                <ElementsWrapper>
                    <ReviewWrapper>
                        <GoodBadFilter onClick={() => setIsGood(!isGood)}>
                            <img src={isGood ? Checked : UnChecked} alt="radio"/>
                            Good Review
                        </GoodBadFilter>
                        <GoodBadFilter onClick={() => setIsBad(!isBad)}>
                            <img src={isBad ? Checked : UnChecked} alt="radio"/>
                            Bad Review
                        </GoodBadFilter>
                    </ReviewWrapper>
                    <HighlightWrapper>
                        <img onClick={()=> setToHighlight(!toHighlight)} src={toHighlight ? Checked : UnChecked} alt="radio"/>
                        <HighlightLabel>
                            Highlight all reviews as 
                            <span onMouseEnter={()=> setShowDropdown(true)} onMouseLeave={()=> setShowDropdown(false)}>
                                <ColoredText color={selectedHighliter.color}>
                                    {selectedHighliter.text}
                                </ColoredText>
                                {
                                    showDropdown ? 
                                    <ColorDropdown>
                                        {highlightOptions.map((v)=> <DropdownElement color={v.color} onClick={()=> setHighliter(v)}>{v.text}</DropdownElement>)}
                                    </ColorDropdown>
                                    : null
                                }
                            </span>
                            when rating is <input value={ratingVal} onChange={(e)=> ratingChanged(e.target.value)}/>
                            {error ? <Error>{error}</Error> : null}     
                        </HighlightLabel>     
                    </HighlightWrapper>
                </ElementsWrapper>
                <CTAWrapper>
                    <CloseCTA onClick={props.closeClicked}>CLOSE</CloseCTA>
                    <SaveCTA onClick={saveClicked}>SAVE</SaveCTA>
                </CTAWrapper>
            </Popup>
        </Wrapper>
    )
}
