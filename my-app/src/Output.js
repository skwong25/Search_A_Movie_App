
import React from 'react';

export class Output extends React.Component {

  render() {

    const movieData = this.props.movieData;

    return ( 
      <div>
      <h3>The Movie I Found For You is Called: {movieData.Title}</h3>
      <h4>Year: {movieData.Year}</h4>
      <h5>Description: {movieData.Plot}</h5>
      </div>
    ) 
  }
}

