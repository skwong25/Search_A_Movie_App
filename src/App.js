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
 * Note on API request query string parameters:
 * 't=' returns a single film 
 * 's=' returns 10 films, in format: Object containing Properties. One is Search whose Value is an Array.
 * The Array contains key-value pairs, each representing a film's info.
 * { Search: [ 0:{Title: "Example", Year: "1990" ... }, 1:{}, 2:{}, 3:{} ], ...}
 * Access the film Title via e.Search. 
 * 
 * The current question:
 *    We can return a list of films, select the number of search results via dropdown menu.
 *    When the user initially loads the website, there is placeholder text that describes how to search.
 *    If no film is found, an error message shows. (Test using 'nofilm')
 *    We can sort films by alphabetical order, release year or imbd id no.
 *  
 * When the user performs a search, the input field/button should be disabled, and a progress spinner should be displayed
 * Write a unit test for sorting films alphabetically/by release date
 * When the use is performing a search, we can log how long the search took..?
 * 
 * 
 *    
 */
import React from 'react';
import logo from './logo.svg';
import './App.css';

import InputField from './InputField';
import {SubmitSearch} from './SubmitSearch';
import {SortResults} from './SortResults';
import FetchRequest from './FetchRequest';
import Output from './Output';
import {Loading} from './Loading';

class App extends React.Component {

constructor(props) {
  super(props);

  this.state = { 
    keyword: null, 
    movie: null,
    results: 1,
    searchStatus: false,
    sort: null, 
  }

  this.updateKeyword = this.updateKeyword.bind(this)
  this.updateMovie = this.updateMovie.bind (this)
  this.updateNoOfResults = this.updateNoOfResults.bind (this)
  this.updateSortCriteria = this.updateSortCriteria.bind (this)
  this.toggleSearchStatus = this.toggleSearchStatus.bind (this)

}

/*
shouldComponentUpdate(nextProps, nextState) {
  if (nextState.searchStatus === false) {
    return false;
  } else {
    return true; 
  }
} */

updateKeyword(e) {
  const keyword = e.target.value
  this.setState({ keyword: keyword });
}

updateNoOfResults(e) {
  const number = e.target.value
  this.setState( {results: number});
}

updateMovie(e) {
  console.log(e.Search); 
  const movieData = e.Search; // Films as an Array of key-value pairs [ {}, {}, {}] 
  this.setState({
    movie: movieData
  });
}  

toggleSearchStatus() {
  this.setState({
    searchStatus: true
  });
}

updateSortCriteria(e) {
  const sortCriteria = e.target.value;
  this.setState({sort: sortCriteria})
}

/*
fetchRequest() { 
  const wordQuery = this.state.keyword;
  const apiKey = '9990ead4';
  const url = 'http://www.omdbapi.com/?';
  const queryParams = 's='; 
 
  const endpoint = url + 'apikey=' + apiKey + '&' +  queryParams + wordQuery; 

  fetch(endpoint)
    .then(response => response.json())  
    .then(data => {
        if (data.Response === "False") {alert(data.Error)
        } else {
          console.log(data); 
          this.updateMovie(data);
        }
  })
} 
*/

render() {

    return (

    <div className="App">

      <InputField 
        searchStatus={this.state.searchStatus}
        updateKeyword={this.updateKeyword} 
        updateNoOfResults={this.updateNoOfResults}
        
      />

      <SortResults
        searchStatus={this.state.searchStatus}
        updateSortCriteria={this.updateSortCriteria}
      />

      <SubmitSearch
        searchStatus={this.state.searchStatus}
        handleClick={this.toggleSearchStatus} 
      />

      <FetchRequest
        searchStatus={this.state.searchStatus}
        keyword={this.state.keyword}
        updateMovie={this.updateMovie}
      />

      <Output 
        noOfResults = {this.state.results}
        movieData={this.state.movie}
        sortCriteria={this.state.sort}
        searchStatus={this.state.searchStatus}
      />

      <Loading
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


