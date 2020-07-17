/** 
 * SearchButtonComponent.test.js tests that:
 * - a Search button renders if no search has been made
 * - a Refresh button renders if a search has been made
 */

import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from '@testing-library/react';
import SearchButton from './SearchButtonComponent';

test('Renders Search button if searchStatus is false', () => {
    render(<SearchButton
                searchStatus={false}
                handleClick={function() {}} 
            />);
    let mrButton = screen.getByRole("button", {name:"Search"});
    expect(mrButton).toBeInTheDocument();
});

test('Renders Refresh button if searchStatus is true.', async () => {
    render(<SearchButton 
            searchStatus={true}
            handleClick={function() {}} 
        />);
    const mrButton = screen.queryByRole("button", {name:"Search"});
    const missButton = screen.getByRole("button", {name:"Start Over - New Search"});
    expect(missButton).toBeInTheDocument();
    expect(mrButton).not.toBeInTheDocument();
});
