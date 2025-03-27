import React, { useContext } from "react";
import UsersContext from "../contexts/users";
import ShowUser from "./ShowUser"; // Import the ShowUser component
import "./UserList.css"; // Import the CSS file for styling

const UserList = () => {
  const { users } = useContext(UsersContext); // Access the users from the context

  // Generate the renderedUser value
  const renderedUser = users.map((user) => (
    <ShowUser key={user.id} user={user} /> // Render ShowUser for each user
  ));

  return (
    <div className="user-list">
      <ul>{renderedUser}</ul>
    </div>
  );
};

export default UserList;