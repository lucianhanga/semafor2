import React from "react";
import "./ShowUser.css"; // Import the CSS file for styling

const ShowUser = ({ user }) => {
  const getStatusSymbol = (status) => {
    switch (status) {
      case "Online":
        return <span className="status-symbol online">●</span>;
      case "Offline":
        return <span className="status-symbol offline">●</span>;
      case "Busy":
        return <span className="status-symbol busy">●</span>;
      default:
        return null;
    }
  };

  return (
    <li className="show-user">
      <span className="user-name">{user.name}</span>
      <span className="user-leads">{user.leads} leads</span>
      {getStatusSymbol(user.status)} {/* Render the status symbol */}
    </li>
  );
};

export default ShowUser;