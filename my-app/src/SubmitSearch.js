/**
 * Child Class 2 - renders search/refresh buttons
 * Stateless Component Class
 */

import React from 'react';

export const SubmitSearch = (props) => {
    
    console.log("3. I render search and refresh buttons");
    let searchStatus = props.searchStatus;

    if (!searchStatus) {
      return ( 
        <div>
          <button className="Search" onClick={props.handleClick} >Search</button> 
        </div>
      ) 
    } else if (searchStatus) {
      return (
        <div>
            <br/>
            <button className="Refresh" onClick={()=>window.location.reload(false)}>Start Over</button>
        </div>
      )
    }
  }
