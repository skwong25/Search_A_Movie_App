/**
 * Child 3 - renders search/refresh buttons
 * Stateless Functional Component 
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import { Obj } from './styleMe'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

const SubmitSearch = (props) => {
    console.log("3. search / refresh buttons");
    let classes = Obj.classes;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    if (!props.searchStatus) {
        return ( 
            <div>
                <Grid item xs={12} md={12} lg={12} className={classes.item}>
                    <Paper className={fixedHeightPaper}>
                        <Button fullWidth variant="contained" color="primary" className="Search" onClick={props.handleClick} >Search</Button> 
                    </Paper>
                </Grid>
            </div>
        ) 
    } else {
        return (
            <div>
                <br/>
                <Button color="primar" className="Refresh" onClick={()=>window.location.reload(false)}>Refresh</Button>
            </div>
        )
    };
}

export default SubmitSearch;

