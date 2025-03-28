import React, { useContext } from "react";
import UsersContext from "../contexts/users"; // Import the UsersContext
import "./CurrentUser.css"; // Import the CSS file for styling

const CurrentUser = () => {
  const { currentUser, updateCurrentUser, fetchUsers  } = useContext(UsersContext); // Access currentUser and setCurrentUser from the context

  if (!currentUser || !currentUser.name) {
    return <div>No current user found.</div>; // Handle case where currentUser is not set
  }

  // Determine the CSS class for the status banner
  const statusClass = `status-banner ${currentUser.status.toLowerCase()}`;

  // Handlers to change the status
  const handleSetOnline = () => {
    updateCurrentUser({ ...currentUser, status: "online" });
    // also pull all the users
    fetchUsers();
  };

  const handleSetOffline = () => {
    updateCurrentUser({ ...currentUser, status: "offline" });
    fetchUsers();
  };

  return (
    <div className="current-user">
      <p><strong>Leads:</strong> {currentUser.leads}</p>
      <div className="status-buttons">
        <button onClick={handleSetOnline}>Set Online</button>
        <button onClick={handleSetOffline}>Set Offline</button>
      </div>
      <div className={statusClass}>{currentUser.status}</div> {/* Status banner */}
    </div>
  );
};

export default CurrentUser;