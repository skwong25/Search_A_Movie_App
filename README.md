
# Suzanna's Movie App #

## An App for Movie Searches

Searches for movies by keyword using the OMDB API, displaying information to the user and allowing them to sort results

User Reviews:

> "The stuff of dreams" - Suzanna herself
> "The OmDb database won't know what's hit it" - Anonymous

## Getting Started

Run `npm start` or `npm test` in Terminal 

## Motivation

This is my first app I have created to put knowledge learnt of **Javascript** and **HTML** into practice. 
It allowed the opportunity to engage with **React**, using `<Components>` and **CSS** Styling to produce a user interface. 

It also involved establishing a **gitHub** workflow, using *pull requests*, *branches* and *documentation* to maintain a repository in collaboration with reviewers and contributors. 


## Code Style

This project follows standard JS codestyle and *contributions should be validated locally with ESLint*.

## Tech/Framework Used

- [ReactJS](https://reactjs.org/) 
- [Material UI](https://material-ui.com/)
- [Jest testing framework](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features
This project demonstrates ```rigour through testing``` and validation of input / output. Tests written using React Testing Library verify Component behaviour and expected end-user experience. Components implement typechecking of passed props via [propTypes](https://reactjs.org/docs/typechecking-with-proptypes.html). [ESLint](https://eslint.org/) provides an additional syntax check. The user interface is designed to provide visible validation of user input in several instances, and highlights to a user when a request has not been met via alerts or styling. 

The project seeks to create a ```clear and simple layout``` for ease of navigation. Instructions are provided on the opening page as a prompt and assist. Search results are organised in a clear consistent layout for legibility. 


## Code Walkthrough

### Movie App ###
MovieApp is the Parent Component Class and renders Child Components. It manages state and passes props to its five children. It also executes a HTTP request to the OMDb API.

```javascript
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
```

### Input Field ###
`<InputField/>` renders static text and interactive elements: an input field and dropdown list of numbers. 

When a user types into the input field, this updates `MovieApp.state.keyword` via MovieApp's `updateKeyword()` function.

When a user selects a number from the dropdown, this updates `MovieApp.state.results` via MovieApp's `updateNoOfResults()` function. This determines the number of search results that the app returns. If none are selected, 10 results are returned by default. 

If a search has been run, InputField will not render the above elements. 

<img src="./images/movieAppScreenshot.png" width="450" alt="screenshot1">

### Search Button ###
`<SearchButton/>` initially renders a search button. 
If no keyword has been provided, the search button is inert. 

If a keyword is provided, clicking the search button fires a HTTP GET request to OmDb API via MovieApp's `fetchMovieData()` function. 

If no data is found, the app fires an alert message. 

<img src="./images/alertScreenshot.png" width="450" alt="screenshot2">

The data returned is an array of nested objects containing information in key-value pairs. Each object represents one movie. `fetchMovieData()` stores this data by updating MovieApp.state.movie.

fetchMovieData() updates `MovieApp.state.isPerformingSearch` to `true` to indicate a search has been run. 

```javascript
fetchMovieData() {
        if (this.state.keyword) { 
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
                    const movieData = data.Search;  
                    this.setState({movie: movieData});
                    this.setState({isPerformingSearch: true});
                };
            }) 
        };
    }
```


### Search Results ###
If a search has not been run, `<SearchResults/>` renders responsive text echoing the current value of the input field and number of results. 
If a search has been run, `<SearchResults/>` receives `MovieApp.state.movie` as `props` and renders the object as text and imagery.

The search results display image, title, release date (year) and ImDb ID no for each movie by mapping through the array of nested objects. A hyperlink links to that movie's ImDb page.

```javascript
const movies = newArray.map((movie, index) => { 
            return ( 
                <div 
                    key={movie.imdbID} 
                    data-testid={ "SK" + indexPlus }>   
                ...
            )
}                        
```

<img src="./images/movieInfoScreenshot.png" width="450" alt="screenshot3">

### Sort Criteria Dropdown ###
If a search has been run, `<SortCriteriaDropdown/>` renders static text and a dropdown list. Note that when only one search result is returned, the dropdown list is disabled. 

<img src="./images/searchResultsScreenshot.png" width="450" alt="screenshot4">

The static text allows the user to see if the number of results returned is as per their selection. 
If it is, the text is purple. If it is not, the text will be pink.

<img src="./images/lessResultsScreenshot.png" width="450" alt="screenshot5">

The dropdown list allows movie results to be sorted by several categories such as 'Title A-Z'. 

<img src="./images/sortDropdownScreenshot.png" width="450" alt="screenshot6">

When a user selects an option, this updates `MovieApp.state.sort` with the relevant Object imported from SortCriteriaObjects.js.

 `<SearchResults/>` receives this Object as props, sorts the results accordingly and re-renders.

### Sort Criteria Objects.js ###
A Module containing enumerated Objects, imported and used by `<MovieApp/>` and `<SortCriteriaDropdown/>`
The Object holds information for each sort category, including a callback comparator function ready to be passed as an argument to `array.sort()` to sort search results. 

```javascript
function sortMovies (a, b, propertyName) {
    const movieA = a[propertyName]; 
    const movieB = b[propertyName];         
    let comparison = 0;

    if (movieA > movieB) {
        comparison = 1
    } else if (movieA < movieB) {
        comparison = -1
    };
    return comparison;
}

const sortCriteria= {

        IMBDID : {
            name: "IMBDID",
            userMessage: "imdbID no.", 
            category: "imdbID",
            comparator(a,b) {
                return sortMovies(a, b, "imdbID");
            }
        },
```

## API Reference

Omdb API full reference docs here: http://www.omdbapi.com/

All data requests to be sent to:
http://www.omdbapi.com/?apikey=[yourkey]&

Search for multiple films by title using parameter 's'
Search results will return key information only: Title, ID no. , release Year and a Poster image. 

Search for a single film by ID or Title using parameters 'i' and 't' respectively
A successful search result will comprise of lots of additional information about the movie. 

## Tests

A test suite is written for each Child Component using React Testing Library and jest. See example below: 

```javascript
test('test1 - renders movie name, year, Imdb ID and an image', () => {
    render( 
        <SearchResults 
            keyword=""
            noOfResults={10}
            searchStatus={true} 
            movieData={[{ Title: "Pocahontas", Year: "1990", imdbID: "012345", Poster: "image.jpg" }]} 
        /> 
    );
    let element = screen.getByText(/title/i);
    expect(element.textContent).toBe("Title: Pocahontas");
    
    element = screen.getByText(/released/i)
    expect(element.textContent).toBe("Released in: 1990");

    element = screen.getByText(/IMDB ID.:/i)
    expect(element.textContent).toBe("IMDB ID.: 012345");
    
    element = screen.getByAltText("no graphic available");
    expect(element).toBeInTheDocument();  
});
```

To run tests, run `npm test` in Terminal. The results will indicate if a test has failed. If all tests pass, you will see the screen below:

<img src="./images/testsScreenshot.png" width="450" alt="screenshot7">


## How to use?

1.  Load page. 
2.  Enter a keyword into the input field. The text below will update to reflect and confirm your current input. 
3.  Select the number of search results you require. The text will update to reflect and confirm your choice. 
    If no number is selected, this will default to '10'.
4.  Click 'Search' to execute search. 
5.  The search results return sorted by ImDb ID. Select from the dropdown list to sort by a different category. 
6.  To begin a new search, click the Start Over - New Search button. 

## Credits

Thanks to the following resources for debugging wisdom and programming guidance: 

[GitHub Markdown guide](https://guides.github.com/features/mastering-markdown/)