// Fanaka Home Screen (from screenshot) - Expo Go (No external libraries)
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>FANAKA GROUP</Text>
        <Text style={styles.date}>17 April 2025</Text>

        <View style={styles.menuItem}>
          <Text style={styles.menuTitle}>🏠 Housing</Text>
          <Text style={styles.menuText}>View rent payments, arrears, and tenant reports</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuTitle}>🌍 Land</Text>
          <Text style={styles.menuText}>Track subdivision, sales, and ownership of land parcels</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuTitle}>💳 Loan</Text>
          <Text style={styles.menuText}>Loan status, disbursements, and outstanding balances</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuTitle}>👥 Member Area</Text>
          <Text style={styles.menuText}>Access personal details, minutes, and group updates</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#f0f0f0',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  menuText: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;