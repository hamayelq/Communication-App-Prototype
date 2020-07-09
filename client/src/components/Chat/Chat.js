import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import {
  AppBar,
  Toolbar,
  Icon,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChatInput from "../Input/Input";
import Messages from "../Messages/Messages";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";

import "./Chat.css";

let socket;

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -1,
  },
  drawerTitle: {
    color: "white",
    fontSize: 22,
    marginTop: -47,
    marginBottom: 13,
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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "#383838",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Chat = ({ location }, props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const ENDPOINT = "https://cs3516-chat-app.herokuapp.com/";

  const handleDrawerToggle = ({ users }) => {
    setMobileOpen(!mobileOpen);
    console.log(users);
  };

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ background: "#202020" }} />
      <Typography className={classes.drawerTitle} align="center">
        Users In Room
      </Typography>
      <Divider />
      <List style={{ background: "#484848" }}>
        {users
          ? users.map(({ name }) => (
              <ListItem button key={name}>
                <ListItemIcon
                  className={classes.onlineButton}
                  style={{ marginRight: -20 }}
                >
                  <FiberManualRecordIcon />
                </ListItemIcon>
                <ListItemText style={{ color: "white" }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </ListItemText>
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
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ boxShadow: "none" }}
      >
        <Toolbar style={{ boxShadow: "none", background: "#181818" }}>
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
            {room}
          </Typography>
          <section className={classes.rightToolbar}>
            <Link
              //don't let user join without name/room
              to={`/`}
              style={{ color: "white" }}
            >
              <IconButton
                id="close-button"
                color="inherit"
                edge="end"
                onClick="window.open('','_self').close()"
              >
                <CloseIcon />
              </IconButton>
            </Link>
          </section>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
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
        <div className={classes.toolbar} />
        {/* <div className="outerContainer"> */}
        <div className="insideContainer">
          <div className="chatContainer">
            <Messages messages={messages} name={name} />
          </div>
        </div>
        <div className="inputContainer">
          <ChatInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        {/* </div> */}
      </main>
    </div>
  );
};

export default Chat;
