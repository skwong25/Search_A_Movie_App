/* Tests for Movie Search App
1. Check that elements render
    - page banner text DONE
    - popcorn button DONE 
    - input box DONE
    - no. results dropdown
    - search button
    2. Check interactions
    - input box
        - allows typing DONE
        - initial state of responsive text DONE
        - input updates text DONE
     - no. results dropdown: 
        - displays multiple options
        - selected value should update the text DONE
     - search function: 
        - button click triggers search DONE
        - 'searching' message displays
        - new window opens
 (Defect found! When 'Can't Find' Error message is shown, the 'Searching' message remains.)
     - filter dropdown menu:
        - displays list of options
        - sorts by IMBD no.
        - sorts by title A-Z
        - sorts by title Z-A
        - sorts by year (oldest-newest)
        - sorts by year (newest-oldest)
        - Link takes you to page with correct film 

TODO: Set maximum width for containers so texts wrap.
TODO: Add a hover state 
TODO: After 'Can't Find' error message shows, then the 'Searching' message should no longer show.
TODO: When you search with input value of punctuation or 2 letters, it returns 'Too Many Results'. It should return 'movie not found'
    This might be an API requirement for the search term - check documentation. 
TODO: When the search button is clicked with no input, search button is disabled but this is not visually obvious. Should be greyed out. 
TODO: Add a character limit to the search box! Currently this goes on forever and exceeds the container 

*/

import numberOfResults from '../../src/numbers'; 

describe('page banner', () => {

    it('contains correct header text', () => {
        cy.visit('/') 
        cy.get('[data-cy=heading-text]') // gets the h6 element 
        .invoke('text') // invokes jQuery function .text() - gets text contents of matching elements 
        .should('equal', "Welcome to Suzanna's Movie App");
    })
});

describe('popcorn button', () => {
    beforeEach(() => {
        cy.visit('/');
        // TODO: why doesn't the simorgh cypress test suite have cy.visit - search the repo for it! 

        // aliasing
        cy.get('[data-cy=popcorn-button]') // same as cy.get('button[data-cy=])
            .as('popcornButton');

        // selects every <a> element with child href with attribute containing <value> 
        // cy.get('a[href*="/recipe/"]') // alternative selector via href link
    });

    it('renders', () => {
        cy.get('@popcornButton')
            // checks element is not hidden or pushed out of screen because of CSS issues
            .should('be.visible');
    })

    it('contains a link', () => {
        cy.get('@popcornButton')
            .find('a')
            .should('not.have.attr', 'href', "#undefined"); 
    })

    it('contains a link to a recipe', () => {
        cy.get('@popcornButton')
            .find('a')
            .invoke('attr', 'href')
            .should('contain', '/recipe/'); 
    })

    it('opens a live webpage upon click', () => {
        cy.get('@popcornButton')
            .find('a')
            .invoke('attr','href')
            .then(url => {
                cy.log(url);
                cy.request(url) // default fails on response codes other than 2xx & 3xx 
                // Note: cy.visit(linkUrl) opens a new tab which we cannot test in Cypress, so we make GET req with cy.request() instead 
            })  
    })
});

describe('input box', () => {
    
    it('accepts typed input', () => {
        cy.get('[data-cy=input-field]').type('test')
        cy.contains('test')
    })

});
/*
describe('search button', () => {
    
    it('is enabled when input field is populated ', () => {
        // search button should be disabled
        cy.get('[data-cy=input-field]').type('test')
        cy.contains('test')
        // search button should be enabled 
        cy.get('[data-cy=input-field]').type('{backspace}')
        // search button should be disabled
    })
})
*/

describe('dropdown list for no. of search results', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-cy=dropdown-number-results]') 
            .as ('dropdown');
    }) 

    it('renders dropdown element & displays default no. of results', () => {
        cy.get('@dropdown')
            .first()
            .should('contain', numberOfResults); 
    })

    it('allows user to select a dropdown list option - using > CSS Selector ', () => {
        cy.get('@dropdown').click() // reveals dropdown which contains ul 
        cy.get('ul>li') // yields all li items in ul - not sure why it only finds one ul though? 
            .eq(numberOfResults - 1) // selects option by index. can also do .first()  or .last()
            .click() 
    })

    it('updates to display the selected value - using .within', () => {
        cy.get('@dropdown').click()
        cy.get('ul') // yields all ul elements, of which the dropdown is the second 
            .eq(1)
            .within(($list) => {
                cy.contains(numberOfResults - 1).click() // or cy.get('li:nth-child(9)').click() 
            })  
        cy.contains(numberOfResults - 1); // assertion
    })
})

describe('keyword responsive text', () => {

    beforeEach(() => {
        cy.visit('/');
    })

    it('renders initial text', () => {
        cy.contains('The keyword is ???')
    })
    
    it('updates with input field value - test 1', () => {
        cy.get('[data-cy=input-field]').type('test');
        cy.contains('The keyword is test');
    })
    
    it('updates with input field value - test 2', () => {
        cy.get('[data-cy=input-field]').type('test');
        cy.get('[data-cy=responsive-text]')
        .invoke('text')
        .should('contain','The keyword is test');
    })
})

describe('results responsive text', () => {

    beforeEach(() => {
        cy.visit('/');
    })

    it('renders initial text', () => {
        cy.contains('Press SEARCH to return 10 results');
    })

    it.only('updates text with selected dropdown value', () => {
        cy.get('[data-cy=dropdown-number-results]').click()
        cy.get('ul>li')
            .eq(numberOfResults - 2) // zero-based index 
            .click()
        cy.get('[data-cy=responsive-text]')
            .invoke('text')
            .should('contain', `Press SEARCH to return ${numberOfResults - 1} results`);
    })
})

describe('search function', () => {

    beforeEach(() => {
        cy.visit('/')
        // TODO: define aliases for input field & search button
    })
    
    it('accepts a search term and returns search results', () => {
        cy.get('[data-cy=input-field]').type('the notebook')
        cy.get('[data-cy=search-button]').click() // alternative: cy.contains('Search').click()
        cy.wait(500); 
        // should we await API response? Can we stub out the back-end and mock response?
        // we can alias requests/responses via fixture data 
        cy.get('[data-cy=search-results]') // verifies via parent Grid container for Movie results  
    })

    it('returns no. of results as specified in the dropdown', () => {
        var noOfResults = 10;
        // TODO: Add cy command to grab dropdown box and select the value matching noOfResults  
        // TODO: Add table to test all values 
        cy.get('[data-cy=input-field]').type('the notebook')
        cy.get('[data-cy=search-button]').click()
        cy.wait(500); 
        cy.get('[data-cy=search-results]')
        .find('li') 
        .first()
        .invoke('text')
        .should('eq', `1/${noOfResults}`); // chainer can be 'contain' 
    })
/*
    it('displays a pop-up alert notification if no search results are found', () => {
        cy.get('[data-cy=input-field]').type('blahblahblah')

    })
    */
})
