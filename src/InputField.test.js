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
import { waitForElement, render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import InputField from './InputField';
import Output from './Output';


describe("Input field", () => {
    test('test 1: renders dropdown menu containing numbers 1-5', () => {
        const { getByRole } = render(<InputField/>); 

        fireEvent.mouseDown(getByRole('button',{name: "No. of Results"}));
        
        let element = getByRole( "option", {name: "1"}); // Believe this is not picking up the correct Element. 
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

    test('test 1.1: renders dropdown menu of 3 options', () => {
        const { getByTestId } = render(<InputField/>);
        // fireEvent.mouseDown(screen.getByRole('button',{name: "No. of Results"})); // This line is not required.
        const element = getByTestId("dropdown");  
        expect(element.children.length).toBe(3); // It can only find 3 children!? There should be 10.  
    });

    test('test 1.2: selecting a dropdown option updates Output message', () => {
        render(
            <App>
            <InputField/>
            <Output/>
            </App>
        );
        fireEvent.mouseDown(screen.getByRole('button',{name: "No. of Results"}));        //clicks the button 
        let element = screen.getByRole("option", {name: "5"});                          // finds the option "5" 
        fireEvent.click(element);                                                      // clicks it
        expect(screen.getByText(/Press SEARCH to return/i).textContent).toBe("Press SEARCH to return 5 results");
    });
});

describe("Numbers dropdown", () => {
    test('test 2: renders an empty text input field', () => {
        const { getByLabelText } = render(<InputField/>);
        let element = getByLabelText(/Enter/i);
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
    expect(screen.getByText(/The keyword is/i).textContent).toBe("The keyword is notebook");
    });
});

//  ----------------------------------
