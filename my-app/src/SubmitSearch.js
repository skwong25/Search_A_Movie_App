/**
 * Child Class 2 - renders search/refresh buttons
 * Stateless Component Class
 */

import React from 'react';

export class SubmitSearch extends React.Component {

  render() { 
    
    console.log("3. I render search and refresh buttons");
    let searchStatus = this.props.searchStatus;

    if (!searchStatus) {
      return ( 
        <div>
          <button className="Search" onClick={this.props.handleClick} >Search</button> 
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
}
