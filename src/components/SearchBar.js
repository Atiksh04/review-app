import styled from 'styled-components';
import SearchbarIcon from '../assets/search.gif';
import filterIcon from '../assets/filterIcon.gif';
import { useState } from 'react';
import FilterPopup from './FilterPopup';

const SearchWrapper = styled.div`
    width: calc(100% - 33em);
    height: 2em;
    margin: 3em 15em 4.5em 15em;
`
const SearchContent = styled.div`
    padding: 0.5em 1.5em;
    background-color: #DDE7F2;
    border-radius: 0.4em;
    width: 100%;
`
const SearchIcon = styled.img`
    height: 2em;
    vertical-align: middle;
    width: 2em;
    margin-right: 0.5em;
`
const SearchInput = styled.input`
    width: calc(100% - 3em);
    background-color: #DDE7F2;
    height: 100%;
    color: black;
    border: none;
    outline: none;
    font-size: 0.95em;
    :focus{
        outline: none;
    }
    ::placeholder{
        color: black;
    }
`
const FilterWrapper = styled.div`
    height: 3em;
    width: auto;
    border-radius: 0.4em;
    text-align: left;
    margin-top: 0.5em;
    background-color: ${props => props.isSelected ? "##769FCD" : "#F7FBFC"};
    img{
        height: 1.5em;
        margin-right: 0.5em;
        vertical-align: middle;
    }
    color: black;
    cursor: pointer;
`

// component for handling the searchbar and filter options
export default function SearchBar(props){

    const [showFilterPopup, setShowFilterPopup] = useState(false);

    const inputChanged = (val) => {
        props.searchData(val);
    }

    return(
        <SearchWrapper>
            <SearchContent>
                <SearchIcon src={SearchbarIcon} alt="search"/>
                <SearchInput type="text" placeholder="Search Reviews" onChange={(e)=> inputChanged(e.target.value)}/>
            </SearchContent>
            <FilterWrapper onClick={() => setShowFilterPopup(!showFilterPopup)}>
                <img src={filterIcon} alt="filter"/>
                Filters
            </FilterWrapper>
            {
                showFilterPopup ? <FilterPopup closeClicked={() => setShowFilterPopup(!showFilterPopup)} filterOptions={props.filterOptions} setFilters={props.setFilterOptions}/> : null
            }
        </SearchWrapper>
    )
}