// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context for user information
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(localStorage.getItem('account') || '');

  return (
    <UserContext.Provider value={{ userAddress, setUserAddress }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
