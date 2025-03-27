import { useState, useEffect } from "react";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Login from "./components/Login";
import AuthenticatedApp from "./components/AuthenticatedApp";
import UnAuthenticatedApp from "./components/UnAuthenticatedApp";
import LogOutBar from "./components/LogOutBar"; // Import LogOutBar
import "./App.css";

const App = () => {
  const { accounts } = useMsal();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Get the first account (if available)
  const account = accounts && accounts.length > 0 ? accounts[0] : null;

  useEffect(() => {
    // Example authorization logic: Check if the account exists
    if (account) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [account]);

  return (
    <div>
      <AuthenticatedTemplate>
        <LogOutBar /> {/* Add LogOutBar at the top */}
        {isAuthorized ? (
          <AuthenticatedApp account={account} />
        ) : (
          <UnAuthenticatedApp />
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </div>
  );
};

export default App;
