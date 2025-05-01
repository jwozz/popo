import React, { useState, useRef } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import AnimatedFilter from '../components/AnimatedFilter';
import CategorySelector from '../components/shop/CategorySelector';
import VideoProductSection from '../components/shop/VideoProductSection';
import FeaturedArtistSection from '../components/shop/FeaturedArtistSection';
import ProductModal from '../components/shop/ProductModal';
import DraggableBottomSheet from '../components/shop/DraggableBottomSheet';
import { videoProducts, featuredProducts } from '../data/shopData';
import { styles } from '../styles/shopScreenStyles';
import { SNAP_POSITIONS } from '../components/shop/DraggableBottomSheet'; 

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
  // In your main screen component
  const [bottomSheetPosition, setBottomSheetPosition] = useState(SNAP_POSITIONS.MIDDLE);

  // Update this when the bottom sheet position changes
  const handleBottomSheetPositionChange = (position) => {
    setBottomSheetPosition(position);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeProductModal = () => {
    setModalVisible(false);
  };

  // Combine product data for the bottom sheet and ensure price property exists
  const allProducts = [...videoProducts, ...featuredProducts].map(product => ({
    ...product,
    price: product.price || 0 // Default to 0 if price is undefined
  }));
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="App" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
       
        <VideoProductSection
          videoProducts={videoProducts}
          onProductPress={openProductModal}
          bottomSheetPosition={bottomSheetPosition}
        />
               
        <View style={styles.spacer} />
      </ScrollView>
     
      <ProductModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={closeProductModal}
      />
      
      {/* Add the draggable bottom sheet */}
      <DraggableBottomSheet 
        products={allProducts}
        onProductSelect={openProductModal}
        onPositionChange={setBottomSheetPosition}
      />
    </View>
  );
};

export default ShopScreen;