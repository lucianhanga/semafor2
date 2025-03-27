import React from "react";
import "./Header.css"; // Optional: Add styles for the header

const Header = ({ account }) => {
  return (
    <div className="header">
      <h1>Hello, {account?.name || "User"}!</h1>
    </div>
  );
};

export default Header;