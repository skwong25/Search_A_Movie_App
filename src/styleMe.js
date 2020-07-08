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
Obj.drawerWidth = 600;
Obj.classes = makeStyles((theme) => ({ 
    root: {
      display: 'flex', // defines a block container and causes all my text to left-align within my Grid items 
    },
    container: { 
      display: 'flex', // defines a flex container, enables flex context for its direct children (the Grids)
      justifyContent: 'center',
      alignItems: 'center', 
      flexdirection: 'column',
    },  
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexdirection: 'column',
      alignItems: 'center',
    },
    fixedHeight: { // I don't think this does anything either.
      height: 500,
    },
}))  
// export { Obj.classes as Classes } 
export { Obj }

// I imported it, but I don't know if 