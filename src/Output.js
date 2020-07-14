/**
 * Child Class 3 - formats (sorts/reduces) data and displays data
 * Stateless Component Class (could be turned into a function component )
 */

import React from 'react';
import PropTypes from 'prop-types';

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
                    <Box p={2}>
                    <Grid item key={movie.imdbID}>
                        <Paper>
                            <Box p={2}>
                                <h5>Movie {index+1}: {movie.Title || "N/A"}</h5>
                                <h5>Year: {movie.Year || "N/A" } &nbsp; IMBD ID.: {movie.imdbID || "N/A" }</h5>
                                <img src={movie.Poster} alt="no graphic available"/>
                            </Box>
                        </Paper>
                    </Grid>
                    </Box>
                </div>
            )
        })

        return (

            <div>
                <Grid container className={classes.root} justify="center">
                    <Grid item>
                        <Grid container data-testid="finalMovies" direction="row" justify="center">
                                {movies}
                        </Grid>
                    </Grid>
                </Grid>
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
                     Press SEARCH to return {props.noOfResults || ""} results
                    </Typography>
                    </Box>
                    </Paper>
                </Grid>
            </div>
        )
    };
} 

export default Output;

Output.propTypes = {
    noOfResults: PropTypes.number.isRequired, 
    movieData: PropTypes.array, // No isRequired as initial props passed === null
    sortObject: PropTypes.object, // No isRequired as initial props passed === null
    searchStatus: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired, // Both null & empty string "" evaluate to falsey 
};

