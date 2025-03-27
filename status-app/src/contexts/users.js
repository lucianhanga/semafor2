import { createContext, useState } from 'react';
import { useMsal } from '@azure/msal-react'; // Import useMsal from msal-react
import axios from 'axios'; // Import axios

// Get the API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UsersContext = createContext();

function Provider({ children }) {
  // get the msal the account
  const { accounts } = useMsal();
  const account = accounts && accounts.length > 0 ? accounts[0] : null;
  // log the account
  console.log('Account:', account);
  
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/UpdateUsers`); // Use axios to make the GET request
      console.log('Response:', response.data); // Log the response to inspect its structure

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
      console.log('Mapped Users:', mappedUsers);

      // Find the current user based on the account information
      const currentUser = mappedUsers.find((user) => user.id === account.localAccountId);
      if (currentUser) {
        setCurrentUser(currentUser); // Set the current user
        console.log('Current User:', currentUser);
      } else {
        console.error('Current user not found in the users list.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const valueToShare = {
    users,
    currentUser,
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

