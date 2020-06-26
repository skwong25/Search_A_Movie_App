/**
 * Child 1 - renders input field and dropdown for selecting no. of search results
 * Stateless Functional Component 
 */
import React from 'react';

const InputField = (props) => {

    console.log("1. I am an input field and dropdown!");

    if (!props.searchStatus) {  

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
        placeholder="example keyword: notebook" 
        id="search" 
        onChange={props.updateKeyword}>
      </input>
      <br/>
      <label htmlFor="number">Number of search results: </label>
      <select id="number" name="number" data-testid="dropdown" onChange={props.updateNoOfResults}>
        {noOfResults}
      </select>
      </div>
      )
    } else {
      return null;
  }
}

export default InputField;
