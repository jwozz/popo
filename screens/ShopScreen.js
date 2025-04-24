import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ShopScreen = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 1, name: 'Shop', active: true },
    { id: 2, name: 'Talks', active: false },
    { id: 3, name: 'Inbox', active: false },
  ];
  
  const featuredProducts = [
    { 
      id: 1, 
      name: 'Ceramic Mug Set', 
      price: '$48', 
      imageUrl: 'https://images.unsplash.com/photo-1605374005291-2205d81c9c43?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 
      artist: 'Michael Chen' 
    },
    { 
      id: 2, 
      name: 'Pour Over Kit', 
      price: '$35', 
      imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 
      likes: 24 
    },
    { 
      id: 3, 
      name: 'Coffee Beans', 
      price: '$18', 
      imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 
      likes: 16 
    },
  ];
  
  const trendingProducts = [
    { 
      id: 1, 
      name: 'Espresso Cups', 
      price: '$32', 
      imageUrl: 'https://images.unsplash.com/photo-1572119752777-3a4cf2d7a138?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 
      likes: 38 
    },
    { 
      id: 2, 
      name: 'Coffee Grinder', 
      price: '$65', 
      imageUrl: 'https://images.unsplash.com/photo-1551711975-d7a19e149b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 
      likes: 42 
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="App" />
      
      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        {categories.map(category => (
          <TouchableOpacity 
            key={category.id} 
            style={[
              styles.tab,
              category.active && { backgroundColor: '#e8f5e9' }
            ]}
          >
            <Text style={[
              styles.tabText,
              category.active && { color: '#26a69a' }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#757575" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={20} color="#757575" />
          </TouchableOpacity>
        </View>
        
        {/* Categories Scroll */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          <TouchableOpacity style={[styles.categoryChip, styles.activeCategoryChip]}>
            <Text style={styles.activeCategoryText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryText}>Ceramics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryText}>Coffee Beans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryText}>Brewing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryText}>Accessories</Text>
          </TouchableOpacity>
        </ScrollView>
        
        {/* Community Picks Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Community Picks</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsRow}
          >
            {featuredProducts.map(product => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: product.imageUrl }} 
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  <TouchableOpacity style={styles.heartButton}>
                    <Ionicons name="heart" size={18} color="#ffffff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  {product.artist && (
                    <Text style={styles.productArtist}>by {product.artist}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Trending Now Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <View style={styles.trendingGrid}>
            {trendingProducts.map(product => (
              <TouchableOpacity key={product.id} style={styles.trendingCard}>
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: product.imageUrl }} 
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  <View style={styles.likesTag}>
                    <Ionicons name="heart" size={12} color="#ffffff" />
                    <Text style={styles.likesText}>{product.likes}</Text>
                  </View>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Featured Artist */}
        <View style={styles.artistFeature}>
          <View style={styles.artistHeader}>
            <Text style={styles.artistTitle}>Featured Artist</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.artistCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }} 
              style={styles.artistImage}
            />
            <View style={styles.artistInfo}>
              <Text style={styles.artistName}>Michael Chen</Text>
              <Text style={styles.artistBio}>Handmade ceramic pieces for your coffee ritual</Text>
              <View style={styles.shopNowButton}>
                <Text style={styles.shopNowText}>Shop Collection</Text>
                <MaterialIcons name="shopping-bag" size={16} color="#26a69a" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757575',
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 16,
  },
  filterButton: {
    padding: 5,
  },
  categoriesScroll: {
    marginVertical: 15,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryChip: {
    backgroundColor: '#26a69a',
  },
  categoryText: {
    color: '#757575',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  sectionContainer: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  productsRow: {
    paddingRight: 20,
  },
  productCard: {
    width: 170,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 170,
    width: '100%',
  },
  productImage: {
    height: '100%',
    width: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#26a69a',
    fontWeight: '700',
  },
  productArtist: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  trendingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendingCard: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  likesTag: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  artistFeature: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  artistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  artistTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    color: '#26a69a',
    fontWeight: '500',
  },
  artistCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  artistImage: {
    width: 100,
    height: 100,
  },
  artistInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  artistName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistBio: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  shopNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopNowText: {
    color: '#26a69a',
    fontWeight: '600',
    marginRight: 5,
  },
  spacer: {
    height: 30,
  },
});

export default ShopScreen;