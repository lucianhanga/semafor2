import React, { useContext } from "react";
import UsersContext from "../contexts/users"; // Import the UsersContext
import "./CurrentUser.css"; // Import the CSS file for styling

const CurrentUser = () => {
  const { currentUser } = useContext(UsersContext); // Access currentUser from the context

  if (!currentUser || !currentUser.name) {
    return <div>No current user found.</div>; // Handle case where currentUser is not set
  }

  // Determine the CSS class for the status banner
  const statusClass = `status-banner ${currentUser.status.toLowerCase()}`;

  return (
    <div className="current-user">
      <div className={statusClass}>{currentUser.status}</div> {/* Status banner */}
      <h2>Current User</h2>
      <p><strong>Name:</strong> {currentUser.name}</p>
      <p><strong>Status:</strong> {currentUser.status}</p>
      <p><strong>Leads:</strong> {currentUser.leads}</p>
    </div>
  );
};

export default CurrentUser;