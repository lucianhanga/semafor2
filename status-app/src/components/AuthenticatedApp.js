import React from "react";
import Header from "./Header"; // Import the Header component
import Body from "./Body"; // Import the Body component
import StatusBar from "./StatusBar"; // Import the StatusBar component
import "./AuthenticatedApp.css"; // Import the CSS file

const AuthenticatedApp = ({ account }) => {
  return (
    <div className="authenticated-app">
      <Header account={account} /> {/* Add the Header component */}
      <Body /> {/* Add the Body component */}
      <StatusBar /> {/* Add the StatusBar component */}
    </div>
  );
};

export default AuthenticatedApp;