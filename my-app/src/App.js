/**
 * Parent Stateless Component
 * Presentational Component - this JUST renders the 
 * In this pattern the state is NOT passed from stateful to stateless - what would that look like?
 *    - in 011, we passed state from a <Parent/> to a <Child/> component
 *    - this meant the <Parent/> was the one rendering the <Child/> 
 *    - ie. We render <Parent/> by calling ReactDom.render(</>), with state of {name: "Frarthur"}
 *    - <Parent/> renders <Child/> passing its state as a prop
 *    - <Child/> access this via its props, and calls its own render. 
 *    - This is similar to what we are doing below EXCEPT we are not passing a state. 
 *    - The state is held and controlled in the Child class. 
 *    - Would it be better for the state to be in the Parent class? 
 * 
 * A React component should use:
 *    - 'props' to store info that can be changed by a different component
 *    - 'state' to store info that the component ITSELF can change
 *    in that vein, if <Parent/> has state, maybe it should change it too.
 * 
 * The current question:
 *    Can we 'lift state' and (read up again what lifting state is)
 *    have the two <Child/>s as stateless functional components?
 *    Possibly we want to add a third component just to render the output?
 * 
 *    Then we can revisit the task, and see if there's a way to return an ARRAY of films. 
 *  
 */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import {InputField} from './InputField';
import {GetRequest} from './GetRequest';
import {Output} from './Output';

class App extends React.Component {

constructor(props) {
  super(props);

  this.state = { 
    keyword: null, 
    movie: {}
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleData = this.handleData.bind (this)
}

handleChange(e) {
  const keyword = e.target.value
  this.setState({ keyword: keyword });
}

handleData(e) {
  this.setState({movie: e});
}

  
render() {

  return (
    <div className="App">
      <InputField onChange={this.handleChange}/>
      <GetRequest 
        keyword={this.state.keyword}
        handleData={this.handleData}
      />
      <Output movieData={this.state.movie}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
       
    </div>
    );
  }

}

export default App;


