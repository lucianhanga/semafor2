import React from "react";
import "./AuthenticatedApp.css"; // Import the CSS file

const AuthenticatedApp = ({ account }) => {
  return (
    <div className="authenticated-app">
      <h2>Welcome, {account && account.name}!</h2>
      <p>You are successfully logged in.</p>
    </div>
  );
};

export default AuthenticatedApp;