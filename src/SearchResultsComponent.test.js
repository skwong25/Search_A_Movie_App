/** 
 * Output.test.js tests:
 * 
 * Movie data: 
 * - test1: renders movie name, year, Imdb ID and an image
 * - test2: renders the correct number of search results as selected by user
 * 
 * 
 * Sort Function sorts results in order : 
 * - test 3: alphabetical if "Title A-Z" sort criteria selected by user
 * - test 4: chronological if "Year - Oldest-Newest" sort criteria selected by user
 * - test 5: by ascending ID number if "imdbID no." sort criteria selected by user
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResultsComponent';
import sortCriteria from './sortCriteriaObjects';

test('test1 - renders movie name, year, Imdb ID and an image', () => {
    render( 
        <SearchResults 
            searchStatus="true" 
            movieData={[{ Title: "Pocahontas", Year: "1990", imdbID: "012345", Poster: "image.jpg" }]} 
        /> 
    );
    let element = screen.getByText(/movie/i);
    expect(element.textContent).toBe("Movie 1: Pocahontas");
    
    element = screen.getByText(/year/i)
    expect(element.textContent).toBe("Year: 1990   IMBD ID.: 012345");
    
    element = screen.getByAltText("no graphic available");
    expect(element).toBeInTheDocument();
});

test('test1.1 - renders "N/A" if any property value in the API response is missing', () => {
    render( 
        <SearchResults 
            searchStatus="true" 
            movieData={[{ Title: null, Year: null, imdbID: null, Poster: null }]} 
            /> 
    );
    let element = screen.getByText(/movie/i);
    expect(element.textContent).toBe("Movie 1: N/A");
    
    element = screen.getByText(/year/i);
    expect(element.textContent).toBe("Year: N/A   IMBD ID.: N/A");
    
    element = screen.getByAltText("no graphic available");
    expect(element).toBeInTheDocument();
});


test('test2 - renders the correct number of search results as selected by user', () => {
  render( 
      <SearchResults 
          noOfResults="3" 
          searchStatus="true" 
          movieData={[ 
              { Title: "1", Year: "1990", imdbID: "01"}, 
              { Title: "2", Year: "1991", imdbID: "02"}, 
              { Title: "3", Year: "1992", imdbID: "03"},
              { Title: "4", Year: "1993", imdbID: "04"},
              { Title: "5", Year: "1994", imdbID: "05"},
          ]} 
      />
  ); 
  let element = screen.getByTestId("finalMovies"); // This is no longer working. 
  expect(element.children.length).toBe(3);
});

describe('sort function', () => {
  
    test('test 3: sorts results in alphabetical order if "Title A-Z" sort criteria selected by user', async () => {
        await render( 
            <SearchResults 
                sortObject={sortCriteria['TITLE_ASCENDING']}
                noOfResults="5" 
                searchStatus="true" 
                movieData={[
                    { Title: "P", Year: "1994", imdbID: "01"}, 
                    { Title: "O", Year: "1993", imdbID: "02"}, 
                    { Title: "C", Year: "1992", imdbID: "03"},
                    { Title: "A", Year: "1991", imdbID: "04"},
                    { Title: "H", Year: "1990", imdbID: "05"},
                ]} 
            />
        );

//      screen.debug();
        let element = screen.getByText(/movie 1/i);  
        expect(element.textContent).toBe("Movie 1: A");

        element = screen.getByText(/movie 2/i);  
        expect(element.textContent).toBe("Movie 2: C");

        element = screen.getByText(/movie 3/i);  
        expect(element.textContent).toBe("Movie 3: H");

        element = screen.getByText(/movie 4/i);  
        expect(element.textContent).toBe("Movie 4: O");

        element = screen.getByText(/movie 5/i);  
        expect(element.textContent).toBe("Movie 5: P");
    });

    test('test 4: sorts results in chronological order if "Year - Oldest-Newest" sort criteria selected by user', async () => {
        render( 
            <SearchResults 
                sortObject={sortCriteria.YEAR_ASCENDING} 
                noOfResults="5" 
                searchStatus="true" 
                movieData={[ 
                    { Title: "P", Year: "1994", imdbID: "01"}, 
                    { Title: "O", Year: "1993", imdbID: "02"}, 
                    { Title: "C", Year: "1992", imdbID: "03"},
                    { Title: "A", Year: "1991", imdbID: "04"},
                    { Title: "H", Year: "1990", imdbID: "05"},
                ]} 
            />
        );
        let element = await screen.getByText(/movie 1/i);  
        expect(element.textContent).toBe("Movie 1: H");

        element = await screen.getByText(/movie 2/i);  
        expect(element.textContent).toBe("Movie 2: A");

        element = await screen.getByText(/movie 3/i);  
        expect(element.textContent).toBe("Movie 3: C");

        element = await screen.getByText(/movie 4/i);  
        expect(element.textContent).toBe("Movie 4: O");

        element = await screen.getByText(/movie 5/i);  
        expect(element.textContent).toBe("Movie 5: P");
    });


    test('test 5: sorts results by ascending ID number if "imdbID no." sort criteria selected by user', () => {
        render( 
            <SearchResults 
                sortObject={sortCriteria.IMBD} 
                noOfResults="5" 
                searchStatus="true" 
                movieData={[  
                    { Title: "P", Year: "1994", imdbID: "01"}, 
                    { Title: "O", Year: "1993", imdbID: "02"}, 
                    { Title: "C", Year: "1992", imdbID: "03"},
                    { Title: "A", Year: "1991", imdbID: "04"},
                    { Title: "H", Year: "1990", imdbID: "05"},
                ]} 
            />
        );
        let element = screen.getByText(/movie 1/i);  
        expect(element.textContent).toBe("Movie 1: P");

        element = screen.getByText(/movie 2/i);  
        expect(element.textContent).toBe("Movie 2: O");

        element = screen.getByText(/movie 3/i);  
        expect(element.textContent).toBe("Movie 3: C");

        element = screen.getByText(/movie 4/i);  
        expect(element.textContent).toBe("Movie 4: A");

        element = screen.getByText(/movie 5/i);  
        expect(element.textContent).toBe("Movie 5: H");
    });
});


/*
        
The following getBy query for the search results was successful but text spacing(?) is causing the assertion to fail: 

    let element = screen.getByRole("list");  
    expect(element.children[0].textContent).toBe(/Movie 1: A/i);

    Expected: /Movie 1: A/i
    Received: "Movie 1: AYear: 1993   IMBD ID. : 04"
  
*/
