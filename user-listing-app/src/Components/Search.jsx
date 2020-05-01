import React from "react";
import search from './../assets/ico_search.svg';
import './Search.css'


class Search extends React.Component {
    render() {
        return (

            <div id="search">
                <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                <button className="search"><img src={search} alt="Search Button" /></button>
            </div>
        );
    }
}

export default Search;