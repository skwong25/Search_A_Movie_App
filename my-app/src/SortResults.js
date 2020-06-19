/**
 * Child Class 2 - renders dropdown for selecting sort category  
 * Stateless Component Class (could be turned into a function component )
 */
import React from 'react';

export const SortResults = (props) => {

    console.log("2. I let you decide how to sort results");
    let searchStatus = props.searchStatus; 

    if (searchStatus) {  

      return (
        <div>
          <br/>
          <label htmlFor="sort"> Sort by: </label>
          <select id="sort" name="sort" onChange={props.updateSortCriteria}>
            <option value="Title">Title A-Z</option>
            <option value="Year">Year (Oldest - Newest)</option>
            <option value="imdbID">imdbID no.</option>
          </select>
        </div>
      )
  } else {
    return null;
  }
}