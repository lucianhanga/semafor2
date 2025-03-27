import React from "react";
import "./UnAuthenticatedApp.css"; // Optional: Add styles for this component

const UnAuthenticatedApp = () => {
  return (
    <div className="unauthenticated-app">
      <h2>Not Authorized</h2>
      <p>You do not have access to this application.</p>
    </div>
  );
};

export default UnAuthenticatedApp;