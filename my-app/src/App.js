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
 *    We can return a list of films, select the number of search results via dropdown menu.
 *    When the user initially loads the website, there is placeholder text that describes how to search.
 *    If no film is found, an error message shows. (Test using 'nofilm')
 * 
 * We can introduce a function to search by year 
 * - we need to push the nested objects into an array of objects, we can use sort() to sort them by year or title 
 * How can we sort films by alphabetical order or release date? 
 * When the user performs a search, the input field/button should be disabled, and a progress spinner should be displayed
 * 
Write a unit test for sorting films alphabetically/by release date
When the use is performing a search, we can log how long the search took..?
 * 
 * 
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
    movie: null,
    number: 1,
    searchStatus: false,
    sort: null, 
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleData = this.handleData.bind (this)
  this.handleNumber = this.handleNumber.bind (this)
  this.handleSort = this.handleSort.bind (this)
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
  const movieData = e.Search; // Films as an Array of key-value pairs [ {}, {}, {}] 
  this.setState({
    movie: movieData,
    searchStatus: true
  });
}  

handleSort(e) {
  console.log(this.state.sort)
  const sortCriteria = e.target.value;
  console.log(sortCriteria);
  this.setState({sort: sortCriteria})
  console.log(this.state.sort); // Our problem is the update state is a bit laggy. 
}

render() {

  return (
    <div className="App">
      <InputField 
        onChange={this.handleChange} 
        handleNumber={this.handleNumber}
        searchStatus={this.state.searchStatus}
        handleSort={this.handleSort}
      />

      <GetRequest 
        keyword={this.state.keyword}
        handleData={this.handleData}
        searchStatus={this.state.searchStatus}
      />
      <Output 
        x = {this.state.number}
        movieData={this.state.movie}
        keyword={this.state.keyword}
        sortCriteria={this.state.sort}
        searchStatus={this.state.searchStatus}
      />

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


