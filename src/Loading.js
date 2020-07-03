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
export class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: false}
        this.componentDidMount = this.componentDidMount.bind (this)
    }

    componentDidMount() {
      this.setState({isLoading: true});
      setTimeout(() => 
          this.setState({isLoading: false}), 1000);
    }

    render() {
        console.log("0. I am a loading message!" + this.props.searchStatus + this.state.isLoading);
        if (this.state.isLoading) {
            return (
                <div>
                    <h1>LOADING LOADING LOADING LOADING LOADING</h1>
                </div>
            )
        } else {
        return null
        };
    }
}


  