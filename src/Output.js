/**
 * Child Class 3 - formats (sorts/reduces) data and displays data
 * Stateless Component Class (could be turned into a function component )
 */

import React from 'react';

import { Obj } from './styleMe'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import clsx from 'clsx';


const Output = (props) => {

    let classes = Obj.classes;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    console.log("4. I sort and display results");
    console.log("searchStatus:" + props.searchStatus + " keyword: " + props.keyword);
     
    if (props.movieData) {
        console.log("do we get this far?")
        const movieArray = props.movieData; 
        const noOfResults = props.noOfResults;
        let shortenedArray = movieArray.slice(0, noOfResults);
        let newArray = shortenedArray; 

        if (props.sortObject) {
            let sortObject = props.sortObject;
            console.log("searchStatus: " + props.searchStatus + " / Sort criteria: " + sortObject.userMessage)
            newArray = shortenedArray.sort(sortObject.comparator); 
        };

        const movies = newArray.map((movie, index) => {  
            return ( 
                <div key={movie.imdbID}>
                    <h5>Movie {index+1}: {movie.Title || "N/A"}</h5>
                    <h5>Year: {movie.Year || "N/A" } &nbsp; IMBD ID.: {movie.imdbID || "N/A" }</h5>
                    <img src={movie.Poster} alt="no graphic available"/>
                </div>
            )
        })

        return (

            <div>
                <ol>{movies}</ol>
            </div>
        )

    } else {   
        return (
            
            <div>
                <Grid item xs={12} md={12} lg={12} className={classes.item}> 
                    <Paper className={fixedHeightPaper}>
                <h5>the keyword is {props.keyword || '???'}</h5>
                <h5>press submit to return {props.noOfResults} results</h5>
                </Paper>
                </Grid>
            </div>
        )
    };
} 

export default Output;