/**
 * Child Class 3 - to handle the output text 
 * Stateless Component Class (could be turned into a function component )
 */
import React from 'react';

export class Output extends React.Component {

  render() {

    let searchStatus = this.props.searchStatus
    const movieArray = this.props.movieData; 
     
    if (!searchStatus) {   
        return ( 
        <div>
          <h3>How to search:</h3>
        <ol>
         <li>Enter keyword</li>
         <li>Select number of search results</li>
         <li>Click Search</li>
        </ol>
        </div> )
    } 

    const x = this.props.x;
    let shortenedArray = movieArray.slice(0,x) // reflects no. of search results
    let newArray = shortenedArray; 
    const sortCriteria = this.props.sortCriteria;

    if (sortCriteria) {
      
      console.log("searchStatus: " + searchStatus + " / Sort criteria: " + sortCriteria)

      const compare = (a,b) => {

        const movieA = a[sortCriteria]
        const movieB = b[sortCriteria]
        
        let comparison = 0;
        if (movieA > movieB) {comparison = 1;}
        else if (movieA < movieB) {comparison = -1;}
        return comparison;
      }
      
      newArray = shortenedArray.sort(compare); 
    }
        
    const movies = newArray.map((movie, index) => { 
    return ( 
      <div>

        <h5>Movie {index+1}: {movie.Title}</h5>
        <h5>Year: {movie.Year} &nbsp; IMBD ID. : {movie.imdbID}</h5>
        <img src={movie.Poster} alt="no image available"/>
      
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