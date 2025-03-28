import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import UsersContext from "../contexts/users"; // Import the UsersContext
import "./CurrentUser.css"; // Import the CSS file for styling

const CurrentUser = () => {
  const { currentUser, updateCurrentUser, fetchUsers } = useContext(UsersContext); // Access currentUser and setCurrentUser from the context

  if (!currentUser || !currentUser.name) {
    return <div>No current user found.</div>; // Handle case where currentUser is not set
  }

  // Determine the CSS class for the status banner
  const statusClass = `status-banner ${currentUser.status.toLowerCase()}`;

  // Handlers to change the status
  const handleSetOnline = () => {
    updateCurrentUser({ ...currentUser, status: "online" });
    fetchUsers();
  };

  const handleSetOffline = () => {
    // if the user is set offline, set the leads to 0
    if (currentUser.leads > 0) {
      updateCurrentUser({ ...currentUser, leads: 0 });
    }
    updateCurrentUser({ ...currentUser, status: "offline" });
    fetchUsers();
  };

  // Handlers to increase and decrease leads
  const handleIncreaseLeads = () => {
    if (currentUser.leads < 4) {
      const newCurrentUser = { ...currentUser, leads: currentUser.leads + 1 };
      // if the leads are 4, set the status to busy
      if (newCurrentUser.leads === 4) {
        updateCurrentUser({ ...newCurrentUser, status: "busy" });
      }
      updateCurrentUser(newCurrentUser);
      fetchUsers();
    }
  };

  const handleDecreaseLeads = () => {
    if (currentUser.leads > 0) {
      const newCurrentUser = { ...currentUser, leads: currentUser.leads - 1 };
      if (newCurrentUser.leads < 4) {
        updateCurrentUser({ ...newCurrentUser, status: "online" });
      }

      updateCurrentUser({ ...currentUser, leads: currentUser.leads - 1 });
      fetchUsers();
    }
  };

  return (
    <div className="current-user">
      <div className="leads-buttons">
        <button onClick={handleDecreaseLeads} title="Decrease Leads">
          <FontAwesomeIcon icon={faMinus} />
        </button>
        Leads: <strong>{currentUser.leads}</strong>
        <button onClick={handleIncreaseLeads} title="Increase Leads">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="status-buttons">
        <button onClick={handleSetOnline}>Set Online</button>
        <button onClick={handleSetOffline}>Set Offline</button>
      </div>
      <div className={statusClass}>{currentUser.status}</div> {/* Status banner */}
    </div>
  );
};

export default CurrentUser;