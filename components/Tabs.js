import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Tabs = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.tabsContainer, { backgroundColor: colors.primary }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Text style={styles.activeTabText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Calls</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: 10,
    display: 'none', // Hidden as in original code
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFFFFF',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Tabs;