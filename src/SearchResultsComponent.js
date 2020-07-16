/**
 * Child Class 3 - formats (sorts/reduces) data and displays data
 * Stateless Component Class (could be turned into a function component )
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleObject } from './styleObject'; 

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SearchResults = (props) => {

    console.log("4. sorts & displays results, searchStatus:" + props.searchStatus + "  & keyword: " + props.keyword);

    let classes = StyleObject.classes;
     
    if (props.movieData) {
        console.log("Output.js has successfully received movieData props")
        const movieArray = props.movieData;             // available results  
        const noOfResults = props.noOfResults;         // How many search results requested - default: '10' 
        const noOfReturnedResults = movieArray.length >= noOfResults? noOfResults : movieArray.length  // How many search results returned 
        let shortenedArray = movieArray.slice(0, noOfResults);
        let newArray = shortenedArray; 

        
        // For eg, if it returns 10 but we only want 5, the number displayed will be 5 
        if (props.sortObject) {
            let sortObject = props.sortObject;
            console.log("Sort criteria: " + sortObject.userMessage)
            newArray = shortenedArray.sort(sortObject.comparator); 
        };
        
        const movies = newArray.map((movie, index) => { 
            let indexPlus = index + 1  
            return ( 
                <div key={movie.imdbID} data-testid={ "SK" + indexPlus }>
                    <Box p={2} component="div" overflow="hidden">
                        <Grid item key={movie.imdbID} align="left   ">
                            <Paper elevation={1} style={{ maxHeight: "900px" }}> 
                                <Box p={2} component="div" overflow="hidden"> 
                                    <Paper elevation={0}>
                                        <img height="300" src={movie.Poster} alt="no graphic available"/>
                                    </Paper>
                                    <br/>
                                    <Grid container spacing={0} justify="flex-start" alignItems="flex-start">
                                        <Grid item>
                                            <List>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemText secondary={index+1 + "/" + noOfReturnedResults}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        data-testid={ "Movie " + indexPlus }
                                                        primary = { movie.Title? "Title: " + movie.Title : "Title: N/A" }
                                                        secondary={ movie.Year? "Released in: " + movie.Year : "Released in: N/A" }>
                                                    </ListItemText>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        secondary={ movie.imdbID? "IMDB ID.: " + movie.imdbID : "IMDB ID.: N/A" }>
                                                    </ListItemText>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        secondary={<a href={ "https://www.imdb.com/title/" + movie.imdbID} target="blank" >Link to Imdb page</a>}>
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    </Grid>
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
                        <Grid container data-testid="finalMovies" display="flex" direction="row" justify="center" alignItems="stretch">
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

export default SearchResults;

SearchResults.propTypes = {
    noOfResults: PropTypes.number.isRequired,  // If none selected, defaults to '10' 
    movieData: PropTypes.array, // No isRequired as initial props passed === null
    sortObject: PropTypes.object, // No isRequired as initial props passed === null
    searchStatus: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired, // Both null & empty string "" evaluate to falsey 
};

