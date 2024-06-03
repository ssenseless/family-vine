import React from "react";
import "./Home.css";

const Home = () => {
  const communicationShowcase = () => {
    window.TreeAPI.sendDB("Hello, this is Home.js");
  };

  const loggerShowcase = () => {
    window.TreeAPI.logReply("This is a log");
    window.TreeAPI.warnReply("This is a warning");
    window.TreeAPI.errReply("This is an error");
    window.TreeAPI.fatalReply("This is a fatal error");
  };

  return (
    <div>
      <div>
        <h1>Home</h1>
        <button onClick={communicationShowcase}>
          Click me to show IPC communication
        </button>

        <button onClick={loggerShowcase}>
          Click me to show logging functionality
        </button>
      </div>
    </div>
  );
};

export default Home;
