import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import AnimatedFilter from '../components/AnimatedFilter';

const ProfileScreen = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="App" />
      <AnimatedFilter filterAnimation={new Animated.Value(0)} />
      <View style={styles.content}>
        <Text style={styles.text}>Profile Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default ProfileScreen;