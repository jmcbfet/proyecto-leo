import { makeStyles } from "@material-ui/core/styles";

const FormStyles = makeStyles(theme => ({
    caja: {
        margin: '2em auto',
        width: '40%',
        padding: '20px 20px',
        boxShadow: '5px 5px 15px -3px rgba(0,0,0,0.51)'
    },
    input: {
        marginTop: '1.5em',
        width: '100%'
    },
    buttonSubmit: {
        marginTop: '1.5em',
        padding: '20px 30px',
        width: '100%'
    }
}));

export { FormStyles };