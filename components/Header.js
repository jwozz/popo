import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Pressable
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Antdesign from 'react-native-vector-icons/AntDesign';

const Header = ({ title }) => {
  const { colors } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  // Get navigation directly in the Header component
  const navigation = useNavigation();
  
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  
  // This function will be called when the camera icon is pressed
  const handleCameraPress = () => {
    console.log("Camera icon pressed, attempting to navigate to Camera");
    setShowPopup(false);
    
    // Add a slight delay to ensure the popup closing animation completes
    setTimeout(() => {
      // This is the key line that navigates to the Camera screen
      navigation.navigate('Camera');
    }, 50);
  };
  
  const handleTextPress = () => {
    console.log("Text icon pressed");
    setShowPopup(false);
    // You can add text post navigation when that screen is created
  };

  return (
    <>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerIcons}>
          <View style={styles.popupContainer}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={togglePopup}
            >
              <Antdesign name="plus" size={20} color="rgb(94, 94, 94)" />
            </TouchableOpacity>
            
            {showPopup && (
              <View style={styles.popup}>
                <TouchableOpacity 
                  style={styles.popupItem} 
                  onPress={handleCameraPress}
                  activeOpacity={0.6}
                >
                  <Antdesign name="camera" size={18} color="rgb(94, 94, 94)" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.popupItem} 
                  onPress={handleTextPress}
                  activeOpacity={0.6}
                >
                  <Antdesign name="edit" size={18} color="rgb(94, 94, 94)" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <TouchableOpacity style={styles.iconButton}>
            <Antdesign name="user" size={20} color="rgb(94, 94, 94)" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Invisible overlay to handle touches outside the popup */}
      {showPopup && (
        <Pressable
          style={styles.overlay}
          onPress={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingLeft: 20,
    paddingVertical: 10,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'rgb(0,0,0)',
  },
  headerIcons: {
    flexDirection: 'row',
    zIndex: 20, // Ensure icons are above overlay
  },
  iconButton: {
    marginLeft: 35,
  },
  popupContainer: {
    position: 'relative',
    zIndex: 20, // Ensure popup container is above overlay
  },
  popup: {
    position: 'absolute',
    top: 25,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 20, // Ensure popup is above overlay
  },
  popupItem: {
    padding: 8,
    marginHorizontal: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: -15, // Below popup but above everything else
  }
});

export default Header;