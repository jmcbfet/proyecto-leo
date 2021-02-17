import { makeStyles } from "@material-ui/core/styles";

const NavbarStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1
    }
}));

export { NavbarStyles };