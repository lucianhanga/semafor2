import { useEffect } from "react";

export const useFetchUsersInterval = (interval, fetchUsers) => {

  useEffect(() => {
    // Set up the interval
    const intervalId = setInterval(() => {
      fetchUsers(); // Call the fetchUsers function
    }, interval);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [interval, fetchUsers]); // Dependencies: interval and fetchUsers
};
