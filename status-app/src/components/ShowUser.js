import React from "react";
import "./ShowUser.css"; // Import the CSS file for styling

const ShowUser = ({ user }) => {
  const getStatusSymbol = (status) => {
    switch (status) {
      case "online":
        return <span className="status-symbol online" title="Online">●</span>;
      case "offline":
        return <span className="status-symbol offline" title="Offline">●</span>;
      case "busy":
        return <span className="status-symbol busy" title="Busy">●</span>;
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