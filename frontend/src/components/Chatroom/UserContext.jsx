// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  // State to hold user information
  const [user, setUser] = useState({
    id: null, // User ID
    email: '', // User email
    meetIds: [], // Array of meet IDs
    status: 0, // User status
    // Add more user-related information as needed
  });

  // Define the context value
  const contextValue = { user, setUser };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Create a custom hook to access the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
