import React from 'react';
import { View, Text, Modal, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from 'react-native-vector-icons';
import { styles } from '../../styles/shopScreenStyles';

const ProductModal = ({ visible, product, onClose }) => {
  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    // Add to cart functionality would go here
    console.log(`Added ${product.name} to cart`);
    // You might want to close the modal after adding to cart
    // onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
            accessibilityLabel="Close product details"
            accessibilityRole="button"
          >
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          
          <Image 
            source={{ uri: product.imageUrl }} 
            style={styles.modalImage}
            resizeMode="cover"
            accessibilityLabel={product.name}
          />
          
          <Text style={styles.modalProductName}>{product.name}</Text>
          <Text style={styles.modalProductPrice}>{product.price}</Text>
          <Text style={styles.modalProductDescription}>{product.description}</Text>
          
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            accessibilityLabel={`Add ${product.name} to cart`}
            accessibilityRole="button"
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
            <MaterialIcons name="shopping-cart" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;