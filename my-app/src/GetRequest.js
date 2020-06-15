import React from 'react';

export class GetRequest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {movie: {}};
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {

    const wordQuery = this.props.keyword;
    const apiKey = '9990ead4';
    const url = 'http://www.omdbapi.com/?';
    const queryParams = 's='; 
    // 't=' returns a single film 
    // 's=' returns 10 films, in format: Object containing Properties. One is Search whose Value is an Array. 
    //                                   The Array contains key-value pairs, each representing a film's info.
    //                                   { Search: [ 0:{Title: "Example", Year: "1990" ... }, 1:{}, 2:{}, 3:{} ], ...}
    // To access the film we must 
    const endpoint = url + 'apikey=' + apiKey + '&' +  queryParams + wordQuery; 
  
    fetch(endpoint)
      .then(response => response.json(), Error => console.log(Error.message))  // The Promise resolved, however there is an Error
      .then(data => {
          console.log(data); 
          this.props.handleData(data);
    })
  } 

  render() {

    return ( 
      <div><br/>
      <label for="search"></label>
      <br/>
      <button className="Search" onClick={this.handleClick} >Search</button> 
      <br/>
      </div>
    ) 
  }
}


