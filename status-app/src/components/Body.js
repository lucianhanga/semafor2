import React from "react";
import UserList from "./UserList"; // Import the UserList component
import CurrentUser from "./CurrentUser"; // Import the CurrentUser component
import "./Body.css"; // Import the CSS file for styling
import UsersContext from "../contexts/users"; // Import the fetchUsers function
import { useEffect, useContext } from "react";


const Body = () => 
{
  const { fetchUsers } = useContext(UsersContext); // Use the fetchUsers function from context

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="body">
      <UserList /> {/* Add the UserList component */}
      <CurrentUser /> {/* Add the CurrentUser component */}
    </div>
  );
};

export default Body;