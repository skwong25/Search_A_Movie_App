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
 */

import React from 'react';
import './App.css';

import InputField from './InputFieldComponent';
import SearchButton from './SearchButtonComponent';
import SortCriteriaDropdown from './SortCriteriaDropdownComponent';
import SearchResults from './SearchResultsComponent';
import {StartupLoadingMessage} from './StartupLoadingMessage';
import sortCriteria  from './sortCriteriaObjects';

import { StyleObject } from './styleObject';
import notAMagicNumber from './numbers';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class MovieApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            keyword: "", 
            movie: null,
            results: notAMagicNumber,
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
            const sortObject = sortCriteria[sortName]; // evaluates to enumerator object accessed via imported JS module 
            console.log("updating sort method with constant: " + sortName + ", category: " + sortObject.category) ;
            this.setState({sort: sortObject}); // this should update state to the relevant Object 
        }
    }

    fetchMovieData() {
        if (this.state.keyword) { // "" empty string both evaluates to falsey and fulfills propTypes.string validation
            console.log("we are about to make a fetch request with " + this.state.keyword)
            const wordQuery = this.state.keyword;
            const apiKey = '9990ead4';
            const url = 'https://www.omdbapi.com/?';
            const queryParams = 's='; 
            const endpoint = url + 'apikey=' + apiKey + '&' +  queryParams + wordQuery;
            const main = document.getElementById("loading");
            main.innerHTML = "<p>...SEARCHING..."
             
            fetch(endpoint)
            .then(response => response.json())  
            .then(data => {
                if (data.Response === "False") { 
                    alert(data.Error);
                } else {
                    console.log("fetch request has been successful"); 
                    const movieData = data.Search; // Films as an Array of key-value pairs [ {}, {}, {}] 
                    this.setState({movie: movieData});
                    this.setState({isPerformingSearch: true});
                    main.innerHTML = "";
                };
            }) 
        };
    }

    render() { 

        let classes = StyleObject.classes;        
        return (
            <div>
                <header>
                {/* Header */}
                <AppBar position="static">
                    <Toolbar 
                        className={classes.toolbar} 
                        style={{ 
                            color: "white", 
                            backgroundImage: "url('./images/MovieBanner.png')",
                        }}
                    >
                        <Button>
                        <a href="https://www.bbcgoodfood.com/user/4010681/recipe/perfect-popcorn" target="_blank" rel="noopener noreferrer">
                            <img alt="logo" src="./images/popcornFavicon.ico" />
                        </a>
                        </Button>
                        <Typography 
                            style={{ 
                                color: "white", 
                                backgroundColor: "grey",
                            }}
                            variant="h6" 
                            className={classes.title}
                        >
                            Welcome to Suzanna's Movie App
                        </Typography>
                    </Toolbar>
                </AppBar>
                </header>
                <Grid container className={classes.root} spacing={2} direction="column">
                    <Grid item align="center"> 
                        {/* StartUp Loading Message */}  
                        <StartupLoadingMessage/>
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
                        <SortCriteriaDropdown
                            noOfResults={this.state.results}
                            movieData={this.state.movie} 
                            searchStatus={this.state.isPerformingSearch}
                            sort={this.state.sort} //  { name: ... , userMessage: ... , category: ... }
                            updateSortMethod={this.updateSortMethod}
                            isItDisabled={this.state.results === 1}
                        />
                    </Grid>
                    <Grid item align="center">
                        {/* Search Button */}
                        <SearchButton
                            searchStatus={this.state.isPerformingSearch}
                            handleClick={this.fetchMovieData} 
                        />    
                    </Grid>
                    <Grid item align="center">
                        {/* Search Results Text and Movie Data */}
                        <SearchResults
                            noOfResults={this.state.results}
                            movieData={this.state.movie}
                            sortObject={this.state.sort}
                            searchStatus={this.state.isPerformingSearch}
                            keyword={this.state.keyword}
                        />
                        {/* Search Loading Message */}
                        <div id="loading"></div>
                    </Grid>
            </Grid>
            </div>
        );
    }
}

export default MovieApp;