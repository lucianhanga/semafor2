import { createContext, useState } from 'react';

const UsersContext = createContext();

function Provider({ children }) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      status: 'Online',
      leads: 4,
    },
    {
      id: 2,
      name: 'Jane Smith',
      status: 'Offline',
      leads: 2,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      status: 'Away',
      leads: 5,
    },
    {
      id: 4,
      name: 'Bob Brown',
      status: 'Busy',
      leads: 3,
    },
    {
      id: 5,
      name: 'Charlie Davis',
      status: 'Online',
      leads: 1,
    },
    {
      id: 6,
      name: 'Diana Prince',
      status: 'Offline',
      leads: 0,
    },
    {
      id: 7,
      name: 'Ethan Hunt',
      status: 'Away',
      leads: 2,
    },
    {
      id: 8,
      name: 'Fiona Apple',
      status: 'Busy',
      leads: 4,
    },
    {
      id: 9,
      name: 'George Clooney',
      status: 'Online',
      leads: 3,
    },
    {
      id: 10,
      name: 'Hannah Montana',
      status: 'Offline',
      leads: 1,
    },
    {
      id: 11,
      name: 'Ian Somerhalder',
      status: 'Away',
      leads: 2,
    },
    {
      id: 12,
      name: 'Jessica Alba',
      status: 'Busy',
      leads: 5,
    },
    {
      id: 13,
      name: 'Kevin Bacon',
      status: 'Online',
      leads: 0,
    },
    {
      id: 14,
      name: 'Liam Neeson',
      status: 'Offline',
      leads: 3,
    },
    {
      id: 15,
      name: 'Megan Fox',
      status: 'Away',
      leads: 4,
    },
  ]);

  // Filter users to include only those with statuses: Busy, Online, Offline
  const filteredUsers = users.filter((user) =>
    ['Busy', 'Online', 'Offline'].includes(user.status)
  );

  const valueToShare = {
    users: filteredUsers,
  };

  return (
    <UsersContext.Provider value={valueToShare}>
      {children}
    </UsersContext.Provider>
  );
}

export { Provider };
export default UsersContext;

