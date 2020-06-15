
import React from 'react';

export class Output extends React.Component {

  render() {

    const movieArray = this.props.movieData; // initially App passes 'null' as props.movieData 

    if (movieArray === null) {
        return <div><h3>Search for a Movie</h3></div>
    } 
    
    let x = 0
    let title = movieArray[x].Title;
    let year = movieArray[x].Year;
    let poster = movieArray[x].Poster;

    return ( 
      <div>
      <h3>Movie: {x+1}</h3>
      <h5>Title: {title}</h5>
      <h5>Year: {year}</h5>
      <img src={poster} />

      {/* <ol> {movieArray} </ol> */}
      
      {/* <h5>Description: {movieData.Plot}</h5>  */}
      </div>
    ) 
  }
}


// I want it to present a dropdown up to 10 and you can select how many movies you want it to return
// Then it iterates through that number of times using .map 