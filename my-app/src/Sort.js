/**
 * Child Class 4 - to handle the sort function
 * Stateless Component Class (Tbc)
 */
import React from 'react';

export class Sort extends React.Component {

  render() {

    
    return ( 
      <div>
      <br/>
      <label for="search"> Enter a keyword: </label>
      <input 
        type="text" 
        name="search" 
        id="search" 
        onChange={this.props.onChange}>
      </input>
      <br/>
      <label for="number">Number of search results: </label>
      <select id="number" name="number" onChange={this.props.handleNumber}>
        {options}
      </select>
      </div>
    ) 
  }
}
