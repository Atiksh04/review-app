import styled from 'styled-components';
import { useWorker } from "@koale/useworker";

import ReviewListing from './ReviewListing';
import Sidebar from './Sidebar';
import ReviewData from '../data.json';
import { useState } from 'react';
import SearchBar from './SearchBar';
import filterWorker from '../workers/filter.worker';
import { useEffect } from 'react/cjs/react.development';
import Summary from './Summary';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`
const SidebarWrapper = styled.div`
  background-color: #B9D7EA;
  width: 15%;
  height: 100%;
`
const MainContentWrapper = styled.div`
  background-color: #F7FBFC;
  width: 85%;
  height: 100%;
`

export default function RootComponent(){
    const [reviewData, setReviewData] = useState(ReviewData.data); // storing data from json file for initals renders
    const [searchValue, setSearchValue] = useState(""); // storing the search keys
    const [selectedSection , setSelectedSection] = useState("home"); // maintaining state to conditional render home and summary component
    const [filterOptions, setCurrentFilterOptions] = useState({"good": false, "bad": false, "highlight":{"color": "", "rating": "", "text" : ""}}); // storing filter options

    const [worker, { kill: killWorker }] = useWorker(filterWorker); // initializing web worker 

    useEffect(()=>{
      return () => {
        killWorker(); // killing the web worker when the component unmounts
      }
    },[]);

    useEffect(()=>{ // calling callFilterList if searchValue or filterOptions changes
      callFilterList(searchValue, filterOptions); 
    },[searchValue, filterOptions]);

    const callFilterList = (searchValue, filterOptions) => { // calling the web worker with the required params and handing data
      worker(searchValue, ReviewData.data, filterOptions)
      .then((res)=> {
        if(searchValue === "" && res.length === 0)
          setReviewData(ReviewData.data);
        else 
          setReviewData(res);
      });
    }

    return(
        <Wrapper>
            <SidebarWrapper>
                <Sidebar changeSection={(v)=> setSelectedSection(v)} selectedSection={selectedSection}/>
            </SidebarWrapper>
            <MainContentWrapper>
              {
                selectedSection === "home" ?
                <>
                  <SearchBar searchData={(value) => setSearchValue(value)} filterOptions={filterOptions} setFilterOptions={(val) =>  setCurrentFilterOptions(val)}/>
                  <ReviewListing data={reviewData}/>
                </>
                : 
                  <Summary data={ReviewData.data}/>
              }  
            </MainContentWrapper>
        </Wrapper>
    ) 
}