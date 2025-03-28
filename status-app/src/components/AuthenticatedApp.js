import "./AuthenticatedApp.css"; // Import the CSS file
import React from "react";
import Header from "./Header"; // Import the Header component
import Body from "./Body"; // Import the Body component
import StatusBar from "./StatusBar"; // Import the StatusBar component
import UsersContext from "../contexts/users"; // Import the fetchUsers function
import { useEffect, useContext } from "react";
import { useFetchUsersInterval } from "../hooks/fetchUserInterval"; // Import the custom hook

const AuthenticatedApp = ({ account }) => {

  const { fetchUsers } = useContext(UsersContext); // Use the fetchUsers function from context

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Set up an interval to fetch users every 5 seconds
  useFetchUsersInterval(20000, fetchUsers); // Fetch users every 5 seconds

  return (
    <div className="authenticated-app">
      <Header account={account} /> {/* Add the Header component */}
      <Body /> {/* Add the Body component */}
      <StatusBar /> {/* Add the StatusBar component */}
    </div>
  );
};

export default AuthenticatedApp;