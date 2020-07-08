/**
 * Child 1 - renders input field and dropdown for selecting no. of search results
 * Stateless Functional Component 
 */

import React from 'react';
import Title from './Title'; 
import { Obj } from './styleMe'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'; 
import clsx from 'clsx';

const InputField = (props) => {

    console.log("1. Input field and dropdown");
    let classes = Obj.classes;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    if (!props.searchStatus) {  
        let noOfResults = []; 
        for (let n = 1; n< 6; n++) { 
            noOfResults.push(<option key={n}>{n}</option>) 
        }  

        return ( 
            <div>
                {/* Search Instructions */}
                <Grid item xs={12} md={12} > 
                    <Paper className={fixedHeightPaper}>
                        <Title>How to Search:</Title>
                        <ol>
                            <li>Enter keyword</li>
                            <li>Select number of search results</li>
                            <li>Click Search</li>
                        </ol>
                        <br/>
                    </Paper>
                </Grid>
                {/* Keyword Input */}
                <Grid item xs={12} md={12} lg={12}> 
                    <Paper className={fixedHeightPaper}>
                        <InputLabel id="search">Search:</InputLabel>
                        <Input
                            type="text"
                            name="search"
                            id="search" 
                            onChange={props.updateKeyword}
                            variant="outlined"
                            margin="none"
                            required
                            fullWidth
                        />
                    </Paper>
                </Grid>
                <br/>
                <Grid item xs={12} md={12} className={classes.item}> 
                    <Paper>
                        <InputLabel id="number">Number of Results</InputLabel>
                        <Select 
                            id="number" 
                            name="number" 
                            data-testid="dropdown" 
                            onChange={props.updateNoOfResults}>
                            {noOfResults}
                        </Select>
                    </Paper>
                </Grid>
                <br/>
            </div>
        ) 
    } else {
        return null;
    };
}

export default InputField;

// The Select dropdown component functionality broken - does not update State in App.js onChange
// Check if onChange is a legitimate attribute. 
