/**
 * Parent Stateful Component
 * Handles State and Renders Child Components (Presentational Component?)
 * 
 * In this pattern the state is passed from stateful <Parent/> to stateless <Child/>
 *    - <Parent/> renders <Child/> passing state as a prop
 *    - <Child/> access this via its props, and calls its own render. 
 * 
 * A React component should use:
 *    - 'props' to store info that can be changed by a different component
 *    - 'state' to store info that the component ITSELF can change
 * 
 * Notes on State:
 *    - To remember things, components use State
 *    - Storing the state in App, means the others are Controlled Components
 *    - We can now turn them all into function components OR stateless functional components
 * 
 * The current question:
 *    We can return a list of films, select the number of search results via dropdown menu (max 5)
 *    When the use is performing a search, we can log how long the search took..?
 *    meaning also any 'Submit' clicks are ignored, how can we disable the input field? 
 * 
 *    If no film is found, an error message can show. 
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
    movie: null,
    number: 1
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleData = this.handleData.bind (this)
  this.handleNumber = this.handleNumber.bind (this)
}

handleChange(e) {
  const keyword = e.target.value
  this.setState({ keyword: keyword });
}

handleNumber(e) {
  const number = e.target.value
  this.setState( {number: number});
}

handleData(e) {
  const movieData = e.Search; 
  this.setState({movie: movieData}); // Films as an Array of key-value pairs [ {}, {}, {}]
  }
  
render() {

  return (
    <div className="App">
      <InputField 
        onChange={this.handleChange} 
        handleNumber={this.handleNumber}/>

      <GetRequest 
        keyword={this.state.keyword}
        handleData={this.handleData}
      />
      <Output 
        x = {this.state.number}
        movieData={this.state.movie}
        keyword={this.state.keyword}/>
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
    )
  }

}

export default App;


