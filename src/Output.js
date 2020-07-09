/**
 * Child Class 3 - formats (sorts/reduces) data and displays data
 * Stateless Component Class (could be turned into a function component )
 */

import React from 'react';

import { Obj } from './styleMe'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Output = (props) => {

    console.log("4. sorts & displays results");
    console.log("searchStatus:" + props.searchStatus + " keyword: " + props.keyword);

    let classes = Obj.classes;
     
    if (props.movieData) {
        console.log("Output.js has received movieData props")
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
                
                <Grid item sm={4} lg={4}> 
                    <Paper className={classes.paper}>
                    <Box p={1} m={1}>
                    <Typography align="left" variant="body2" padding={5}>
                     The keyword is {props.keyword || '???'}
                     </Typography>
                     <Typography align="left" gutterBottom variant="body2">
                     Press SEARCH to return {props.noOfResults} results
                    </Typography>
                    </Box>
                    </Paper>
                </Grid>
            </div>
        )
    };
} 

export default Output;

/*
                        <TextField 
                            id="filled-basic"
                            variant="filled"
                            label="lord">
                        </TextField>
*/