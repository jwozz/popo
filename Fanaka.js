// Fanaka Group App - Expo Go Frontend (No third-party libraries)
import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import HomeScreen from './HomeScreen';

const today = '17 April 2025';

const tenants = [
  { name: 'IDAH GATWIRI', house: 'S1', rent: 4200, paid: 1000, date: '17/04/25' },
  { name: 'JULIUS KATHURIMA', house: 'S2', rent: 4200, paid: 4200, date: '17/04/25' },
  { name: 'BILLY NDITA', house: 'S5', rent: 4200, paid: 5200, date: '17/04/25' },
];

const landParcels = [
  { parcel: 'KIIRUA / NAARI / 4216', status: 'To be subdivided into 7 portions', trustees: ['Angelo Njagi Nyaga', 'Albert Maina Waitathu', 'Faith Kinya Mbaya'] },
];

const loans = [
  { name: 'Maurice Aera', amount: 20700, status: 'Desertion' },
  { name: 'Claire Chirchir', amount: 6500, status: 'Pending' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HomeScreen />
        <Text style={styles.title}>FANAKA GROUP APP</Text>
        <Text style={styles.subtitle}>Today: {today}</Text>

        <Section title="🏠 Tenant Rent Summary">
          {tenants.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text>{item.house} - {item.name}</Text>
              <Text>Rent: KES {item.rent} | Paid: KES {item.paid}</Text>
              <Text>Date Paid: {item.date}</Text>
            </View>
          ))}
        </Section>

        <Section title="🌍 Land Projects">
          {landParcels.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text>Parcel: {item.parcel}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Trustees: {item.trustees.join(', ')}</Text>
            </View>
          ))}
        </Section>

        <Section title="💳 Loan Overview">
          {loans.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text>{item.name}</Text>
              <Text>Amount: KES {item.amount}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
});
