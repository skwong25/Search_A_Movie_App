/**
 * Child Class 1 - renders input field and dropdown for selecting no. of search results
 * Stateless Component Class (could be turned into a function component )
 */
import React from 'react';

export const InputField = (props) => {

    console.log("1. I am an input field and dropdown!");
    let searchStatus = props.searchStatus; 

    if (!searchStatus) {  

      let noOfResults = []; 
      for (let n = 1; n< 6; n++) { 
      noOfResults.push(<option key={n}>{n}</option>) 
      }  

      return ( 
      <div>
        <div>
          <h3>How to search:</h3>
        <ol>
         <li>Enter keyword</li>
         <li>Select number of search results</li>
         <li>Click Search</li>
        </ol>
        </div> 
      <br/>
      <label htmlFor="search"> Enter a keyword: </label>
      <input 
        type="text" 
        name="search" 
        id="search" 
        onChange={props.updateKeyword}>
      </input>
      <br/>
      <label htmlFor="number">Number of search results: </label>
      <select id="number" name="number" onChange={props.updateNoOfResults}>
        {noOfResults}
      </select>
      </div>
      )
    } else {
      return null;
  }
}
