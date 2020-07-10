/**
 * Child 2 - renders dropdown for selecting sort category  
 * Stateless Functional Component 
 */

import React from 'react';
import sortMethods from './sortMethods';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'; 
import MenuItem from '@material-ui/core/MenuItem';

const SortResults = (props) => {
    console.log("2. I let you decide how to sort results");
    const disabled = props.disabled 

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
                <Grid item md={4} lg={4} align="right">
                    <Paper>
                        <Box p={2}>
                            <InputLabel id="sort" align="right"> Sort by: </InputLabel>
                            <Select id="sort" name="sort" disabled={disabled} onChange={props.updateSortMethod}>
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
