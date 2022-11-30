import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Home.css";
function Home() {
  let navigate = useNavigate();
  const handleClickOnRow = (agentID, threadID) => {
    // console.log(agentID, threadID);
    navigate(`../threadAgent/${agentID}/${threadID}`, {replace: true});
  }
  // const dummy = [
  //   {
  //     _id: 1,
  //     user: "1",
  //     messages: [{ text: "dajsfhkjhsdakjfhkjdsah", messagedBy: "0" }],
  //     timeStamp: "32232",
  //     priority: 1,
  //   },
  //   {
  //     _id: 2,
  //     user: "11",
  //     messages: [{ text: "dajsfhkjhsdakjfhkjdsah", messagedBy: "0" }],
  //     timeStamp: "322132",
  //     priority: 0,
  //   },
  // ];
  const [data, setData] = useState([]); 
  const {agentID} = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/get-thread/${agentID}`)
    .then((res) => res.json())
    .then((dat) => setData(dat));
  }, [])
  return (
    <div>
      <div className="Row">
        <div className="userID">UserID</div>
        <div className="message">Query</div>
        <div className="timeStamp">timeStamp</div>
      </div>

      {data.map((ele, idx) => {
        if (ele.priority === 0)
          return (
            <div className="Row priority contentRow" key={ele._id} onClick = {() => handleClickOnRow(ele.agent, ele._id)}>
              <div className="userID">{ele.user}</div>
              <div className="message">{ele.messages[0].text}</div>
              <div className="timeStamp">{ele.createdAt}</div>
            </div>
          );
        else
          return (
            <div className="Row nonPriority contentRow" key={ele._id} onClick = {() => handleClickOnRow(ele.agent, ele._id)}>
              <div className="userID">{ele.user}</div>
              <div className="message">{ele.messages[0].text}</div>
              <div className="timeStamp">{ele.createdAt}</div>
            </div>
          );
      })}
    </div>
  );
}

export default Home;
