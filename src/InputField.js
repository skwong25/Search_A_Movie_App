/**
 * Child 1 - renders input field and dropdown for selecting no. of search results
 * Stateless Functional Component 
 */

import React from 'react';
import Title from './Title'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'; 
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const InputField = (props) => {

    console.log("1. Input field and dropdown");

    if (!props.searchStatus) {  
        let noOfResults = []; 
        for (let n = 1; n< 6; n++) { 
            noOfResults.push(<option key={n}>{n}</option>) 
        }  

        return ( 
            <div>
                {/* Search Instructions */}
                <Grid container spacing={2} justify="center" align="center"     >
                    <Grid item md={4} lg={4}> 
                        <Paper align="left">
                            <Box paddingLeft={2} paddingTop={1}>
                                <Title>How to Use this App:</Title>
                            </Box>
                            <List alignItems="flex-start">
                            {[  ["1. ", "Enter keyword","Example: 'The Notebook'"], 
                                ["2. ", "Select number of search results","None selected returns 10 search results"],
                                ["3. ", "Click Search", "Bingo!"]].map((value)=> (
                                <div>
                                <Divider component="li"/>
                                <ListItem alignItems="flex-start" >
                                <ListItemText key={value[0]} primary={value[0] + value[1]} secondary={value[2]}/>
                                </ListItem>
                                </div>
                            ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item md={5} lg={5}> 
                        <Grid container direction="row" spacing={2}>
                            {/* Keyword Input */}
                            <Grid item align="left" md={5} lg={5} alignContent="flex-start" >
                                <Paper>
                                    <Box p={1} m={0}>
                                        <InputLabel id="search">Enter keyword:</InputLabel>
                                        <Input
                                            type="text"
                                            name="search"
                                            id="search" 
                                            onChange={props.updateKeyword}
                                            required
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                            {/* Dropdown List for No. of Results */}
                            <Grid item align="right" md={3} lg={3} > 
                                <Paper>
                                    <Box p={1} m={0}>
                                        <InputLabel id="number">No. of Results</InputLabel>
                                        <Select id="number" name="number" data-testid="dropdown" onChange={props.updateNoOfResults}>
                                            {noOfResults}
                                        </Select>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/* Quotes */}
                            <Grid item alight="right" md={8} lg={8}>
                                <Paper height={50}>
                                    <Box p={1}>
                                        <Typography align="left" variant='subtitle2'>"Everything I learned I learned from the movies."</Typography>
                                    </Box>
                                    <Box paddingRight={3} paddingBottom={4}>
                                        <Typography align='right'variant='subtitle2' color="secondary"> - Audrey Hepburn </Typography>
                                    </Box>
                                    <Divider/>
                                    <Box p={1}>
                                        <Typography align="left" variant='subtitle2'>“No good movie is too long and no bad movie is short enough.”</Typography>
                                    </Box>
                                    <Box paddingRight={3} paddingBottom={3}>
                                        <Typography align='right'variant='subtitle2' color="secondary"> - Roger Ebert </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        ) 
    } else {
        return null;
    };
}

export default InputField;

// The Select dropdown component functionality broken - does not update State in App.js onChange
// Check if onChange is a legitimate attribute. 
