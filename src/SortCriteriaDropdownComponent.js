/**
 * Child 2 - renders dropdown for selecting sort category  
 * Stateless Functional Component 
 */

import React from 'react';
import sortCriteria from './sortCriteriaObjects';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'; 
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const SortCriteriaDropdown = (props) => {
    console.log("2. Renders dropdown of sort criteria");

    const isItDisabled = props.isItDisabled;
    let noOfResults = props.noOfResults;
    let movieData = props.movieData;

    // Code verifies if the number of returned results is as selected. Number displays purple / pink correspondingly. 
    // This has been manually tested with keyword 'Babadook' 
    let noOfReturnedResults;
    if (movieData) {
        noOfReturnedResults = movieData.length >= noOfResults? noOfResults : movieData.length
    };
    let isEnoughResults = {color: "rebeccapurple"}
    if ( noOfReturnedResults < noOfResults ) { isEnoughResults = {color: "mediumvioletred"} }; 

    let chosenSortCriteria;
    if (props.sort) { chosenSortCriteria = props.sort.name };

    // Below code creates an array of available sort criterias, to form the dropdown list
    let arrayCriteria = [];
    for (let constant in sortCriteria) {
        arrayCriteria.push(
            <MenuItem key={sortCriteria[constant].name} value={sortCriteria[constant].name} style={{color: "mediumvioletred"}}>
                {sortCriteria[constant].userMessage}
            </MenuItem>)
    };      

    if (props.searchStatus) {      
        return (
            <div>
                 <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        {/* <Box p={1}> */}
                        <Grid item  xs={12} md={3} lg={3} >
                            <Paper>
                            {/* <Box p={1}> */}
                            <List>
                                <ListItem alignItems="center" >
                                    <ListItemText secondary="Search results requested:" />
                                    <ListItemText primary={noOfResults}/>
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="center" >
                                    <ListItemText secondary="No. of movies returned:" />
                                    <ListItemText style={isEnoughResults} primary={noOfReturnedResults}/>
                                </ListItem>
                            </List>
                            {/* </Box> */}
                            </Paper>
                            </Grid>
                        {/* </Box> */}
                        {/* <Box p={1}> */}
                        <Grid item xs={12} md={2} lg={2} >
                            <Paper>
                            <Box paddingTop={4} paddingBottom={4}>
                                <InputLabel id="sort" align="right"> Sorted by: </InputLabel>
                                <Select value={chosenSortCriteria || "IMBDID"} id="sort" name="sort" disabled={isItDisabled} onChange={props.updateSortMethod}>
                                    {arrayCriteria}
                                </Select>
                            </Box>
                            </Paper>
                        {/* </Box> */}
                        </Grid>
                    </Grid>
            </div>
        )
    } else {
        return null;
    };
}

export default SortCriteriaDropdown;

SortCriteriaDropdown.propTypes = {
    searchStatus: PropTypes.bool.isRequired,
    updateSortMethod: PropTypes.func.isRequired, 
    isItDisabled: PropTypes.bool.isRequired,
    sort: PropTypes.object,
};
