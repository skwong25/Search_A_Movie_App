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
import PropTypes from 'prop-types'; 

export class StartupLoadingMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: false}
        this.componentDidMount = this.componentDidMount.bind (this)
    }

    componentDidMount() {
      this.setState({isLoading: true});
      console.log("state: " + this.state.isLoading);
      setTimeout(() => 
          this.setState({isLoading: false}), 1000);
          console.log("state: " + this.state.isLoading);
    }

    render() {
        console.log("0. Loading message" + this.props.searchStatus + this.state.isLoading);
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

StartupLoadingMessage.propTypes = {
    searchStatus:   PropTypes.bool.isRequired,
};

  