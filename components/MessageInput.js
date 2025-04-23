import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MessageInput = ({ value, onChangeText, onSend }) => {
  const { colors } = useTheme();
  const [inputValue, setInputValue] = useState(value || '');
  
  // Animation values
  const cameraOpacity = useRef(new Animated.Value(1)).current;
  const attachmentPosition = useRef(new Animated.Value(0)).current;
  
  // Handle text change
  const handleTextChange = (text) => {
    setInputValue(text);
    onChangeText(text);
    
    // Animate based on text presence
    if (text.trim().length > 0) {
      // Fade out camera and move attachment
      Animated.parallel([
        Animated.timing(cameraOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(attachmentPosition, {
          toValue: -1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Fade in camera and reset attachment position
      Animated.parallel([
        Animated.timing(cameraOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(attachmentPosition, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    }
  };
  
  // Handle send
  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue('');
      
      // Reset animations
      Animated.parallel([
        Animated.timing(cameraOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(attachmentPosition, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    }
  };
  
  // Calculate attachment position
  const attachmentTranslate = attachmentPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -36], // Move left into the camera's position
  });
  
  // Determine if send button should be active
  const isSendActive = inputValue.trim().length > 0;
  
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Share something..."
          value={inputValue}
          onChangeText={handleTextChange}
          multiline
        />
        
        <View style={styles.inputActions}>
          {/* Icons container */}
          <View style={styles.iconsContainer}>            
            {/* Attachment icon with position animation */}
            <Animated.View 
              style={[
                styles.iconWrapper,
                { transform: [{ translateX: attachmentTranslate }] }
              ]}
            >
              <TouchableOpacity>
                <Icon name="attach-file" size={22} color={colors.primary} />
              </TouchableOpacity>
            </Animated.View>

            {/* Camera icon with opacity animation */}
            <Animated.View 
              style={[
                styles.iconWrapper,  
                styles.cameraWrapper,
                { opacity: cameraOpacity }
              ]}
              pointerEvents={inputValue.trim() ? 'none' : 'auto'}
            >
              <TouchableOpacity>
                <Icon name="camera-alt" size={22} color={colors.primary} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={[
          styles.sendButton, 
          { backgroundColor: isSendActive ? colors.primary : '#CCCCCC' }
        ]}
        onPress={handleSend}
        disabled={!isSendActive}
      >
        <MaterialCommunityIcons name="arrow-up" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingVertical: 5,
    borderTopWidth: 0,
    borderTopColor: '#E8E8E8',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(228, 228, 228)',
    borderRadius: 25,
    paddingHorizontal: 16,
    alignItems: 'center',
    minHeight: 50,
    maxHeight: 100,
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 80, // Make room for the icons
  },
  inputActions: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 70, // Fixed width container for both icons
    justifyContent: 'flex-end',
    height: 32,
    overflow: 'hidden', // Ensure icons don't overflow
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  cameraWrapper: {
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  }
});

export default MessageInput;