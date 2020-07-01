/**
 * Child 2 - renders dropdown for selecting sort category  
 * Stateless Functional Component 
 */

import React from 'react';
export const SortResults = (props) => {
    console.log("2. I let you decide how to sort results");
    const disabled = props.disabled 

    if (props.searchStatus) {      
        return (
            <div>
                <br/>
                <label htmlFor="sort"> Sort by: </label>
                <select id="sort" name="sort" disabled={disabled} onChange={props.updateSortCriteria}>
                    <option value={null}>Select one of the below</option>
                    <option value="imdbID ascending">imdbID no.</option>
                    <option value="Title ascending">Title A-Z</option>
                    <option value="Title descending">Title Z-A</option>
                    <option value="Year ascending">Year (Oldest - Newest)</option>
                    <option value="Year descending">Year (Newest - Oldest)</option>
                </select>
            </div>
        )
  } else {
      return null;
  };
}
