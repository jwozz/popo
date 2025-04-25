import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Animated, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const AnimatedFilter = forwardRef((props, ref) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [activeFilter, setActiveFilter] = useState('');
  
  // Animation related refs and values
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const filterHeight = 70;
  const scrollThreshold = 70;
  const filterAnimation = useRef(new Animated.Value(0)).current;
  const pastThreshold = useRef(false);
  
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
  
  // Handle scroll events for filter animation
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
  
  // Expose methods to the parent component through ref
  useImperativeHandle(ref, () => ({
    handleScroll
  }));
  
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
              activeFilter === 'Shop' && styles.activeFilterText
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
              activeFilter === 'Chat' && styles.activeFilterText
            ]}
          >
            Talks
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterChip,
            activeFilter === 'Profile' && styles.activeFilterChip
          ]}
          onPress={() => handleFilterPress('Profile')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'Profile' && styles.activeFilterText
            ]}
          >
            Inbox
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  filterContainer: {
    justifyContent: 'center',
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
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 20,
  },
  activeFilterChip: {
    backgroundColor: '#e8f5e9',
  },
  filterText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757575',
  },
  activeFilterText: {
    color: '#26a69a',
  },
});

export default AnimatedFilter;