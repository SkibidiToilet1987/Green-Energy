import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
export const UserContext = createContext();

// UserContext Provider Component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user data

  // Simulate fetching user data (e.g., from an API or localStorage)
  useEffect(() => {
    // Replace this with actual API call or authentication logic
    const fetchUserData = async () => {
      const userData = {
        id: '12345',
        name: 'John Doe',
        email: 'johndoe@example.com', // Replace with dynamic email
      };
      setUser(userData);
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;