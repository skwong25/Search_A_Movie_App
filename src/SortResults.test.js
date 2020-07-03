/** 
 * SortResults.test.js tests that:
 * - a dropdown list of options is rendered
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SortResults from './SortResults';

test( 'renders dropdown list of sort criteria options', () => {
    render( <SortResults disabled={false} searchStatus="true"/>);
    expect(screen.getByRole("option", {name: "Title A-Z"})).toBeInTheDocument();
    expect(screen.getByRole("option", {name: "Title Z-A"})).toBeInTheDocument();
    expect(screen.getByRole("option", {name: "Year (Oldest - Newest)"})).toBeInTheDocument();
    expect(screen.getByRole("option", {name: "Year (Newest - Oldest)"})).toBeInTheDocument();
    expect(screen.getByRole("option", {name: "imdbID no."})).toBeInTheDocument();
})

