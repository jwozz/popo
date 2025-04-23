/**
 * Database service
 * This module provides functions for interacting with the database
 * In a real app, this would connect to Firebase, GraphQL, REST APIs, etc.
 */

// Mock API endpoints for messages
export const messagesApi = {
    // Fetch messages
    getMessages: async () => {
      try {
        // Simulate API call with 500ms delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, you would fetch data from the server:
        // const response = await fetch('https://api.example.com/messages');
        // return response.json();
        
        // For now, return mock data
        return mockMessages;
      } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
      }
    },
    
    // Post a new message
    postMessage: async (message) => {
      try {
        // Simulate API call with 300ms delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // In a real app, you would post to a server:
        // const response = await fetch('https://api.example.com/messages', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(message)
        // });
        // return response.json();
        
        // For now, return the message with a generated ID
        return {
          ...message,
          id: `m${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          likes: 0,
          replies: 0,
        };
      } catch (error) {
        console.error('Error posting message:', error);
        throw error;
      }
    },
    
    // Toggle like status
    toggleLike: async (messageId) => {
      try {
        // Simulate API call with 200ms delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // In a real app, you would send a request:
        // const response = await fetch(`https://api.example.com/messages/${messageId}/like`, {
        //   method: 'POST'
        // });
        // return response.json();
        
        // For now, just return success
        return { success: true, messageId };
      } catch (error) {
        console.error('Error toggling like:', error);
        throw error;
      }
    },
    
    // Add a comment to a message
    addComment: async (messageId, comment) => {
      try {
        // Simulate API call with 300ms delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // In a real app, you would post to a server:
        // const response = await fetch(`https://api.example.com/messages/${messageId}/comments`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(comment)
        // });
        // return response.json();
        
        // For now, return the comment with a generated ID
        return {
          ...comment,
          id: `c${Date.now()}`,
          messageId,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
      }
    }
  };
  
  // Mock API endpoints for users
  export const usersApi = {
    // Fetch user profile
    getUserProfile: async (userId) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // In a real app, fetch user data from the server
        // const response = await fetch(`https://api.example.com/users/${userId}`);
        // return response.json();
        
        // For now, return mock data
        return mockUsers.find(user => user.id === userId) || null;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
    },
    
    // Follow a user
    followUser: async (userId) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // In a real app, send follow request to the server
        // const response = await fetch(`https://api.example.com/users/${userId}/follow`, {
        //   method: 'POST'
        // });
        // return response.json();
        
        // For now, return success
        return { success: true, userId };
      } catch (error) {
        console.error('Error following user:', error);
        throw error;
      }
    },
    
    // Unfollow a user
    unfollowUser: async (userId) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // In a real app, send unfollow request to the server
        // const response = await fetch(`https://api.example.com/users/${userId}/unfollow`, {
        //   method: 'POST'
        // });
        // return response.json();
        
        // For now, return success
        return { success: true, userId };
      } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
      }
    }
  };
  
  // Mock data
  const mockUsers = [
    {
      id: 'user1',
      name: 'Emma Johnson',
      username: 'emma_j',
      profileImage: 'https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg',
      bio: 'Coffee enthusiast | Travel lover | Food blogger',
      followers: 1243,
      following: 567
    },
    {
      id: 'user2',
      name: 'Michael Chen',
      username: 'mike_ceramics',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFv1LJuW59sR1KW6BDD5ietN8eJlEZLk7eA&s',
      bio: 'Handmade ceramics | Artist | Workshop instructor',
      followers: 3587,
      following: 421
    },
    // More mock users would be defined here
  ];
  
  const mockMessages = [
    // These would match the initialMessages in MessageContext
    // but would typically come from a database or API
  ];