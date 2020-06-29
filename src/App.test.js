import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import InputField from './InputField';


test('test0: renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


/**
 * test1
 * getByRole() searches for all elements in the rendered virtual DOM with the role of 'list' and name of 'number'
 * the role of 'list' did not work
 * Assertion expects that HTML element's text content to be 1
 * 
 */

test('test1: renders dropdown menu of numbers 1-5', () => {
  const { getByRole } = render(<InputField/>);
  let element = getByRole("option", {name: "1"});
  expect(element.textContent).toBe("1")

  element = getByRole("option", {name: "2"});
  expect(element.textContent).toBe("2")

  element = getByRole("option", {name: "3"});
  expect(element.textContent).toBe("3")

  element = getByRole("option", {name: "4"});
  expect(element.textContent).toBe("4")

  element = getByRole("option", {name: "5"});
  expect(element.textContent).toBe("5")
})

test('test2: renders dropdown menu of 5 options', () => {
  const { getByTestId } = render(<InputField/>);
  const element = getByTestId("dropdown")
  expect(element.children.length).toBe(5);
})


test('test3: renders label describing the input field', () => {
  const { getByLabelText } = render(<InputField/>);
  let element = getByLabelText(/Enter/i);
  expect(element.textContent).toBe("")
})

// Are we really looking to test: if an empty input field is rendered?

// The problem with the above: I'm not sure if the element 'got' is the Input Element or the Label Element. 
// If its grabbed Input field, then it has no text. So this would be correct. 
// If it's grabbed the Label, it DOES have text. So this would be incorrect.

/*
https://css-tricks.com/getting-started-with-react-testing-library/
https://medium.com/@jero786/react-testing-library-pro-tips-eba7181eb6fb
https://testing-library.com/docs/guide-which-query
https://www.freecodecamp.org/news/testing-react-hooks/
*/