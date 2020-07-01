/** 
 * SubmitSearch.test.js tests:
 * 
 * Dropdown of Numbers:
 * - test 1: renders dropdown menu of numbers 1-5
 * - test 1.1: renders dropdown menu of 5 options
 * - test 1.2: selecting a dropdown option updates Output message
 * - test 2: renders an empty text input field
 * 
 * Input Field: 
 * - test 2: renders an empty text input field
 * - test 2.1: entering a word into input field updates the Output message to reflect
 */


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import InputField from './InputField';
import Output from './Output';


describe("Input field", () => {
    test('test 1: renders dropdown menu of numbers 1-5', () => {
        const { getByRole } = render(<InputField/>);
        let element = getByRole( "option", {name: "1"}) ;
        expect(element.textContent).toBe("1");

        element = getByRole("option", {name: "2"});
        expect(element.textContent).toBe("2")

        element = getByRole("option", {name: "3"});
        expect(element.textContent).toBe("3")

        element = getByRole("option", {name: "4"});
        expect(element.textContent).toBe("4")

        element = getByRole("option", {name: "5"});
        expect(element.textContent).toBe("5")
    });

    test('test 1.1: renders dropdown menu of 5 options', () => {
        const { getByTestId } = render(<InputField/>);
        const element = getByTestId("dropdown");
        expect(element.children.length).toBe(5);
    });

    test('test 1.2: selecting a dropdown option updates Output message', () => {
        render(
            <App>
            <InputField/>
            <Output/>
            </App>
        );
        let element = screen.getByLabelText(/Search results/i);
        fireEvent.change(element, {target: {value: 5}}); 
        expect(screen.getByText(/press submit to return/i).textContent).toBe("press submit to return 5 results");
    });
});

describe("Numbers dropdown", () => {
    test('test 2: renders an empty text input field', () => {
        const { getByLabelText } = render(<InputField/>);
        let element = getByLabelText(/Keyword/i);
        expect(element.textContent).toBe("")
        expect(element).toHaveAttribute('type', 'text')
    });

    test('test 2.1: entering a word into input field updates the Output message', () => {
      render(
          <App>
          <InputField/>
          <Output/>
          </App>
      );
    let element = screen.getByLabelText(/Keyword/i);
    fireEvent.change(element, {target: {value: 'notebook'}}) // otherwise accessed via event.target.value
    expect(screen.getByText(/the keyword is/i).textContent).toBe("the keyword is notebook");
    });
});

//  ----------------------------------
