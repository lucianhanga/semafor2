import { createContext, useState, useCallback } from 'react';
import { useMsal } from '@azure/msal-react'; // Import useMsal from msal-react
import { loginRequest } from '../authConfig'; // Import loginRequest
import axios from 'axios'; // Import axios

// Get the API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UsersContext = createContext();

function Provider({ children }) {
  // Get the MSAL account
  const { instance, accounts } = useMsal();
  const account = accounts && accounts.length > 0 ? accounts[0] : null;

  // Log the account
  console.log('Account:', account);

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const updateCurrentUser = useCallback( async (user) => {
    console.log("Updating current user:", user);

    try {
      // Get the access token
      console.log("Attempting to acquire token silently...");
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
      console.log("Token acquired:", tokenResponse.accessToken);

      // Make the POST request with the Authorization header
      const response = await axios.post(`${API_BASE_URL}/UpdateState`, user, {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`, // Add the access token to the Authorization header
        },
      });
      console.log("Response:", response.data); // Log the response to inspect its structure

    } catch (error) {
      console.error("Error updating the current user.", error);
    }
  } , [account, instance]);

  // Define fetchUsers as a callback
  const fetchUsers = useCallback(async () => {
    try {
      // Get the access token
      console.log("Attempting to acquire token silently...");
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
      console.log("Token acquired:", tokenResponse.accessToken);

      // Make the GET request with the Authorization header
      const response = await axios.get(`${API_BASE_URL}/UpdateUsers`, {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`, // Add the access token to the Authorization header
        },
      });
      console.log("Response:", response.data); // Log the response to inspect its structure

      // Check if response.data is an array or contains the array in a nested property
      const usersArray = Array.isArray(response.data)
        ? response.data
        : response.data.users || []; // Adjust this based on the actual structure

      // Map the response to the users array
      const mappedUsers = usersArray.map((user) => ({
        id: user.rowKey,
        name: user.name,
        status: user.status,
        leads: user.leads,
      }));

      setUsers(mappedUsers); // Set the users with the mapped response data
      console.log("Mapped Users:", mappedUsers);

      // Find the current user based on the account information
      const currentUser = mappedUsers.find((user) => user.id === account.localAccountId);
      if (currentUser) {
        setCurrentUser(currentUser); // Set the current user
        console.log("Current User:", currentUser);
      } else {
        console.error("Current user not found in the users list.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [account, instance]); // Dependencies: account and instance

  const valueToShare = {
    users,
    currentUser,
    updateCurrentUser, 
    fetchUsers,
  };

  return (
    <UsersContext.Provider value={valueToShare}>
      {children}
    </UsersContext.Provider>
  );
}

export { Provider };
export default UsersContext;

