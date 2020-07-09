import React from "react";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import "./Input.css";

const ChatInput = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <TextField
      id="chat-box"
      className="input"
      style={{
        padding: "0%",
        width: "100%",
      }}
      multiline
      placeholder="Type your message here"
      fullWidth
      margin="dense"
      value={message}
      //important stuff here
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
      InputProps={{
        endAdornment: (
          <IconButton onClick={(event) => sendMessage(event)}>
            <SendIcon />
          </IconButton>
        ),
      }}
    />
  </form>
);

export default ChatInput;
