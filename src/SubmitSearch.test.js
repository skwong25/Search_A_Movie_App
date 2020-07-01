/** 
 * SubmitSearch.test.js tests that:
 * - a Search button renders if no search has been made
 * - a Refresh button renders if a search has been made
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitSearch from './SubmitSearch';

test( 'Renders Search button if searchStatus is false', () => {
  render(<SubmitSearch/>);

  let mrButton = screen.getByRole("button", {name:"Search"});
  expect(mrButton).toBeInTheDocument();
})

test( 'Renders Refresh button if searchStatus is true.', async () => {
  
  render(<SubmitSearch searchStatus="true"/>);
  
  const mrButton = screen.queryByRole("button", {name:"Search"});
  const missButton = screen.getByRole("button", {name:"Refresh"});
  expect(missButton).toBeInTheDocument();
  expect(mrButton).not.toBeInTheDocument();

})

  /*
  await waitForElementToBeRemoved(() => screen.queryByRole("button", {name:"Refresh"}));

  mrButton = screen.getByRole("button", {name:"Search"});
  expect(mrButton).toBeInTheDocument();

*/
// * 

// Not sure how to use await here. We are waiting for fireEvent.click(missButton) to finish rendering
// Otherwise, the Refresh button is still visible even after it's clicked. I believe we need to ue asynchronous action.
// When I used await / waitForElement etc it looped infinitely.
// I guess it kept on sending API requests on each render because the searchStatus was toggled and there was a keyword. 