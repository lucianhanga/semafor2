import React from "react";
import { useMsal } from "@azure/msal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./LogOutBar.css";

const LogOutBar = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup().catch((e) => {
      console.error(e);
    });
  };

  return (
    <div className="logout-bar">
      <span className="logout-bar-title">Semafor2 App</span> {/* Use the application name */}
      <button className="logout-button" onClick={handleLogout} title="Log Out">
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>
    </div>
  );
};

export default LogOutBar;