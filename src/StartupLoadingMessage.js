/**
 * Child Class 5 - handles loading message
 * Stateful Component Class 
 * 
 * Ideally we want it to run when a search is called, but not sure how to do this
 * 'componentDidMount' lifecycle method only calls on the FIRST RENDER 
 * 
 * Idea: If we raise the state of 'isLoading' then the other Components can return nothing WHILE isLoading = true.
 */

import React from 'react';  
import Grid from '@material-ui/core/Grid';
import Title from './TitleElement';

export class StartupLoadingMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: false}
        this.componentDidMount = this.componentDidMount.bind (this)
        this.componentWillUnmount = this.componentWillUnmount.bind (this)
    }

    componentDidMount() {
        this.setState({isLoading: true});
        console.log("component has mounted and the state is: " + this.state.isLoading);
        setTimeout(() => 
            this.setState({isLoading: false}), 1000);
            console.log("timer has started, with the state as: " + this.state.isLoading);
    }

    componentWillUnmount() { 
        console.log("component will unmount and the state is: " + this.state.isLoading);
    }

    render() {
        console.log("0. Loading message with state as: "  + this.state.isLoading);
        if (this.state.isLoading) {
            return (
                <div>
                    <Grid item>
                        <Title>...LOADING...</Title>
                    </Grid>
                </div>
            )
        } else {
        return null
        };
    }
}

/** Warning: 
 * Can't perform a React state update on an unmounted component. 
This is a no-op, but it indicates a memory leak in your application. 
To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method. 
*/

// Order of events:

// Code runs. Component mounts.
// This triggers componentDidMount which updates state to {true}
// As state is updated, it re-renders, which displays the LOADING message
// After the one second interval set by setTimeOut(), componentDidMount updates state to {false}
// As state is updated, it re-renders again, and no message is displayed. 

// Note that a component only unmounts when the parent component is no longer rendered 
// or it performs an update that does not render this instance. 
// This is in conflict with our previous assumption.

