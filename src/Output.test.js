//  unit test
import React from 'react';
import Output from './Output';
import App from './App';

import { render } from '@testing-library/react';
// import { unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";

it("given the correct format of props, it renders correctly", () => {

  const testProps = {
    movieData: `[0:{ Title: "The Notebook", Year: "2004", imdbID: "tt0332280"},
  ​1:{ Title: "A Young Doctors Notebook & Other Stories", Year: "2012–2013", imdbID: "tt2164430" },
  ​2:{ Title: "The Notebook", Year: "2013", imdbID: "tt2324384"}]`,
   searchStatus: true
  }


  const {getByText} = render(<App>
                            <Output {...testProps}/>
                            </App>)
  let ol = getByText(/Movie/i)
  expect(ol.textContent).toBe("The Notebook");
});

/*
  act(() => {
    render(<Output 
      movieData={[ 0:{ Title: "The Notebook", Year: "2004", imdbID: "tt0332280"},1:{ Title: "A Young Doctor's Notebook Other Stories", Year: "2012–2013", imdbID: "tt2164430" },2:{ Title: "The Notebook", Year: "2013", imdbID: "tt2324384"}]}
      searchStatus="true" noOfResults="1" />, container);
  });
  expect(getByText()textContent).toBe("Movie 1: The Notebook Year: 2004 IMBD ID. : tt0332280");
/*
  act(() => {
    render(<Output 
      movieData="[0:{Title: T1, Year: Yr1, IMBD ID. : 1111, Poster: http.src1},1:{Title: T2, Year: Yr2, IMBD ID. : 2222, Poster: http.src2}, 3:{Title: T3, Year: Yr3, IMBD ID. : 3333, Poster: http.src3}]" 
      searchStatus="true" noOfResults="1" />, container);

  });
  expect(container.textContent).toBe("Movie 1: T1 Year: Yr1 IMBD ID. : 1111");
  });
*/

/*
[
0: { Title: "The Notebook", Year: "2004", imdbID: "tt0332280"},
​
1: { Title: "A Young Doctor's Notebook & Other Stories", Year: "2012–2013", imdbID: "tt2164430" },
​
2: { Title: "The Notebook", Year: "2013", imdbID: "tt2324384"}

]
*/