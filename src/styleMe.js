/** Problem: Calling makeStyles() in a class results in Error: Invalid Hook Call, because of it using Hook API
 * 
 * Solutions tried: 
 *      Import as a Functional Component => this still requires calling it within the App.js classes X
 *      Save the RESULT (Object) of the function call within a Module.
 * 
 * We created an object , aim to export one of its properties as a Module. 
 * Each module is a piece of code that is executed once it is loaded.
 * In that code, there may be declarations (variable/functions etc) that default as local to the module
 * This may be better than exporting a functional component (/function) which would need to be called IN the Class. 
 * 
 * Forum suggestion: 
 *      Use a Higher Order Component or use 'withStyles'
 * https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat
*/

import { makeStyles } from '@material-ui/core/styles';

const Obj = {}
Obj.classes = makeStyles((theme) => ({ 
    root: {
      display: 'flex', // defines a block container and causes all my text to left-align within my Grid items 
    },
    container: { 
      display: 'flex', // defines a flex container, enables flex context for its direct children (the Grids)
      direction: "column",
      justify: "center",
      alignItems: "center",
      // padding: "10px", // does nothing
    }, 
    item: {
      // padding: "50px" // does nothing 
    }, 
    paper: {
      marginTop: theme.spacing(1), // does nothing
      direction: "column", // does nothing
      justify: "center", // does nothing
      alignItems: "center", // does nothing
      padding: theme.spacing(10), // does nothing
      textAlign: 'center', // does nothing
      // padding: "50px" // does nothing
    },
    fixedHeight: { // I don't think this does anything either.
      height: 500,
      // padding: "50px"
    },
}))  
// export { Obj.classes as Classes } 
export { Obj }

// Not sure why flexDirection is across? We want it vertical. 
// Ideally:
// Want elements evenly spaced. The attribute "padding="10px" on all / individ items doesn't seem to do anything. 