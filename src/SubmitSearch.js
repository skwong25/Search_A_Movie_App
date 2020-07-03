/**
 * Child 3 - renders search/refresh buttons
 * Stateless Functional Component 
 */

import React from 'react';

const SubmitSearch = (props) => {
    console.log("3. I render search and refresh buttons");
    if (!props.searchStatus) {
        return ( 
            <div>
                <button className="Search" onClick={props.handleClick} >Search</button> 
            </div>
        ) 
    } else {
        return (
            <div>
                <br/>
                <button className="Refresh" onClick={()=>window.location.reload(false)}>Refresh</button>
            </div>
        )
    };
}

export default SubmitSearch;