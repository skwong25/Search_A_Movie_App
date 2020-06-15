/**
 * Child Class 2 - to handle the GET request 
 * Stateful Component Class - only has state to manage the handleClick function, should we move this into App? 
 */

 import React from 'react';

export class GetRequest extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() { // is handleClick called only when onClick is triggered)? 

    const wordQuery = this.props.keyword;
    const apiKey = '9990ead4';
    const url = 'http://www.omdbapi.com/?';
    const queryParams = 's='; 
    // 't=' returns a single film 
    // 's=' returns 10 films, in format: Object containing Properties. One is Search whose Value is an Array. 
    //                                   The Array contains key-value pairs, each representing a film's info.
    //                                   { Search: [ 0:{Title: "Example", Year: "1990" ... }, 1:{}, 2:{}, 3:{} ], ...}
    // To access the film Title we must e.Search. 
    const endpoint = url + 'apikey=' + apiKey + '&' +  queryParams + wordQuery; 
  
    fetch(endpoint)
      .then(response => response.json(), Error => console.log(Error.message))  
      .then(data => {
          console.log(data); 
          this.props.handleData(data); //passes it back to the App.js which updates its state  
    })
  } 

  render() {

    return ( 
      <div>
      <button className="Search" onClick={this.handleClick} >Search</button> 
      </div>
    ) 
  }
}


