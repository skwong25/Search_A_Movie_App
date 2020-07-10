/**
 * Child 3 - renders search/refresh buttons
 * Stateless Functional Component 
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const SubmitSearch = (props) => {
    console.log("3. search / refresh buttons");
    
    if (!props.searchStatus) {
        return ( 
            <div>
                <Grid item sm={4} lg={4}>
                    <Paper>
                        <Button fullWidth variant="contained" color="primary" onClick={props.handleClick} >Search</Button> 
                    </Paper>
                </Grid>
            </div>
        ) 
    } else {
        return (
            <div>
                <Grid item sm={4} lg={4} >
                    <Paper>
                        <Button fullWidth variant="contained" color="primary" className="Refresh" onClick={()=>window.location.reload(false)}>Refresh</Button>
                    </Paper>
                </Grid>
            </div>
        )
    };
}

export default SubmitSearch;

