function sortMovies (a, b, propertyName) {
    const movieA = a[propertyName]; 
    const movieB = b[propertyName];         
    let comparison = 0;

    if (movieA > movieB) {
        comparison = 1
    } else if (movieA < movieB) {
        comparison = -1
    };
    return comparison;
}

const sortCriteria= {

        IMBDID : {
            name: "IMBDID",
            userMessage: "imdbID no.", 
            category: "imdbID",
            comparator(a,b) {
                return sortMovies(a, b, "imdbID");
            }
        },

        TITLE_ASCENDING : {
            name: "TITLE_ASCENDING",
            userMessage: "Title A-Z", 
            category: "Title",
            comparator: function(a,b) {
                return sortMovies(a, b, "Title");
            }
        },

        TITLE_DESCENDING : {
            name: "TITLE_DESCENDING",
            userMessage: "Title Z-A", 
            category: "Title",
            comparator: function(a,b) {
                return sortMovies(a, b, "Title") * -1
            }
        },

        YEAR_ASCENDING : {
            name: "YEAR_ASCENDING",
            userMessage: "Year (Oldest - Newest)", 
            category: "Year",
            comparator(a,b) {
                return sortMovies(a, b, "Year");
            }
        },

        YEAR_DESCENDING : {
                name: "YEAR_DESCENDING",
                userMessage: "Year (Newest - Oldest)", 
                category: "Year",
                comparator(a,b) {
                    return sortMovies(a, b, "Year") * -1;
                }
        },
}

export default sortCriteria;

// struggling to export/import our sortMethods, sortMovies correctly - will revisit :) 