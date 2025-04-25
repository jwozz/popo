import React, { useState, useRef } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import AnimatedFilter from '../components/AnimatedFilter';
import CategorySelector from '../components/shop/CategorySelector';
import VideoProductSection from '../components/shop/VideoProductSection';
import CommunityPicksSection from '../components/shop/CommunityPicksSection';
import FeaturedArtistSection from '../components/shop/FeaturedArtistSection';
import ProductModal from '../components/shop/ProductModal';
import { videoProducts, featuredProducts } from '../data/shopData';
import { styles } from '../styles/shopScreenStyles';

const ShopScreen = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const animatedFilterRef = useRef(null);
  
  const handleScroll = (event) => {
    if (animatedFilterRef.current) {
      animatedFilterRef.current.handleScroll(event);
    }
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeProductModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Shop" />
      <AnimatedFilter ref={animatedFilterRef} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#757575" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Search products"
          />
          <TouchableOpacity 
            style={styles.filterButton}
            accessibilityLabel="Filter products"
          >
            <Ionicons name="filter-outline" size={20} color="#757575" />
          </TouchableOpacity>
        </View>
        
        <CategorySelector />
        
        <VideoProductSection 
          videoProducts={videoProducts} 
          onProductPress={openProductModal} 
        />
        
        {/* <CommunityPicksSection 
          products={featuredProducts} 
          onProductPress={openProductModal} 
        /> */}
        
        <FeaturedArtistSection />
        
        <View style={styles.spacer} />
      </ScrollView>
      
      <ProductModal 
        visible={modalVisible} 
        product={selectedProduct} 
        onClose={closeProductModal} 
      />
    </View>
  );
};

export default ShopScreen;