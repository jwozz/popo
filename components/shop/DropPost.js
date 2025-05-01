// Chat-Commerce Drop Post UI Concept (React Native/Expo without third-party plugins)

import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function DropPost() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Zahra', text: 'Is this available in black?' },
    { id: 2, user: 'You', text: 'Yes! Got 3 left in stock.' },
    { id: 3, user: 'Dan', text: 'Can I pay on delivery?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: 'You', text: input }]);
      setInput('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Product Section */}
      <View style={styles.card}>
        <Image source={{ uri: 'https://via.placeholder.com/400x300' }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>Kitenge Jacket</Text>
          <Text style={styles.price}>Ksh 2,500</Text>
          <Text style={styles.meta}>💬 Live Chat · 8 people</Text>
          <Text style={styles.timer}>⏰ Ends in 22h 18m</Text>
        </View>
      </View>

      {/* Chat Section */}
      <View style={styles.chatBox}>
        <Text style={styles.chatHeader}>Chat with buyers</Text>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.message}>
            <Text style={styles.messageUser}>{msg.user}</Text>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Buy Now Button */}
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>🛒 Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    color: '#555',
    marginTop: 4,
  },
  meta: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  timer: {
    fontSize: 14,
    color: '#cc0000',
    marginTop: 4,
  },
  chatBox: {
    backgroundColor: '#f1f1f1',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  chatHeader: {
    fontWeight: '600',
    marginBottom: 10,
    fontSize: 16,
  },
  message: {
    marginBottom: 8,
  },
  messageUser: {
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 15,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  sendButton: {
    backgroundColor: '#333',
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  sendButtonText: {
    color: '#fff',
  },
  buyButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});