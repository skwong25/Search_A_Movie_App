/**
 * Child Class 3 - formats (sorts/reduces) data and displays data
 * Stateless Component Class (could be turned into a function component )
 */
import React from 'react';

const Output = (props) => {

    console.log("4. I sort and display results");
    console.log("searchStatus:" + props.searchStatus);
     
    if (props.searchStatus && props.movieData) {

    console.log("do we get this far?")
    const movieArray = props.movieData; 
    const noOfResults = props.noOfResults;
    let shortenedArray = movieArray.slice(0, noOfResults ) 
    let newArray = shortenedArray; 
    const sortCriteria = props.sortCriteria;

    if (sortCriteria) {
      
      console.log("searchStatus: " + props.searchStatus + " / Sort criteria: " + sortCriteria)

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
        {/* <button>BYE</button> */}
        <ol>{movies}</ol>
      </div>
      )
    } else {   
      return null; 
  }
}   

export default Output;