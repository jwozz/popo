import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

const UserAvatar = ({ uri, size = 45, showFollowButton = false }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { colors } = useTheme();

  const toggleFollow = () => {
    setIsFollowing(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri }} 
        style={[
          styles.avatar, 
          { 
            width: size, 
            height: size, 
            borderRadius: size / 2 
          }
        ]} 
      />
      
      {showFollowButton && (
        <TouchableOpacity 
          style={[
            styles.followButton, 
            isFollowing ? { backgroundColor: colors.primary } : { backgroundColor: '#F6F6F6' }
          ]} 
          onPress={toggleFollow}
        >
          <Icon 
            name={isFollowing ? "check" : "add"} 
            size={14} 
            color={isFollowing ? '#fff' : colors.primary} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: 0,
    marginLeft: 22,
  },
  avatar: {
    borderWidth: 0,
    borderColor: 'rgb(228, 228, 228)',
    alignSelf: 'flex-start',
    top: 10
  },
  followButton: {
    position: 'absolute',
    bottom: -17,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  }
});

export default UserAvatar;