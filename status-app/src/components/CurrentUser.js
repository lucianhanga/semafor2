import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import UsersContext from "../contexts/users"; // Import the UsersContext
import "./CurrentUser.css"; // Import the CSS file for styling

const CurrentUser = () => {
  const { currentUser, updateCurrentUser, fetchUsers } = useContext(UsersContext); // Access currentUser and setCurrentUser from the context
  const [loading, setLoading] = useState(false); // State to track loading

  if (!currentUser || !currentUser.name) {
    return <div>No current user found.</div>; // Handle case where currentUser is not set
  }

  // Determine the CSS class for the status banner
  const statusClass = `status-banner ${currentUser.status.toLowerCase()}`;

  // Handlers to change the status
  const handleSetOnline = async () => {
    if (currentUser.status !== "busy") {
      setLoading(true); // Show loading overlay
      await updateCurrentUser({ ...currentUser, status: "online" });
      await fetchUsers();
      setLoading(false); // Hide loading overlay
    }
  };

  const handleSetOffline = async () => {
    setLoading(true); // Show loading overlay
    await updateCurrentUser({ ...currentUser, status: "offline" });
    await fetchUsers();
    setLoading(false); // Hide loading overlay
  };

  // Handlers to increase and decrease leads
  const handleIncreaseLeads = async () => {
    if (currentUser.leads < 4) {
      const newCurrentUser = { ...currentUser, leads: currentUser.leads + 1 };
      newCurrentUser.status = "online"; // set the status to online
      if (newCurrentUser.leads === 4) {
        newCurrentUser.status = "busy"; // set the status to busy
      }
      setLoading(true); // Show loading overlay
      await updateCurrentUser(newCurrentUser);
      await fetchUsers();
      setLoading(false); // Hide loading overlay
    }
  };

  const handleDecreaseLeads = async () => {
    if (currentUser.leads > 0) {
      const newCurrentUser = { ...currentUser, leads: currentUser.leads - 1 };
      if (newCurrentUser.leads < 4) {
        newCurrentUser.status = "online"; // set the status to online
      }
      setLoading(true); // Show loading overlay
      await updateCurrentUser(newCurrentUser);
      await fetchUsers();
      setLoading(false); // Hide loading overlay
    }
  };

  return (
    <div className="current-user">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
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
      <div className={statusClass}>
        {currentUser.status === "busy" ? "full" : currentUser.status}
      </div> {/* Status banner */}
    </div>
  );
};

export default CurrentUser;