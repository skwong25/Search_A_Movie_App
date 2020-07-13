/**
 * Child 2 - renders dropdown for selecting sort category  
 * Stateless Functional Component 
 */

import React from 'react';
import sortMethods from './sortMethods';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'; 
import MenuItem from '@material-ui/core/MenuItem';

const SortResults = (props) => {
    console.log("2. Decides how to sort results");
    const isItDisabled = props.isItDisabled;
    let sortCriteria;
    if (props.sort) { sortCriteria = props.sort.name };
    console.log("The sortCriteria should never be undefined: " + sortCriteria) 

    // Below code creates an array of available sort criterias, to form the dropdown list

    let arrayCriteria = [];
    for (let constant in sortMethods) {
        arrayCriteria.push(
            <MenuItem key={sortMethods[constant].name} value={sortMethods[constant].name} style={{color: "mediumvioletred"}}>
                {sortMethods[constant].userMessage}
            </MenuItem>)
    };      

    if (props.searchStatus) {      
        return (
            <div>
                <Grid item xs={12} md={4} lg={4} align="right">
                    <Paper>
                        <Box p={2}>
                            <InputLabel id="sort" align="right"> Sort by: </InputLabel>
                            <Select value={sortCriteria || ""} id="sort" name="sort" disabled={isItDisabled} onChange={props.updateSortMethod}>
                                {arrayCriteria}
                            </Select>
                        </Box>
                    </Paper>
                </Grid>
            </div>
        )
    } else {
        return null;
    };
}

export default SortResults;

SortResults.propTypes = {
    searchStatus: PropTypes.bool.isRequired,
    updateSortMethod: PropTypes.func.isRequired, 
    isItDisabled: PropTypes.bool.isRequired,
    sort: PropTypes.object,
};
