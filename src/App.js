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
import clsx from 'clsx';

import InputField from './InputField';
import SubmitSearch from './SubmitSearch';
import SortResults from './SortResults';
import Output from './Output';
import {Loading} from './Loading';
import sortMethods  from './sortMethods';
import { Obj } from './styleMe'; 

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            keyword: null, 
            movie: null,
            results: 1,
            isPerformingSearch: false,
            sort: null, 
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
            console.log("constant: " + sortName);
            const sortObject = sortMethods[sortName]; 
            console.log(sortObject.category);
            this.setState({sort: sortObject}); // this should update state to the relevant Object 
        }
    }

    fetchMovieData() {
        if (this.state.keyword) {
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
        console.log(Obj.drawerWidth);

        return (
            <div>
                {/* Title */}
                <Typography align="center" component="h1" variant="h5" color="initial" noWrap className={{flexGrow: 1}}>
                    Title: Movie App
                </Typography>
                <Container fullWidth direction= "column"> 
                    <Grid container spacing={0} direction= "column" justify = "center" alignItems = "center"> 
                        {/* Input Fields */}
                        <InputField 
                            searchStatus={this.state.isPerformingSearch}
                            updateKeyword={this.updateKeyword} 
                            updateNoOfResults={this.updateNoOfResults}
                        />
                        {/* Search Button */}
                        <SubmitSearch
                            searchStatus={this.state.isPerformingSearch}
                            handleClick={this.fetchMovieData} 
                        />    
                        {/* Output Text */}
                        <Output 
                            noOfResults={this.state.results}
                            movieData={this.state.movie}
                            sortObject={this.state.sort}
                            searchStatus={this.state.isPerformingSearch}
                            keyword={this.state.keyword}
                        />
                        {/* Sort Results */}
                        <SortResults
                            searchStatus={this.state.isPerformingSearch}
                            updateSortMethod={this.updateSortMethod}
                            disabled={this.state.results === 1}
                        />
                        {/* Loading Message */}
                        <Loading
                            searchStatus={this.state.isPerformingSearch}
                        />
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default App;