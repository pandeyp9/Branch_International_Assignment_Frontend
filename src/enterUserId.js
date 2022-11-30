import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./enterUserId.css";

function EnterUserId() {
  const [userID, setUserID] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userID, query);
      // console.log(textFieldValue);
      fetch("http://localhost:5000/message", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
          "user": userID,
          "text": query,
          "messagedBy": "user",
          "thread": null
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then((res, req) => res.json())
      .then((data) => {
        navigate(`../threadUser/${data.agentID}/${data.threadID}`, {replace: true});
      })
    }
    return (
      <div className="containerForUserIdPage">
        <form>
          <label>Enter Your User ID: </label>
          <input value={userID} onChange={(e) => setUserID(e.target.value)}></input>
          <label>Enter Your Query: </label>
          <input value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button className="submitButtonForUserIdPage" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }

  export default EnterUserId;
