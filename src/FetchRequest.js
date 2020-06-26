/**
 * Child Class 5 - executes HTTP GET request using fetch API
 * Functional Component 
 */

const FetchRequest = (props) => {

console.log(props.keyword);
console.log(props.searchStatus);

if (props.searchStatus === true) {

  const wordQuery = props.keyword;
  const apiKey = '9990ead4';
  const url = 'http://www.omdbapi.com/?';
  const queryParams = 's='; 
 
  const endpoint = url + 'apikey=' + apiKey + '&' +  queryParams + wordQuery; 

  fetch(endpoint)
    .then(response => response.json())   
    .then(data => {
        if (data.Response === "False") { 
          alert(data.Error);;
        } else {
          console.log("did we get here?");
          props.updateMovie(data); 
        }
    })
    
  }
  return null 
};

export default FetchRequest;