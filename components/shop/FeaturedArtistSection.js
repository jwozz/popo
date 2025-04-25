import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { styles } from '../../styles/shopScreenStyles';

const FeaturedArtistSection = () => {
  const featuredArtist = {
    id: 1,
    name: 'Michael Chen',
    bio: 'Handmade ceramic pieces for your coffee ritual',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  };

  const handleViewAll = () => {
    // Navigate to all artists screen
    console.log('Navigate to all artists');
  };

  const handleShopCollection = () => {
    // Navigate to artist's collection
    console.log(`Navigate to ${featuredArtist.name}'s collection`);
  };

  return (
    <View style={styles.artistFeature}>
      <View style={styles.artistHeader}>
        <Text style={styles.artistTitle}>Featured Artist</Text>
        <TouchableOpacity 
          onPress={handleViewAll}
          accessibilityLabel="View all artists"
          accessibilityRole="button"
        >
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.artistCard}
        accessibilityLabel={`${featuredArtist.name}, ${featuredArtist.bio}`}
        accessibilityRole="button"
      >
        <Image 
          source={{ uri: featuredArtist.imageUrl }} 
          style={styles.artistImage}
          accessibilityLabel={`${featuredArtist.name}'s profile picture`}
        />
        <View style={styles.artistInfo}>
          <Text style={styles.artistName}>{featuredArtist.name}</Text>
          <Text style={styles.artistBio}>{featuredArtist.bio}</Text>
          <TouchableOpacity 
            style={styles.shopNowButton}
            onPress={handleShopCollection}
            accessibilityLabel={`Shop ${featuredArtist.name}'s collection`}
            accessibilityRole="button"
          >
            <Text style={styles.shopNowText}>Shop Collection</Text>
            <MaterialIcons name="shopping-bag" size={16} color="#26a69a" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FeaturedArtistSection;