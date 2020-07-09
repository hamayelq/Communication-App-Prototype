import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Icon, Button, Grid, TextField } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CloseIcon from "@material-ui/icons/Close";
import Chat from "../Chat/Chat";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "black",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerTitle: {
    fontSize: 20,
    marginTop: -50,
  },
  onlineButton: {
    marginRight: theme.spacing(2),
    color: "#66bb6a",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "#FAFAFA",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ResponsiveDrawer = (props, { users }) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = ({ users }) => {
    setMobileOpen(!mobileOpen);
    console.log(users);
  };

  const drawer = (
    <div style={{ background: "#FAFAFA" }}>
      <div className={classes.toolbar} style={{ background: "#FAFAFA" }} />
      <Typography className={classes.drawerTitle} align="center">
        Users In Room
      </Typography>
      <Divider />
      <List style={{ background: "#FAFAFA" }}>
        {users
          ? users.map(({ name }) => (
              <ListItem key={name}>
                <ListItemText>{name}</ListItemText>
              </ListItem>
            ))
          : null}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Icon
            edge="start"
            aria-label="online-button"
            className={classes.onlineButton}
          >
            <FiberManualRecordIcon />
          </Icon>
          <Typography variant="h5" className={classes.title}>
            Chat
          </Typography>
          <IconButton color="inherit" edge="end">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            // style={{ background: "#FAFAFA" }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
      </main>
    </div>
  );
};

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
