/**
 * Child Class 3 - formats (sorts/reduces) data and displays data
 * Stateless Component Class (could be turned into a function component )
 */
import React from 'react';

export class Output extends React.Component {

  render() {

    console.log("4. I sort and display results");
    let searchStatus = this.props.searchStatus
    const movieArray = this.props.movieData; 
     
    if (!searchStatus) {   
        return null;
    } 

    const noOfResults = this.props.noOfResults;
    let shortenedArray = movieArray.slice(0, noOfResults ) 
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
      <div key={movie.imdbID}>

        <h5>Movie {index+1}: {movie.Title}</h5>
        <h5>Year: {movie.Year} &nbsp; IMBD ID. : {movie.imdbID}</h5>
        <img src={movie.Poster} alt="no graphic available"/>
      
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