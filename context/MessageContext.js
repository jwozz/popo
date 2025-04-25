import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

// Mock message data
const initialMessages = [
  {
    id: 'm1',
    userId: 'user1',
    userName: 'Emma Johnson',
    userImage: 'https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg',
    isOwn: false,
    message: "Just discovered this amazing coffee shop downtown! Anyone want to join me tomorrow morning?",
    time: '2hrs',
    likes: 12,
    replies: 4,
    liked: false,
    commenters: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFv1LJuW59sR1KW6BDD5ietN8eJlEZLk7eA&s',
      'https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg'
    ]
  },
  {
    id: 'm2',
    userId: 'user2',
    userName: 'Michael Chen',
    userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFv1LJuW59sR1KW6BDD5ietN8eJlEZLk7eA&s',
    isOwn: false,
    message: null,
    mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_7RXnbtI_yMq1eMKnONK5oJhKcmEg558M0w&s',
    caption: "Check out my new handmade ceramic collection! Each piece is unique and perfect for your morning coffee ritual. 🍵",
    time: '.12hrs',
    likes: 28,
    replies: 7,
    liked: false,
    commenters: [
      'https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909347-stock-photo-young-employee-standing-upright-in.jpg',
      'https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg'
    ]
  },
  {
    id: 'm3',
    userId: 'user3',
    userName: 'Sarah Williams',
    userImage: 'https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg',
    isOwn: false,
    message: "Has anyone tried the new Thai restaurant on 5th Street? I heard they have amazing pad thai!",
    time: '.1d',
    likes: 5,
    replies: 9,
    liked: false,
    commenters: [
      'https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg',
      'https://st2.depositphotos.com/1034986/6164/i/450/depositphotos_61642047-stock-photo-beautiful-brunette-woman.jpg'
    ]
  },
  {
    id: 'm4',
    userId: 'user7',
    userName: 'You',
    userImage: 'https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909347-stock-photo-young-employee-standing-upright-in.jpg',
    isOwn: false,
    message: "Just finished my morning run! 5k in 22 minutes - new personal best! 🏃‍♂️",
    time: '.2d',
    likes: 14,
    replies: 3,
    liked: false,
    commenters: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFv1LJuW59sR1KW6BDD5ietN8eJlEZLk7eA&s',
      'https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg'
    ]
  },
  {
    id: 'm5',
    userId: 'user4',
    userName: 'Alex Rodriguez',
    userImage: 'https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg',
    isOwn: false,
    message: null,
    mediaUrl: 'https://images.stockcake.com/public/b/d/e/bdecd851-cd76-4d2d-adb8-2115c5e9f553_large/sunrise-city-view-stockcake.jpg',
    caption: "My view this morning. Starting the day with gratitude and this stunning sunrise. #morningvibes",
    time: '.4d',
    likes: 31,
    replies: 5,
    liked: false,
    commenters: [
      'https://media.istockphoto.com/id/1149504274/photo/portrait-of-a-taiwanese-man.jpg?s=612x612&w=0&k=20&c=uiQDg8fKN1LCTCU-AxNosEagZAwt7mZdAqRqMLDatyI=',
      'https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909347-stock-photo-young-employee-standing-upright-in.jpg'
    ]
  },
  {
    id: 'm6',
    userId: 'user5',
    userName: 'Jessica Parker',
    userImage: 'https://st2.depositphotos.com/1034986/6164/i/450/depositphotos_61642047-stock-photo-beautiful-brunette-woman.jpg',
    isOwn: false,
    message: "I'm selling my concert tickets for this weekend - can't make it anymore. DM me if interested!",
    time: '.1w',
    likes: 3,
    replies: 8,
    liked: false,
    commenters: [
      'https://media.istockphoto.com/id/1149504274/photo/portrait-of-a-taiwanese-man.jpg?s=612x612&w=0&k=20&c=uiQDg8fKN1LCTCU-AxNosEagZAwt7mZdAqRqMLDatyI=',
      'https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg'
    ]
  },
  {
    id: 'm7',
    userId: 'user6',
    userName: 'David Wilson',
    userImage: 'https://media.istockphoto.com/id/1149504274/photo/portrait-of-a-taiwanese-man.jpg?s=612x612&w=0&k=20&c=uiQDg8fKN1LCTCU-AxNosEagZAwt7mZdAqRqMLDatyI=',
    isOwn: false,
    message: null,
    mediaUrl: 'https://m.media-amazon.com/images/I/815-mK7dKKL._AC_UF350,350_QL80_.jpg',
    caption: "My handcrafted wooden cutting boards are back in stock! Limited quantity available. Perfect for your kitchen or as a gift! 🪵🔪",
    time: '.1m',
    likes: 42,
    replies: 11,
    liked: false,
    commenters: [
      'https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFv1LJuW59sR1KW6BDD5ietN8eJlEZLk7eA&s'
    ]
  },
];

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(initialMessages);
  
  // Toggle like status for a message
  const toggleLike = (messageId) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === messageId
          ? { ...message, liked: !message.liked }
          : message
      )
    );
  };
  
  // Add a new message
  const addMessage = (newMessage) => {
    setMessages(prevMessages => [
      ...prevMessages, 
      {
        ...newMessage,
        id: `m${Date.now()}`, // Generate a unique ID
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        likes: 0,
        replies: 0,
        liked: false,
        commenters: []
      }
    ]);
  };
  
  // Add a comment/reply to a message
  const addComment = (messageId, comment) => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === messageId
          ? { 
              ...message, 
              replies: message.replies + 1,
              // In a real app, you'd store comments in a sub-array
            }
          : message
      )
    );
  };
  
  // Forward a message
  const forwardMessage = (messageId) => {
    // Logic to handle forwarding a message
    // This would typically involve getting the message content
    // and preparing it to be shared in other chats
    const messageToForward = messages.find(msg => msg.id === messageId);
    console.log('Forwarding message:', messageToForward);
    
    // In a real app, this would open a forward dialog
    // For now, we'll just log it
    return messageToForward;
  };
  
  return (
    <MessageContext.Provider value={{ 
      messages, 
      toggleLike, 
      addMessage, 
      addComment,
      forwardMessage
    }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);