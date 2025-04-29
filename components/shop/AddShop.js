import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddShop = () => {
  return (
    <SafeAreaView style={styles.container}>  
      <View style={styles.cage}>
        {/* My Status Section */}
        <TouchableOpacity style={styles.myStatusItem}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/60' }}
              style={styles.avatar}
            />
            <View style={styles.addStatusIcon}>
              <Ionicons name="add" size={18} color="white" />
            </View>
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusName}>Me</Text>
            <Text style={styles.statusTime}>Tap to add update</Text>
          </View>
        </TouchableOpacity>
      </View>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  myStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 15,
  },
  avatarContainer: {
    height: 45,
    width: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 23,
  },
  addStatusIcon: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#26a69a',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  statusInfo: {
    marginLeft: 15,
  },
  statusName: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  },
  statusTime: {
    fontSize: 14,
    color: '#8e8e8e',
    marginTop: 2,
    textAlign: 'left',
  },
});

export default AddShop;