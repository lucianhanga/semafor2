import React from "react";
import UserList from "./UserList"; // Import the UserList component
import CurrentUser from "./CurrentUser"; // Import the CurrentUser component
import "./Body.css"; // Import the CSS file for styling

const Body = () => {
  return (
    <div className="body">
      <UserList /> {/* Add the UserList component */}
      <CurrentUser /> {/* Add the CurrentUser component */}
    </div>
  );
};

export default Body;