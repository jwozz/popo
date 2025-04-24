import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const AnimatedFilter = ({ filterAnimation }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [activeFilter, setActiveFilter] = useState('');

  // Set initial active filter and update when route changes
  useEffect(() => {
    updateActiveFilterFromRoute(route.name);
  }, [route.name]);

  // Helper function to determine active filter from route name
  const updateActiveFilterFromRoute = (routeName) => {
    if (routeName.includes('Shop')) {
      setActiveFilter('Shop');
    } else if (routeName.includes('Chat')) {
      setActiveFilter('Chat');
    } else if (routeName.includes('Inbox') || routeName.includes('Profile')) {
      setActiveFilter('Profile');
    }
  };

  const handleFilterPress = (screenName) => {
    // Update active filter immediately when pressed
    setActiveFilter(screenName);
    // Then navigate to the screen
    navigation.navigate(screenName);
  };

  return (
    <Animated.View
      style={[
        styles.filterContainer,
        { transform: [{ translateY: filterAnimation }] }
      ]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.filterChip,
            activeFilter === 'Shop' && styles.activeFilterChip
          ]}
          onPress={() => handleFilterPress('Shop')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'Shop' && { ...styles.activeFilterText, color: colors.primary }
            ]}
          >
            Shop
          </Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[
            styles.filterChip,
            activeFilter === 'Chat' && styles.activeFilterChip
          ]}
          onPress={() => handleFilterPress('Chat')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'Chat' && { ...styles.activeFilterText, color: colors.primary }
            ]}
          >
            Talks
          </Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[
            styles.filterChip,
            activeFilter === 'Inbox' && styles.activeFilterChip
          ]}
          onPress={() => handleFilterPress('Profile')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'Inbox' && { ...styles.activeFilterText, color: colors.primary }
            ]}
          >
            Inbox
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 10,
    paddingLeft: 12,
    borderBottomWidth: 0,
    borderBottomColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    top: 46,
    left: 0,
    right: 0,
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 0,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: 'rgb(228, 228, 228)',
  },
  activeFilterChip: {
    backgroundColor: '#DCF8C6',
  },
  filterText: {
    color: '#444',
    fontSize: 14,
  },
  activeFilterText: {
    fontWeight: '500',
    fontSize: 14,
  },
});

export default AnimatedFilter;