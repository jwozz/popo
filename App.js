import React, { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar, SafeAreaView, View, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { UserProvider } from './context/UserContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { MessageProvider } from './context/MessageContext';
import Constants from 'expo-constants';

// Theme-aware component that applies theme colors to system UI
const ThemedApp = () => {
  const { colors, isDark } = useTheme();
  
  useEffect(() => {
    // Set navigation bar color based on theme
    NavigationBar.setBackgroundColorAsync(colors.background);
    
    // You can also set button color if needed
    NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
  }, [colors.background, isDark]);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor="transparent" 
        translucent 
      />
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // This adds padding equal to status bar height on Android
    // On iOS, SafeAreaView handles this
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  safeArea: {
    flex: 1,
  }
});

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MessageProvider>
          <ThemedApp />
        </MessageProvider>
      </UserProvider>
    </ThemeProvider>
  );
}