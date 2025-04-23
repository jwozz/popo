import React from 'react';
import { Animated, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const AnimatedFilter = ({ filterAnimation }) => {
  const { colors } = useTheme();

  return (
    <Animated.View 
      style={[
        styles.filterContainer,
        { transform: [{ translateY: filterAnimation }] }
      ]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterChip, styles.activeFilterChip]}>
          <Text style={[styles.activeFilterText, { color: colors.primary }]}>Talks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Inbox</Text>
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