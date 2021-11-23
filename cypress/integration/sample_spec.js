/* Tests for Movie Search App
1. Check that elements render
    - heading text DONE
    - popcorn link DONE 
    - input box
    - no. results dropdown
    - search button
    - initial state of responsive text 
2. Check interactions
     - input box
        - allows typing
        - input updates text
     - no. results dropdown: 
        - displays multiple options
        - selected value should update the text 
     - search function: 
        - button click triggers search
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

*/

describe('page banner', () => {

    it('checks page banner contains correct header text', () => {
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

    it('checks popcorn button renders', () => {
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
                // Note: cy.visit(linkUrl) opens a new tab which we cannot test in Cypress, so we use cy.request() 
            })  
    })
});


 