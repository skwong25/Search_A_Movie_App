/**
 * Child Class 3 - to handle the output text 
 * Stateless Component Class (could be turned into a function component )
 */
import React from 'react';

export class Output extends React.Component {

  render() {

    const movieArray = this.props.movieData ; // initially App passes 'null' as props.movieData 
    const x = this.props.x ; 
    

    if (movieArray === null) {
        console.log(movieArray)
        return ( 
        <div>
          <h3>How to search:</h3>
        <ol>
         <li>Enter keyword</li>
         <li>Select number of search results</li>
         <li>Click Search</li>
        </ol>
        </div> )
    } else {
      const shortenedArray = movieArray.slice(0,x) // This shortens the array to show the desired number of results 
/*  
    let x = (this.props.x)-1
    let title = movieArray[x].Title;
    let year = movieArray[x].Year;
    let poster = movieArray[x].Poster;
*/  
    const movies = shortenedArray.map((movie, index) => {

    return ( 
      <div>

        <h5>Movie Title {index+1}: {movie.Title}</h5>
        <h5>Year: {movie.Year}</h5>
        <img src={movie.Poster} alt="no image available"/>
      
      {/* <h5>Description: {movieData.Plot}</h5>  */}
      </div>
    )
  })
  return (
    <div>
      <ol>{movies}</ol>
    </div>
  )
  }
}
}
