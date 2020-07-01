/** 
 * SubmitSearch.test.js tests that:
 * - a Search button renders if no search has been made
 * - a Refresh button renders if a search has been made
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitSearch from './SubmitSearch';

test('Renders Search button if searchStatus is false', () => {
    render(<SubmitSearch/>);
    let mrButton = screen.getByRole("button", {name:"Search"});
    expect(mrButton).toBeInTheDocument();
});

test('Renders Refresh button if searchStatus is true.', async () => {
    render(<SubmitSearch searchStatus="true"/>);
    const mrButton = screen.queryByRole("button", {name:"Search"});
    const missButton = screen.getByRole("button", {name:"Refresh"});
    expect(missButton).toBeInTheDocument();
    expect(mrButton).not.toBeInTheDocument();
});
