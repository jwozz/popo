import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
  TextInput,
  Animated 
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
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const filterHeight = 50;
  const scrollThreshold = 70;
  
  const filterAnimation = useRef(new Animated.Value(0)).current;
  const pastThreshold = useRef(false);

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollingUp = currentScrollY < lastScrollY.current;
    const scrollingDown = currentScrollY > lastScrollY.current;
    
    scrollY.setValue(currentScrollY);
    
    if (currentScrollY <= 0) {
      Animated.spring(filterAnimation, {
        toValue: 0,
        friction: 50,
        tension: 50,
        useNativeDriver: true
      }).start();
      pastThreshold.current = false;
    } 
    else if (currentScrollY > scrollThreshold && !pastThreshold.current) {
      pastThreshold.current = true;
    }
    
    if (pastThreshold.current) {
      if (scrollingUp && currentScrollY > 0) {
        Animated.spring(filterAnimation, {
          toValue: 0,
          friction: 50,
          tension: 50,
          useNativeDriver: true
        }).start();
      } 
      else if (scrollingDown && currentScrollY > scrollThreshold) {
        Animated.spring(filterAnimation, {
          toValue: -filterHeight,
          friction: 50,
          tension: 0,
          useNativeDriver: true
        }).start();
      }
    }
    
    lastScrollY.current = currentScrollY;
  };

  const handleSendMessage = (text) => {
    // Message sending logic would be implemented here
    console.log('Sending message:', text);
    setMessageText('');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="App" />
      
      <Tabs />

      <AnimatedFilter filterAnimation={filterAnimation} />

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
    paddingTop: 55, // Account for the filter container height
  },
});

export default ChatScreen;