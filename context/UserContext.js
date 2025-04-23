import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 'me',
    name: 'You',
    image: 'https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909347-stock-photo-young-employee-standing-upright-in.jpg',
  });
  
  const [followedUsers, setFollowedUsers] = useState({});
  
  const followUser = (userId) => {
    setFollowedUsers(prev => ({
      ...prev,
      [userId]: true
    }));
  };
  
  const unfollowUser = (userId) => {
    setFollowedUsers(prev => ({
      ...prev,
      [userId]: false
    }));
  };
  
  const isFollowing = (userId) => {
    return !!followedUsers[userId];
  };
  
  return (
    <UserContext.Provider value={{ 
      currentUser, 
      followUser, 
      unfollowUser, 
      isFollowing 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);