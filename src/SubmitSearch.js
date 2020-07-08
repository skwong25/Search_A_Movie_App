/**
 * Child 3 - renders search/refresh buttons
 * Stateless Functional Component 
 */

import React from 'react';
import Button from '@material-ui/core/Button';

const SubmitSearch = (props) => {
    console.log("3. I render search and refresh buttons");
    if (!props.searchStatus) {
        return ( 
            <div>
                <Button fullWidth variant="contained" color="primary" className="Search" onClick={props.handleClick} >Search</Button> 
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

