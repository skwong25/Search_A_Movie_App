/**
 * Parent Stateless Component
 * Presentational Component - JUST renders other components
 * In this pattern the state is passed from stateful <Parent/> to stateless <Child/>
 *    - <Parent/> renders <Child/> passing state as a prop
 *    - <Child/> access this via its props, and calls its own render. 
 * 
 * A React component should use:
 *    - 'props' to store info that can be changed by a different component
 *    - 'state' to store info that the component ITSELF can change
 *    in that vein, if <Parent/> has state, maybe it should change it too.
 * 
 * Notes on State:
 *    - To remember things, components use State
 *    - Storing the state in App, means the others are Controlled Components
 *    - We can now turn them all into function components OR stateless functional components
 * 
 * The current question:
 *    See if we can return an array of film titles, and toggle how many results we want to see with a dropdown menu
 *    (in that case, the query parameter is s=, we just have to figure out how to adjust display results)
 *    We can sort them via release date. 
 * 
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
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleData = this.handleData.bind (this)
}

handleChange(e) {
  const keyword = e.target.value
  this.setState({ keyword: keyword });
}

handleData(e) {
  const movieData = e.Search;
  console.log(movieData); 
  this.setState({movie: movieData}); // Films as an Array of key-value pairs [ {}, {}, {}]
}

  
render() {

  return (
    <div className="App">
      <h3>How to search:</h3>
      <ol>
        <li>Enter keyword</li>
        <li>Click Search</li>
      </ol>
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


