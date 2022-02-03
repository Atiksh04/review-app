import styled from 'styled-components';
import HomeIcon from '../assets/home.gif';
import SummaryIcon from '../assets/summary.gif';
import ReviewIcon from '../assets/review.gif';

const Wrapper = styled.div`
  width: calc(100% - 2em);
  height: 100%;
  margin: 1em 2em 0 0;
`
const BrandingIcon = styled.img`
  width: 13em;
  margin-top: -2em;
`
const HomeElement = styled.div`
  height: 3em;
  width: 100%;
  font-size: 1.25em;
  img{
    height: 1.25em;
    vertical-align: middle;
    margin-right: 1em;
  }
  color: white;
  background-color: ${props => props.isSelected ? "#769FCD" : "#9AD0EC"};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1em;
  border-radius: 0 0.4em 0.4em 0;
  cursor: pointer;
`
const SummarySection = styled(HomeElement)`
  margin-top: 1em;
  img{
    height: 1.5em;
  }
`

// component to handle the sidebar 
export default function Sidebar(props){
    return(
        <Wrapper>
          <BrandingIcon src={ReviewIcon} alt="icon"/>
          <HomeElement isSelected={props.selectedSection === "home"} onClick={() => props.changeSection("home")}>
            <img src={HomeIcon} alt="home"/>
            Home
          </HomeElement>
          <SummarySection isSelected={props.selectedSection === "summary"} onClick={() => props.changeSection("summary")}>
            <img src={SummaryIcon} alt="summary"/>
            Summary
          </SummarySection>
        </Wrapper>
    ) 
}
