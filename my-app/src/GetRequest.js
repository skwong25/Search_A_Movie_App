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
    const queryParams = 't=';
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
      <label for="search"> Search for a movie: </label>
      <br/>
      <button onClick={this.handleClick} >Search</button> 
      <br/>
      </div>
    ) 
  }
}


