import styled from 'styled-components';
import List from 'react-virtualized/dist/commonjs/List';
import { CellMeasurer, CellMeasurerCache, AutoSizer } from 'react-virtualized';
import StarGif from '../assets/reviewStar.gif';

const Wrapper = styled.div`
  width: calc(100% - 30em);
  height: calc(100% - 8.5em);
  margin: 2em 15em;
`
const ListLabel = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  text-align: left;
  font-style: italic;
`
const ReviewList = styled.div`
  width: 100%;
  height: calc(100% - 6em);
  overflow-y: auto;
  padding: 1em 0 0;
`
const ReviewWrapper = styled.div`
  width: calc(100% - 2em);
`
const ReviewContents = styled.div`
  padding: 1em 1.5em;
  background-color: #769FCD;
  border-radius: 0.3em;
  border: 5px solid ${props => props.border ? props.border : "#769FCD"};
`
const ReviewInlineElement =styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ReviewName = styled.div`
  font-size: 0.875em;
  margin: 0.5em 0;
  font-style: italic;
  color: #FDFAF6;
`
const ReviewSummary = styled.div`
  font-size: 1em;
  margin: 0.5em 0;
  color: #FDFAF6;
`
const ElementEndSpacer = styled.div`
  height: 1em;
  background-color: #F7FBFC;
  width: 100%;
`
const ReviewDate = styled.div`
  font-size: 0.875em;
  margin: 0.5em 0;
  font-style: italic;
  text-align: right;
  margin-right: 0.5em;
  color: #FDFAF6;
`
const ReviewRating = styled.img`
  height: 2em;
  vertical-align: middle;
`
const ReviewDetail = styled.div`
  font-size: 0.65em;
  margin: 0.5em 0;
  line-height: 1.5;
  color: #FDFAF6;
`
const EmptyList = styled.div`
  font-size: 1em;
  margin: 1.5em 0;
  color: black;
  text-align: center;
`
// component for rendering the list
export default function RootListing(props){

    let cache = new CellMeasurerCache({
      defaultHeight: 100,
      fixedWidth: true,
      keyMapper: index => props.data[index]['reviewerID']
    });
  
    const rowRenderer = ({index, parent, key, style}) => {
        return (
          <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
            <ReviewWrapper style={style} >
              <ReviewContents border={props['data'][index]['highLightColor'] && props['data'][index]['highLightColor'].length > 0 ? props['data'][index]['highLightColor'] : "#769FCD"}>
                <ReviewInlineElement>
                  <div>
                    <ReviewSummary>
                      {props['data'][index]['summary']}
                    </ReviewSummary>
                    <ReviewName>
                      Reviewed by: {props['data'][index]['reviewerName']}
                    </ReviewName>
                  </div>
                  <div>
                    <div>
                      {
                        new Array(parseInt(props['data'][index]['overall'])).fill(0).map((index)=> <ReviewRating src={StarGif} alt="star" key={index}/>)
                      }
                    </div>
                    <ReviewDate>
                      {props['data'][index]['reviewTime']}
                    </ReviewDate>
                  </div>
                </ReviewInlineElement>
                <ReviewDetail>
                  {props['data'][index]['reviewText']}
                </ReviewDetail>
                </ReviewContents>
              <ElementEndSpacer/>
            </ReviewWrapper>
          </CellMeasurer>
        );
      };

    return(
        <Wrapper>
          <ListLabel>
            Reviews :
          </ListLabel>
          <ReviewList>
            {
              props.data.length > 0 ?  
                <AutoSizer>
                  {({height, width}) => (
                    <List
                      rowCount={props.data.length}
                      width={width}
                      height={height}
                      rowRenderer={rowRenderer}
                      overscanRowCount={2}             
                      deferredMeasurementCache={cache}
                      rowHeight={cache.rowHeight}
                    />
                  )}
                </AutoSizer>
                :
                <EmptyList> No Reviews Found</EmptyList>
              }
          </ReviewList>
        </Wrapper>
    ) 
}
