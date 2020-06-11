/**
 * Child Class 1 - to handle the input field 
 * Stateful Component Class
 */
import React from 'react';

export class InputField extends React.Component {

  render() {

    return ( 
      <div><br/>
      <label for="search"> Search for a movie: </label>
      <input 
        type="text" 
        name="search" 
        id="search" 
        onChange={this.props.onChange}>
      </input>
      </div>
    ) 
  }
}


// Question: How do we get the <input/> field to pass its value on onChange? 
// An input's value is passed back within an object: e.target.value 