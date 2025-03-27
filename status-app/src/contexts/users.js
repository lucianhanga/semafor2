import { createContext, useState } from 'react';
import axios from 'axios'; // Import axios

// Get the API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UsersContext = createContext();

function Provider({ children }) {
  const [users, setUsers] = useState([]);

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
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const valueToShare = {
    users,
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

