import styled from 'styled-components';
import {CanvasJSChart} from 'canvasjs-react-charts';
import { useWorker } from "@koale/useworker";
import SummaryWorker from '../workers/summary.worker';
import { useEffect, useState } from 'react/cjs/react.development';

const Wrapper = styled.div`
    width: calc(100% - 30em);
    height: calc(100% - 15em);
    margin: 5em 15em;
    font-family: Rubik-Regular;
`
const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const TotalLabel = styled.div`
    color: black;
    font-size: 1.5em;
    text-align: left;
`
const ChartWrapper = styled.div`
    margin: 5em auto;
`
const ChartText = styled.div`
    font-size: 1em;
    margin-bottom: 1em;
`

// component for showing summary
export default function Summary(props){

    const [ratingLength, setRatingLength] = useState({});
    const [worker, { kill: killWorker }] = useWorker(SummaryWorker);
    const [showCharts, setShowCharts] = useState(false);
    const [uniqueReviewers, setuniqueReviewers] = useState(0);

    useEffect(()=>{
        worker(props.data)
        .then((res)=>{
            setuniqueReviewers(res['uniqueReviewers']);
            setRatingLength(res['rating']);
            setShowCharts(true);
        })

        return ()=>{
            killWorker();
        }
    },[]);

    return(
        <Wrapper>
            <InfoContainer>
                <TotalLabel>
                    Total Reviews -  {props.data.length}
                </TotalLabel>
                <TotalLabel>
                    Total Unique Reviwers -  {uniqueReviewers.length}
                </TotalLabel>
            </InfoContainer>
            {
                showCharts ?
                    <ChartWrapper>
                        <ChartText>Ratings PieChart -</ChartText>
                        <RenderPieChart ratings={ratingLength}/>
                    </ChartWrapper>
                : null
            }    
        </Wrapper>
    )
}

function RenderPieChart(props){

    let pieChartOptions = {
        exportEnabled: false,
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}",
            dataPoints: [
                { y: props['ratings']['5'], label: "5 stars" },
                { y: props['ratings']['4'], label: "4 stars" },
                { y: props['ratings']['3'], label: "3 stars" },
                { y: props['ratings']['2'], label: "2 stars" },
                { y: props['ratings']['1'], label: "1 star" }
            ]
        }]
    }

    return(
        <CanvasJSChart options={pieChartOptions}/>
    )
}