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
 */
import React from 'react';
import './App.css';


import InputField from './InputField';
import SubmitSearch from './SubmitSearch';
import SortResults from './SortResults';
import Output from './Output';
import {Loading} from './Loading';
import sortMethods  from './sortMethods';
import { Obj } from './styleMe';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            keyword: "", 
            movie: null,
            results: 1,
            isPerformingSearch: false,
            sort: null,  // or Object 
        }

        this.updateKeyword = this.updateKeyword.bind(this);
        this.updateNoOfResults = this.updateNoOfResults.bind (this);
        this.updateSortMethod = this.updateSortMethod.bind (this);
        this.fetchMovieData = this.fetchMovieData.bind (this);
    } 

    updateKeyword(e) {
        const keyword = e.target.value;
        this.setState({keyword: keyword});
    }

    updateNoOfResults(e) {
        const number = e.target.value;
        this.setState({results: number});
    }

    updateSortMethod(e) {
        if (e) {
            const sortName = e.target.value; // gets constant name E.g: TITLE_ASCENDING
            const sortObject = sortMethods[sortName]; // evaluates to enumerator object accessed via imported JS module 
            console.log("constant: " + sortName + ", category: " + sortObject.category) ;
            this.setState({sort: sortObject}); // this should update state to the relevant Object 
        }
    }

    fetchMovieData() {
        if (this.state.keyword) { // "" empty string both evaluates to falsey and fulfills propTypes.string validation
            console.log("the search begins...with " + this.state.keyword)
            const wordQuery = this.state.keyword;
            const apiKey = '9990ead4';
            const url = 'http://www.omdbapi.com/?';
            const queryParams = 's='; 
            const endpoint = url + 'apikey=' + apiKey + '&' +  queryParams + wordQuery;
             
            fetch(endpoint)
            .then(response => response.json())  
            .then(data => {
                if (data.Response === "False") { 
                    alert(data.Error);
                } else {
                    console.log("did we get here?"); 
                    const movieData = data.Search; // Films as an Array of key-value pairs [ {}, {}, {}] 
                    this.setState({movie: movieData});
                    this.setState({isPerformingSearch: true});
                };
            }) 
        };
    }

    render() { 

        let classes = Obj.classes;
        
        return (
            <div>
                <Grid container className={classes.root} spacing={2} direction="column">
                    <Box paddingBottom={5}>
                    <Grid item align="center">
                        {/* Header */}
                        <div className="Header" style={{ color: "white", backgroundColor: "mediumvioletred" }}>
                            <header>
                                <Box p={5}>
                                    <Typography align="center" component="h1" variant="h5">
                                        @( * ____ * )@      
                                    </Typography>
                                </Box>
                            </header>
                        </div>
                    </Grid>
                    </Box>
                    <Grid item align="center">   
                        {/* Loading Message */}
                        <Loading
                            searchStatus={this.state.isPerformingSearch}
                        />
                    </Grid> 
                    <Grid item align="center">
                        {/* Input Fields */}
                        <InputField 
                            searchStatus={this.state.isPerformingSearch}
                            noOfResults={this.state.results}
                            updateKeyword={this.updateKeyword} 
                            updateNoOfResults={this.updateNoOfResults}
                            
                        />
                    </Grid>
                    <Grid item align="center">
                        {/* Sort Results */}
                        <SortResults
                            searchStatus={this.state.isPerformingSearch}
                            sort={this.state.sort} //  { name: ... , userMessage: ... , category: ... }
                            updateSortMethod={this.updateSortMethod}
                            isItDisabled={this.state.results === 1}
                        />
                    </Grid> 
                    <Grid item align="center">
                        {/* Search Button */}
                        <SubmitSearch
                            searchStatus={this.state.isPerformingSearch}
                            handleClick={this.fetchMovieData} 
                        />    
                    </Grid>
                    <Grid item align="center">
                        {/* Output Text */}
                        <Output 
                            noOfResults={this.state.results}
                            movieData={this.state.movie}
                            sortObject={this.state.sort}
                            searchStatus={this.state.isPerformingSearch}
                            keyword={this.state.keyword}
                        />
                    </Grid>
            </Grid>
            </div>
        );
    }
}

export default App;