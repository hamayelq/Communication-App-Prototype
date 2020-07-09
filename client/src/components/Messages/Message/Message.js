import "./Message.css";
import ReactEmoji from "react-emoji";
import React from "react";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrUser = true;
  }

  return isSentByCurrUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundSent">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundReceived">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
};

export default Message;
