import React from 'react';

export class GetRequest extends React.Component {

  constructor(props) {
    super(props);

    this.state = { movie: 'killing me softly'}
  }

  getRequest() {

    const apiKey = '8b5f6c3b9b05408d801908faf6620139';
    const url = 'http://www.omdbapi.com/?';
    const queryParams = 't=';
    const wordQuery = "notebook"  
    const endpoint = url + 'apikey=' + apiKey + '&' + queryParams + wordQuery; 

    fetch(endpoint)
      .then(response => response.json())
      .then(data => {console.log(data); this.setState({ movie: data.Title })
    })
  } 

  render() {

    return ( 
      <div>
      <h1>{this.state.movie}</h1>;
      </div>
    ) 
  }
}


