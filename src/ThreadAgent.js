import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./textField.css";
import "./thread.css";

function ThreadAgent() {
  const { agentID, threadID } = useParams();
  const [textFieldValue, setTextFieldValue] = useState("");
  // console.log(agentID, threadID);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState("");
  const handleResolveButton = () => {
    fetch(`http://localhost:5000/resolve/${threadID}`, {
      method: "POST",
    }).then(() => {
      navigate(`../home/${agentID}`, { replace: true });
    });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/get-thread/${agentID}`)
      .then((res) => res.json())
      .then((dat) => {
        dat.map((ele) => {
          if (ele._id === threadID) {
            setMessages(ele.messages);
            setUserID(ele.user);
          }
        });
      });
  }, []);

  const handleClickOnSendButton = () => {
    // console.log(textFieldValue);
    fetch("http://localhost:5000/message", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        user: userID,
        text: textFieldValue,
        messagedBy: "agent",
        thread: threadID,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      messages.push({
        messagedBy: "agent",
        text: textFieldValue,
      });
      setMessages(messages);
      setTextFieldValue("");
    });
  };
  return (
    <div className="thread">
      {/* <div> */}
      <button className="resolvedButton" onClick={handleResolveButton}>
        Mark as Resolved
      </button>
      <div className="containerOfMessages">
        {messages.map((ele, idx) => {
          if (ele.messagedBy === "agent") {
            return (
              <div className="right message" key={idx}>
                {ele.text}
              </div>
            );
          } else
            return (
              <div className="left message" key={idx}>
                {ele.text}
              </div>
            );
        })}
      </div>
      <div className="container1">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#EDE7E7",
            width: "97%",
            position: "fixed",
            bottom: "10px",
            left: "1%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Type here..."
            inputProps={{ "aria-label": "search google maps" }}
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <SendIcon onClick={handleClickOnSendButton} />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}

export default ThreadAgent;
