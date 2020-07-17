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
import "@testing-library/jest-dom/extend-expect";
import { render, screen, within } from '@testing-library/react';
import SearchResults from './SearchResultsComponent';
import sortCriteria from './sortCriteriaObjects';

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

test('test1.1 - renders "N/A" if any property value in the API response is missing', () => {
    render( 
        <SearchResults 
            keyword=""
            noOfResults={10}
            searchStatus={true} 
            movieData={[{ Title: null, Year: null, imdbID: null, Poster: null }]} 
            /> 
    );
    let element = screen.getByText(/title/i);
    expect(element.textContent).toBe("Title: N/A");
    
    element = screen.getByText(/released/i);
    expect(element.textContent).toBe("Released in: N/A");

    element = screen.getByText(/IMDB ID.:/i)
    expect(element.textContent).toBe("IMDB ID.: N/A");
    
    element = screen.getByAltText("no graphic available");
    expect(element).toBeInTheDocument();
});


test('test2 - renders the correct number of search results as selected by user, if available', () => {
    render( 
        <SearchResults 
            keyword=""
            noOfResults={3} 
            searchStatus={true} 
            movieData={[ 
                { Title: "1", Year: "1990", imdbID: "01"}, 
                { Title: "2", Year: "1991", imdbID: "02"}, 
                { Title: "3", Year: "1992", imdbID: "03"},
                { Title: "4", Year: "1993", imdbID: "04"},
                { Title: "5", Year: "1994", imdbID: "05"},
            ]} 
        />
    ); 
  let element = screen.getByTestId("finalMovies"); 
  expect(element.children.length).toBe(3);
});

describe('sort function', () => {
  
    test('test 3: sorts results in alphabetical order if "Title A-Z" sort criteria selected by user', async () => {
        render( 
            <SearchResults 
                sortObject={sortCriteria['TITLE_ASCENDING']}
                keyword=""
                noOfResults={5} 
                searchStatus={true} 
                movieData={[
                    { Title: "P", Year: "1994", imdbID: "01"}, 
                    { Title: "O", Year: "1993", imdbID: "02"}, 
                    { Title: "C", Year: "1992", imdbID: "03"},
                    { Title: "A", Year: "1991", imdbID: "04"},
                    { Title: "H", Year: "1990", imdbID: "05"},
                ]} 
            />
        );

        // screen.debug(); 

        let element = screen.getByTestId("Movie 1"); 
        expect(element.textContent[7]).toBe("A"); // Received: "Title: AReleased in: 1991"
        screen.debug(element);
        
        element = screen.getByTestId("Movie 2");  
        expect(element.textContent[7]).toBe("C");  

        element = screen.getByTestId("Movie 3");   
        expect(element.textContent[7]).toBe("H");

        element = screen.getByTestId("Movie 4");  
        expect(element.textContent[7]).toBe("O");

        element = screen.getByTestId("Movie 5");  
        expect(element.textContent[7]).toBe("P");
    });

    test('test 4: sorts results in chronological order if "Year - Oldest-Newest" sort criteria selected by user', async () => {
    const { getByText } = await render( 
            <SearchResults 
                sortObject={sortCriteria.YEAR_ASCENDING} 
                keyword=""
                noOfResults={5} 
                searchStatus={true} 
                movieData={[ 
                    { Title: "P", Year: "1994", imdbID: "01"}, 
                    { Title: "O", Year: "1993", imdbID: "02"}, 
                    { Title: "C", Year: "1992", imdbID: "03"},
                    { Title: "A", Year: "1991", imdbID: "04"},
                    { Title: "H", Year: "1990", imdbID: "05"},
                ]} 
            />
        );

        let JSdiv = screen.getByTestId("SK1");                  // data-testid on a <div> element 
        let element = within(JSdiv).getByText(/Released in/i);  
        expect(element.textContent).toBe("Released in: 1990");

        let listItem = screen.getByTestId("Movie 1")            // data-testid on a ListItemText MIU Component 
        element = within(listItem).getByText(/Released in/i);   //'within' helper for nested queries 
        expect(element.textContent).toBe("Released in: 1990");
        
        listItem = screen.getByTestId("Movie 2");          
        element = within(listItem).getByText(/Released in/i);
        expect(element.textContent).toBe("Released in: 1991");
        
        listItem = screen.getByTestId("Movie 3");   
        element = within(listItem).getByText(/Released in/i);
        expect(element.textContent).toBe("Released in: 1992");

        listItem = screen.getByTestId("Movie 4");   
        element = within(listItem).getByText(/Released in/i);
        expect(element.textContent).toBe("Released in: 1993");

        listItem = screen.getByTestId("Movie 5");   
        element = within(listItem).getByText(/Released in/i);
        expect(element.textContent).toBe("Released in: 1994");
                
    });


    test('test 5: sorts results by ascending ID number if "imdbID no." sort criteria selected', () => {
        render( 
            <SearchResults 
                sortObject={sortCriteria.IMBD} 
                keyword=""
                noOfResults={5} 
                searchStatus={true} 
                movieData={[  
                    { Title: "P", Year: "1994", imdbID: "01"}, 
                    { Title: "O", Year: "1993", imdbID: "02"}, 
                    { Title: "C", Year: "1992", imdbID: "03"},
                    { Title: "A", Year: "1991", imdbID: "04"},
                    { Title: "H", Year: "1990", imdbID: "05"},
                ]} 
            />
        );
        let element = screen.getByTestId("Movie 1");  
        expect(element.textContent[7]).toBe("P");

        element = screen.getByTestId("Movie 2");  
        expect(element.textContent[7]).toBe("O");

        element = screen.getByTestId("Movie 3");  
        expect(element.textContent[7]).toBe("C");

        element = screen.getByTestId("Movie 4");  
        expect(element.textContent[7]).toBe("A");

        element = screen.getByTestId("Movie 5");  
        expect(element.textContent[7]).toBe("H");
    });
});
