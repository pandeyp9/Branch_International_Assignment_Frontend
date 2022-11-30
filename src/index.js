import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Home";
import ThreadUser from "./ThreadUser.js";
import ThreadAgent from "./ThreadAgent.js";
import reportWebVitals from "./reportWebVitals";
import EnterAgentId from "./enterAgentId";
import EnterUserId from "./enterUserId";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/home/:agentID" element={<Home />} />
        <Route path="/threadUser/:agentID/:threadID" element={<ThreadUser />} />
        <Route path="/threadAgent/:agentID/:threadID" element={<ThreadAgent />} />
        <Route path="/enterAgentId" element={<EnterAgentId />} />
        <Route path="/enterUserId" element={<EnterUserId />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
