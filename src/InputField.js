/**
 * Child 1 - renders input field and dropdown for selecting no. of search results
 * Stateless Functional Component 
 */

import React from 'react';
import Title from './Title'; 
import Typography from '@material-ui/core/Typography';
import { Obj } from './styleMe'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'; 
import clsx from 'clsx';

const InputField = (props) => {

    let classes = Obj.classes;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    console.log("1. I am an input field and dropdown!");

    if (!props.searchStatus) {  
        let noOfResults = []; 
        for (let n = 1; n< 6; n++) { 
            noOfResults.push(<option key={n}>{n}</option>) 
        }  

        return ( 
            <div>
                <Grid item xs={12} md={12} lg={12} className={classes.item}> 
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

                <Grid item xs={12} md={12} lg={12} className={classes.item}> 
                    <Paper className={fixedHeightPaper}>
                <form className={classes.form} noValidate>

                <InputLabel id="search">Keyword:</InputLabel>
                <Input
                type="text"
                name="search"
                id="search" 
                onChange={props.updateKeyword}
                variant="outlined"
                margin="none"
                required
                // fullWidth
                label="example: 'notebook' "
                autoComplete="notebook"
                autoFocus
                />
                </form>
                </Paper>
                </Grid>
                <br/>
                <Grid item xs={12} md={12} lg={12} className={classes.item}> 
                    <Paper className={fixedHeightPaper}>
                <InputLabel id="number">Number of Results</InputLabel>
                <Select 
                    id="number" 
                    name="number" 
                    defaultValue="1"
                    autoWidth
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
