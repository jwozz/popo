import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import AnimatedFilter from '../components/AnimatedFilter';
import ChatBubble from '../components/ChatBubble';
import MessageInput from '../components/MessageInput';
import { useMessages } from '../context/MessageContext';
import { useTheme } from '../context/ThemeContext';

const ChatScreen = () => {
  const [messageText, setMessageText] = useState('');
  const { messages, toggleLike } = useMessages();
  const { colors } = useTheme();
  const animatedFilterRef = useRef(null);
  
  const handleSendMessage = (text) => {
    // Message sending logic would be implemented here
    console.log('Sending message:', text);
    setMessageText('');
  };
  
  // Pass the scroll event to the AnimatedFilter's handleScroll method
  const handleScroll = (event) => {
    if (animatedFilterRef.current && animatedFilterRef.current.handleScroll) {
      animatedFilterRef.current.handleScroll(event);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="App" />
      <Tabs />
      <AnimatedFilter ref={animatedFilterRef} />
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ChatBubble
            message={item}
            onLike={() => toggleLike(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatFeed}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <MessageInput
        value={messageText}
        onChangeText={setMessageText}
        onSend={handleSendMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatFeed: {
    padding: 10,
    paddingTop: 80, // Account for the filter container height
  },
});

export default ChatScreen;