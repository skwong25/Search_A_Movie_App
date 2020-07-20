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

const StyleObject = {}
StyleObject.classes = makeStyles((theme) => ({ 
    root: {
      display: 'flex', // apparently! defines a flex container, enables flex context for direct children
      flexGrow: '1',
    },
    paper: {
      padding: 10,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      minHeight: 1000,
      alignItems: 'flex-start',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
}))  
export { StyleObject }
