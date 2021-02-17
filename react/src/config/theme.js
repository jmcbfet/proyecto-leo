import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: indigo[900]
        },
        secondary: {
            main: blue[900]
        }
    }
});

export default theme;