
const sortMethods = {

        SELECT : {
            name: null,
            userMessage: "Select one of the below", 
            comparator: null,
        },

        TITLE_ASCENDING : {
            name: "TITLE_ASCENDING",
            userMessage: "Title A-Z", 
            category: "Title",
            comparator: function(a,b) {
                const movieA = a['Title']; // const movieA = a[this.category] does not work when imported? 
                const movieB = b['Title'];           
                let comparison = 0;

                if (movieA > movieB) {
                    comparison = 1
                } else if (movieA < movieB) {
                    comparison = -1
                };
    
                return comparison;
            },
            testPrint() {
                console.log(this.category); 
            }
        },

        TITLE_DESCENDING : {
            name: "TITLE_DESCENDING",
            userMessage: "Title Z-A", 
            category: "Title",
            comparator: function(a,b) {
                const movieA = a['Title'];
                const movieB = b['Title'];
                let comparison = 0;

                if (movieA > movieB) {
                    comparison = 1
                } else if (movieA < movieB) {
                    comparison = -1
                };
    
                return comparison * -1;
            }
        },

        YEAR_ASCENDING : {
            name: "YEAR_ASCENDING",
            userMessage: "Year (Oldest - Newest)", 
            category: "Year",
            comparator(a,b) {
                const movieA = a['Year'];
                const movieB = b['Year'];
                let comparison = 0;
    
                if (movieA > movieB) {
                    comparison = 1
                } else if (movieA < movieB) {
                    comparison = -1
                };
        
                return comparison;
            }
        },
        YEAR_DESCENDING : {
                name: "YEAR_DESCENDING",
                userMessage: "Year (Newest - Oldest)", 
                category: "Year",
                comparator(a,b) {
                    const movieA = a['Year'];
                    const movieB = b['Year'];
                    let comparison = 0;
    
                    if (movieA > movieB) {
                        comparison = 1
                    } else if (movieA < movieB) {
                        comparison = -1
                    };
        
                    return comparison * -1;
                }
        },
        IMBDID : {
            name: "IMBDID",
            userMessage: "imdbID no.", 
            category: "imdbID",
            comparator(a,b) {
                const movieA = a["imdbID"];
                const movieB = b["imdbID"];
                let comparison = 0;

                if (movieA > movieB) {
                    comparison = 1
                } else if (movieA < movieB) {
                    comparison = -1
                };
    
                return comparison;
            }
        },
}

export default sortMethods;
