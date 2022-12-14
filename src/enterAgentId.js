import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./enterAgentId.css";

function EnterAgentId() {
  const [agentID, setAgentId] = useState([]);
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(agentID);
    navigate(`../home/${agentID}`, { replace: true });
  };
  return (
    <div className="containerForAgentIdPage">
      <form>
        <label>Enter Your Agent ID: </label>
        <input
          value={agentID}
          onChange={(e) => setAgentId(e.target.value)}
        ></input>
        <input
          type="submit"
          className="submitButtonForAgentIdPage"
          onClick={handleSubmit}
        ></input>
      </form>
    </div>
  );
}

export default EnterAgentId;
